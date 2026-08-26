// api/ai-generate.js
//
// Serverless function that proxies AI writing requests to Groq.
// GROQ_API_KEY lives only in Vercel's Environment Variables — it is
// never sent to, or visible in, the browser.
//
// Deploy location: put this file at  api/ai-generate.js  in the repo root
// (same level as index.html). Vercel auto-detects anything in /api as a
// serverless function, no config file needed.

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // json:true is sent by callmellowJSON() for the "AI Improve" bullet/summary
  // rewrites, which ask the model to return structured JSON covering every
  // bullet in a section. That needs a much bigger token budget than a single
  // plain-text tip, or the response gets cut off mid-JSON and fails to parse.
  const { prompt, json } = req.body || {};

  if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Missing prompt" });
  }
  if (prompt.length > 6000) {
    return res.status(400).json({ error: "Prompt too long" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in Vercel environment variables");
    return res.status(500).json({ error: "AI service not configured" });
  }

  try {
    // ----- FIX 1: Truncate the prompt if it's too massive -----
    // Groq's context window is ~8k tokens. If the input is huge, 
    // the AI runs out of room to output the full JSON.
    let processedPrompt = prompt;
    const MAX_PROMPT_CHARS = 6000;
    if (processedPrompt.length > MAX_PROMPT_CHARS) {
        // Truncate gracefully. Assumes the raw CV text is at the end of the prompt.
        // If you just send the raw text as the prompt, this cuts it directly.
        processedPrompt = processedPrompt.substring(0, MAX_PROMPT_CHARS) + 
                          "\n\n[CV text truncated due to length. Focus on the most recent roles.]";
    }

    const groqRes = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gemini-2.0-flash",
        messages: [
          {
            role: "system",
            content: json
              ? "You are a precise JSON generator. Extract the exact data asked for. Return ONLY valid JSON. Do not wrap it in markdown code blocks. Keep bullet points short. If the text is too long, summarize the last 5 years only."
              : "You are a skilled, concise writer. Return plain prose only — no markdown formatting, no wrapping quotation marks, no code fences, and no preamble like \"Here is your draft:\". Output only the requested text itself."
          },
          { role: "user", content: processedPrompt } // <-- Use the truncated prompt
        ],
        temperature: 0.6,
        // ----- THE FIX: Increased max_tokens drastically for JSON -----
        // 6000 tokens is enough for a 3-page CV full of bullet points.
        // 800 tokens is plenty for a simple text tip.
        max_tokens: json ? 2000 : 400
      })
    });
    
    if (!groqRes.ok) {
      const errBody = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errBody);
      // Surface the real upstream status/message instead of a generic 502
      // so failures (bad key, rate limit, etc.) are visible from the UI.
      let upstreamMessage = errBody;
      try { upstreamMessage = JSON.parse(errBody)?.error?.message || errBody; } catch (_) {}
      return res.status(502).json({
        error: "AI provider returned an error",
        upstreamStatus: groqRes.status,
        upstreamMessage
      });
    }

    const data = await groqRes.json();
    const choice = data?.choices?.[0];
    let text = choice?.message?.content?.trim();

    if (!text) {
      return res.status(502).json({ error: "Empty response from AI provider" });
    }

    // For plain-text (non-JSON) responses, clean up common model artifacts:
    // a whole-string wrapping quote, stray leading markdown bold/heading
    // markers, code fences, and a "Here's a draft:" style preamble line.
    if (!json) {
      text = text.replace(/^```[a-z]*\s*/i, "").replace(/```\s*$/, "").trim();
      if (
        (text.startsWith('"') && text.endsWith('"')) ||
        (text.startsWith("'") && text.endsWith("'"))
      ) {
        text = text.slice(1, -1).trim();
      }
      text = text.replace(/^[*#\s]+/, "");
      const lines = text.split("\n");
      if (lines.length > 1 && /^(here('s| is)|sure[,!]?|certainly)\b.{0,60}:?\s*$/i.test(lines[0].trim())) {
        text = lines.slice(1).join("\n").trim();
      }
    }

    // finish_reason "length" means the response was cut off by max_tokens —
    // for JSON mode this almost always produces unparseable output, so fail
    // loudly here instead of letting the frontend hit a confusing JSON.parse error.
    if (choice.finish_reason === "length" && json) {
      console.error("Groq response truncated by max_tokens for a JSON-mode request");
      return res.status(502).json({
        error: "AI response was too long and got cut off. Try improving fewer bullets at once."
      });
    }

    return res.status(200).json({ response: text });
  } catch (err) {
    console.error("AI generate error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
