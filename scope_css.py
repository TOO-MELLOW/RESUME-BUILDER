#!/usr/bin/env python3
"""
scope_css.py

Fences a single template's CSS so its selectors can never collide with, leak
into, or be overridden by any other template's shell.

What it does to a CSS string, given a template_id:
  - :root { ... }         -> [data-template="ID"] { ... }        (vars rescoped
                              onto the template wrapper instead of :global root)
  - html, body { ... }    -> [data-template="ID"] { ... }         (these
    body { ... }             selectors never match anything real once the
                              shell is loaded as an innerHTML fragment, so
                              they're rebased onto the wrapper element that
                              actually carries data-template)
  - * { ... }              -> [data-template="ID"] * { ... }
  - .foo, .bar h1 { ... }  -> [data-template="ID"] .foo,
                               [data-template="ID"] .bar h1 { ... }
  - @page / @import /
    @font-face             -> left completely untouched
  - @media (...) { ... }   -> @media (...) { <selectors inside prefixed too> }

Usage:
    python3 scope_css.py <template_id> <input.css> [output.css]

If output.css is omitted, prints to stdout.
"""
import sys
import re


def _split_top_level_commas(selector_list):
    """Split a selector list on commas that aren't inside parentheses."""
    parts, depth, buf = [], 0, ""
    for ch in selector_list:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == "," and depth == 0:
            parts.append(buf)
            buf = ""
        else:
            buf += ch
    parts.append(buf)
    return [p.strip() for p in parts if p.strip()]


def _prefix_selector(sel, scope):
    """Prefix one individual (already comma-split) selector."""
    sel = sel.strip()
    if sel in (":root", "html", "body") or re.match(r'^html\s*,?\s*body$', sel):
        return scope
    return f"{scope} {sel}"


def _prefix_selector_list(selector_list, scope):
    parts = _split_top_level_commas(selector_list)
    out = [_prefix_selector(p, scope) for p in parts]
    return ",\n".join(out)


def _find_matching_brace(css, open_idx):
    """Given the index of a '{', return the index of its matching '}',
    correctly skipping over braces that appear inside quoted strings."""
    depth = 0
    i = open_idx
    n = len(css)
    in_str = None
    while i < n:
        ch = css[i]
        if in_str:
            if ch == "\\":
                i += 2
                continue
            if ch == in_str:
                in_str = None
        elif ch in ("'", '"'):
            in_str = ch
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    raise ValueError("Unbalanced braces in CSS")


def _find_statement_end_or_block_start(css, i):
    """Scan forward from i (the char right after '@') and return
    (kind, idx) where kind is ';' for a bare at-rule statement (e.g.
    @import url(...);) ending at idx, or '{' for an at-rule block
    (e.g. @media (...) { ... }) whose '{' is at idx. Correctly skips
    over ';' and '{' that appear inside quoted strings or parens
    (needed for @import URLs, which often embed ';' in query strings)."""
    n = len(css)
    depth = 0
    in_str = None
    j = i
    while j < n:
        ch = css[j]
        if in_str:
            if ch == "\\":
                j += 2
                continue
            if ch == in_str:
                in_str = None
        elif ch in ("'", '"'):
            in_str = ch
        elif ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        elif depth == 0:
            if ch == ";":
                return (";", j)
            if ch == "{":
                return ("{", j)
        j += 1
    raise ValueError("Unterminated at-rule in CSS")


def scope_css(css, template_id):
    scope = f'[data-template="{template_id}"]'
    out = []
    i = 0
    n = len(css)

    while i < n:
        # Skip whitespace verbatim
        m = re.match(r'\s+', css[i:])
        if m:
            out.append(m.group(0))
            i += m.end()
            continue
        # Skip comments verbatim
        m = re.match(r'/\*.*?\*/', css[i:], re.S)
        if m:
            out.append(m.group(0))
            i += m.end()
            continue

        if css[i] == "@":
            kind, idx = _find_statement_end_or_block_start(css, i)
            if kind == ";":
                # bare statement at-rule, e.g. @import url(...);
                out.append(css[i:idx + 1])
                i = idx + 1
                continue
            # block at-rule: @media (...) { ... } / @page { ... } / @font-face { ... }
            brace = idx
            prelude = css[i:brace].strip()
            close = _find_matching_brace(css, brace)
            block = css[brace + 1:close]
            if prelude.startswith("@media"):
                inner = scope_css(block, template_id)  # recurse, re-prefix inner selectors
                out.append(f"{prelude} {{{inner}}}")
            else:
                # @page, @font-face, etc. -- left completely untouched
                out.append(css[i:close + 1])
            i = close + 1
            continue

        brace = css.find("{", i)
        if brace == -1:
            out.append(css[i:])
            break
        prelude = css[i:brace]
        close = _find_matching_brace(css, brace)
        body = css[brace + 1:close]
        scoped_selector = _prefix_selector_list(prelude, scope)
        out.append(f"{scoped_selector}{{{body}}}")
        i = close + 1

    return "".join(out)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    tid = sys.argv[1]
    with open(sys.argv[2], encoding="utf-8") as f:
        css_in = f.read()
    result = scope_css(css_in, tid)
    if len(sys.argv) >= 4:
        with open(sys.argv[3], "w", encoding="utf-8") as f:
            f.write(result)
    else:
        print(result)
