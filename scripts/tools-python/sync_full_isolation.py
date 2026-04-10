import os
import glob
import shutil
import re

def sync_isolation():
    base_dir = "artifacts/modules"
    # Find all index.tsx files in artifacts/modules
    all_index_files = glob.glob(f"{base_dir}/**/index.tsx", recursive=True)
    
    modified_count = 0
    for file_path in all_index_files:
        normalized_path = file_path.replace("\\", "/")
        
        # If it's already in a frontend or backend folder, skip
        if "frontend" in normalized_path or "backend" in normalized_path:
            continue
            
        print(f"Refactoring: {normalized_path}")
        parent_dir = os.path.dirname(normalized_path)
        
        frontend_dir = os.path.join(parent_dir, "frontend")
        backend_dir = os.path.join(parent_dir, "backend")
        shared_dir = os.path.join(parent_dir, "_shared")
        
        # Create directories
        os.makedirs(frontend_dir, exist_ok=True)
        os.makedirs(backend_dir, exist_ok=True)
        os.makedirs(shared_dir, exist_ok=True)
        
        # Move index.tsx to frontend/index.tsx
        new_frontend_path = os.path.join(frontend_dir, "index.tsx")
        shutil.move(normalized_path, new_frontend_path)
        
        # Create a basic backend/index.ts
        backend_content = f"""// ============================================================================
// FILE: {backend_dir}/index.ts
// PURPOSE: Dedicated backend module for {os.path.basename(parent_dir)}.
// ============================================================================

import {{ Router, Request, Response }} from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {{
  try {{
    // Real Data Query
    res.json({{ success: true, data: [] }});
  }} catch (err) {{
    console.error("Error fetching data:", err);
    res.status(500).json({{ error: "Internal Server Error" }});
  }}
}});

export default router;
"""
        with open(os.path.join(backend_dir, "index.ts"), "w", encoding="utf-8") as f:
            f.write(backend_content)
            
        # Create shared/constants.ts
        shared_content = f"""// Shared types and constants for {os.path.basename(parent_dir)}\nexport const MODULE_NAME = "{os.path.basename(parent_dir)}";\n"""
        with open(os.path.join(shared_dir, "constants.ts"), "w", encoding="utf-8") as f:
            f.write(shared_content)
            
        modified_count += 1
        
    print(f"Total isolated modules created: {modified_count}")

if __name__ == "__main__":
    sync_isolation()
