#!/usr/bin/env python3
import re

path = 'css/styles.css'
with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# Remove all @media print blocks, balanced braces
def remove_media_print(text):
    start = 0
    while True:
        idx = text.find('@media print', start)
        if idx == -1:
            break
        brace_start = text.find('{', idx)
        if brace_start == -1:
            break
        depth = 1
        pos = brace_start + 1
        while depth > 0 and pos < len(text):
            if text[pos] == '{':
                depth += 1
            elif text[pos] == '}':
                depth -= 1
            pos += 1
        end = pos
        text = text[:idx] + text[end:]
        start = idx
    return text

css = remove_media_print(css)
with open(path, 'w', encoding='utf-8') as f:
    f.write(css)
print(f'Updated {path}, @media print count:', css.count('@media print'))
