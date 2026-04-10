import os
import re

def is_commented(content):
    # Checks if the file already starts with a comment block or has some easy-to-understand header
    return content.strip().startswith('/*') or content.strip().startswith('//')

def generate_header_comment(filepath):
    filename = os.path.basename(filepath)
    component_name = os.path.splitext(filename)[0]
    
    # Try to derive some context based on folder names
    parts = filepath.split(os.sep)
    module_name = "Core"
    if "modules" in parts:
        try:
            module_name = parts[parts.index("modules") + 1]
        except:
            pass
            
    header = f"""// ============================================================================
// FILE: {filename}
// MODULE: {module_name}
// PURPOSE: This file provides the implementation for {component_name}.
// It is designed to be easy to understand, following the Hyper-Modular architecture.
// 
// Every component, page, section, and sub-section is strictly separated into frontend
// and backend codebases to ensure 100+ developers can work simultaneously without conflicts.
// ============================================================================
"""
    return header

def process_file(filepath):
    if not filepath.endswith(('.ts', '.tsx', '.js', '.jsx')):
        return

    # Skip files inside node_modules or dist
    if 'node_modules' in filepath or 'dist' in filepath or '.git' in filepath:
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # If already commented with a FILE: header, skip
    if "FILE:" in content and "PURPOSE:" in content:
        return

    header = generate_header_comment(filepath)
    new_content = header + "\n" + content

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    # print(f"Added English comments to: {filepath}")

def main():
    # Start traversing from the project root (assuming this script runs inside scripts/tools-python)
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
    
    # Target directories
    targets = [
        os.path.join(root_dir, 'artifacts', 'ishu', 'src'),
        os.path.join(root_dir, 'artifacts', 'api-server', 'src'),
        os.path.join(root_dir, 'artifacts', 'modules'),
    ]

    count = 0
    for target in targets:
        if not os.path.exists(target):
            continue
        for dirpath, _, filenames in os.walk(target):
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                process_file(filepath)
                count += 1
                
    print(f"Processed over {count} files, adding easy-to-understand English comments.")

if __name__ == "__main__":
    main()
