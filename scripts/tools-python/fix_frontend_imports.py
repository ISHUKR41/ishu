import os
import re

def fix_imports():
    root_dir = r"c:\Users\MR.ROBOT\OneDrive - Park University\Desktop\NEW ISHU\ishu\artifacts\modules"
    for dirpath, dirnames, filenames in os.walk(root_dir):
        if 'frontend' in dirpath:
            for file in filenames:
                if file.endswith('.tsx') or file.endswith('.ts'):
                    filepath = os.path.join(dirpath, file)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    changed = False
                    
                    # Regex to match: import ... from "./Something" or import('./Something')
                    matches = re.finditer(r'(from\s+|import\s*\(\s*)([\"\'])\.\/([^\"\']+)[\"\']', content)
                    
                    new_content = content
                    for match in matches:
                        prefix = match.group(1)
                        quote = match.group(2)
                        path = match.group(3)
                        
                        parent_dir = os.path.dirname(os.path.dirname(filepath))
                        target_in_parent = os.path.join(parent_dir, path.split('/')[0])
                        
                        # Correct imports pointing to sibling module directories
                        if os.path.exists(target_in_parent) and path.split('/')[0] not in ('_shared', 'frontend', 'backend'):
                            old_str = match.group(0)
                            new_str = f"{prefix}{quote}../{path}{quote}"
                            new_content = new_content.replace(old_str, new_str)
                            changed = True

                        # Correct imports pointing to _shared
                        if path.startswith('_shared/'):
                            old_str = match.group(0)
                            new_str = f"{prefix}{quote}../{path}{quote}"
                            new_content = new_content.replace(old_str, new_str)
                            changed = True
                            
                        # Correct imports pointing to components across modules if needed
                    
                    if changed:
                        print(f"Fixed {filepath}")
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)

fix_imports()
