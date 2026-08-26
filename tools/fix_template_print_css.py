#!/usr/bin/env python3
import os, re, glob

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_DIR = os.path.join(BASE, 'templates-html')

def process_css(css):
    # Replace min-height:100vh with min-height:100%
    css = css.replace('min-height:100vh', 'min-height:100%')

    # Remove old .cv margin/background/shadow pattern
    css = re.sub(
        r'\.cv\{width:210mm;margin:20px auto;background:#fff;box-shadow:0 4px 25px rgba\(0,0,0,\.10\)\}',
        '.cv{width:210mm;margin:0;background:transparent;box-shadow:none}',
        css
    )

    # Add height:100% to sidebar container selectors only (not descendants)
    def repl_block(m):
        selector = m.group(1)
        body = m.group(2)
        # Check if the selector ends with .sidebar, .side, or .rail as the last class
        if re.search(r'\.(sidebar|side|rail)(?=[^{}]*$)', selector) and 'height:' not in body:
            body += 'height:100%;min-height:100%;'
        return selector + '{' + body + '}'

    css = re.sub(r'([^{}]+)\{([^{}]*)\}', repl_block, css)
    return css

def main():
    for filepath in glob.glob(os.path.join(TEMPLATE_DIR, '*.html')):
        if os.path.getsize(filepath) < 4000:
            # Skip legacy mini templates
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()

        html = re.sub(
            r'<style>(.*?)</style>',
            lambda m: '<style>' + process_css(m.group(1)) + '</style>',
            html,
            flags=re.S
        )

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'Processed {os.path.basename(filepath)}')

if __name__ == '__main__':
    main()
