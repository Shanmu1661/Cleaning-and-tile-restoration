import os, re

files_to_update = [
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

for file_path in files_to_update:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Header Desktop Nav:
    # Remove: <a href="gallery.html" ...>Before & After</a>
    # Remove: <a href="booking.html" ...>Booking & Calculator</a>
    content = re.sub(r'<a\s+href="gallery\.html"[^>]*>[\s\S]*?Before\s*&\s*After[\s\S]*?</a>\s*', '', content)
    content = re.sub(r'<a\s+href="booking\.html"[^>]*>[\s\S]*?Booking\s*&\s*Calculator[\s\S]*?</a>\s*', '', content)
    
    # 2. Header Instant Quote button:
    # <a href="booking.html" ...>Instant Quote</a> -> <a href="contact.html" ...>Free Estimate</a>
    content = re.sub(
        r'<a\s+href="booking\.html"(\s+class="[^"]*btn[^"]*")>[\s\S]*?Instant\s*Quote[\s\S]*?</a>',
        r'<a href="contact.html"\1><i class="fa-solid fa-file-invoice-dollar text-xs"></i><span>Free Estimate</span></a>',
        content
    )

    # 3. Mobile Drawer:
    # Remove Before & After and Booking & Calculator links
    content = re.sub(r'<a\s+href="gallery\.html"[^>]*>[\s\S]*?</a>\s*', '', content)
    content = re.sub(r'<a\s+href="booking\.html"(\s+class="[^"]*hover:bg-slate-100[^"]*")>[\s\S]*?</a>\s*', '', content)
    
    # Mobile drawer bottom button:
    content = re.sub(
        r'<a\s+href="booking\.html"(\s+class="btn btn-primary w-full[^"]*")>[\s\S]*?</a>',
        r'<a href="contact.html"\1><i class="fa-solid fa-envelope"></i> Request Consultation</a>',
        content
    )

    # 4. Footer Navigation links:
    # Remove gallery.html and booking.html list items
    content = re.sub(r'<li>\s*<a\s+href="gallery\.html"[^>]*>[\s\S]*?</a>\s*</li>\s*', '', content)
    content = re.sub(r'<li>\s*<a\s+href="booking\.html"[^>]*>[\s\S]*?</a>\s*</li>\s*', '', content)

    # 5. Generic buttons pointing to booking.html:
    # Replace href="booking.html" with href="contact.html"
    content = content.replace('href="booking.html"', 'href="contact.html"')
    
    # Update button texts where relevant
    content = content.replace('>Book This Service<', '>Request This Service<')
    content = content.replace('>Book Recaulking<', '>Request Recaulking<')
    content = content.replace('>Schedule Inspection<', '>Request Inspection<')
    content = content.replace('>Get Instant Estimate<', '>Request Free Quote<')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {file_path}")

# Update sitemap.xml
if os.path.exists('sitemap.xml'):
    with open('sitemap.xml', 'r', encoding='utf-8') as f:
        sitemap = f.read()
    
    sitemap = re.sub(r'<url>\s*<loc>[^<]*gallery\.html</loc>[\s\S]*?</url>\s*', '', sitemap)
    sitemap = re.sub(r'<url>\s*<loc>[^<]*booking\.html</loc>[\s\S]*?</url>\s*', '', sitemap)
    
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap)
    print("Updated sitemap.xml")
