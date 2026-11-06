with open('pages/blog.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("Total lines:", len(lines))
for i, l in enumerate(lines):
    if any(k in l.lower() for k in ['<main', '</main', '<article', '<section', 'class="grid', 'class="font-display']):
        print(f"{i+1}: {l.strip()[:100]}")
