import os, re

files = [
    'index.html',
    'sitemap.xml',
    'pages/404.html',
    'pages/about.html',
    'pages/coming-soon.html',
    'pages/contact.html',
    'pages/home-2.html',
    'pages/index.html',
    'pages/service-detail.html',
    'pages/services.html',
    'documentation/index.html'
]

for f_path in files:
    if os.path.exists(f_path):
        with open(f_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
        matches = []
        for i, l in enumerate(lines):
            if 'booking.html' in l or 'gallery.html' in l:
                matches.append((i+1, l.strip()))
        print(f"=== {f_path} ({len(matches)} matches) ===")
        for line_no, text in matches:
            print(f"  {line_no}: {text[:100]}")
