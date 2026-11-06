with open('pages/about.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(170, 205):
    if i < len(lines):
        print(f"{i+1}: {lines[i]}", end='')
