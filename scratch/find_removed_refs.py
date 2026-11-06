import os, re

files = []
for root, _, fs in os.walk('.'):
    for f in fs:
        if f.endswith('.html') or f.endswith('.xml') or f.endswith('.js'):
            files.append(os.path.join(root, f))

print(f"Checking {len(files)} files for gallery, booking, and calculator references...")

for path in files:
    with open(path, 'r', encoding='utf-8', errors='ignore') as fp:
        content = fp.read()
    
    matches = []
    if 'booking.html' in content:
        matches.append('booking.html')
    if 'gallery.html' in content:
        matches.append('gallery.html')
    if 'calculator' in content.lower():
        matches.append('calculator')
    if 'estimator' in content.lower():
        matches.append('estimator')
    if 'before & after' in content.lower():
        matches.append('before & after')
    
    if matches:
        print(f"{path}: {', '.join(set(matches))}")
