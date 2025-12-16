import os

def replace_in_files(root_dir):
    target_domain_old = "narrowone.store"
    target_domain_new = "narrow0ne.online"
    
    # Replacements for index.html links to root
    # Be careful not to break "index.html" if it's part of a longer string, 
    # but href="index.html" is pretty specific.
    link_replacements = [
        ('href="index.html"', 'href="/"'),
        ('href="/index.html"', 'href="/"'),
        (target_domain_old, target_domain_new)
    ]

    count = 0
    for dirpath, dirnames, filenames in os.walk(root_dir):
        if ".git" in dirpath:
            continue
            
        for filename in filenames:
            if not filename.endswith(".html") and not filename.endswith(".json"):
                continue
                
            filepath = os.path.join(dirpath, filename)
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                modified = False
                
                for old, new in link_replacements:
                    if old in new_content:
                        new_content = new_content.replace(old, new)
                        modified = True
                
                if modified:
                    print(f"Modifying {filepath}")
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    count += 1
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

    print(f"Total files modified: {count}")

if __name__ == "__main__":
    replace_in_files(r"D:\games\narrow0ne.online")
