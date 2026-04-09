import os
import argparse
import sys

# Define the root of the modules folder relative to this script
MODULES_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "artifacts", "modules")

FRONTEND_TEMPLATE = """// ============================================================================
// FILE: {full_path}/frontend/index.tsx
// PURPOSE: This is the dedicated frontend module for the {component_name} section.
//          It handles all the rendering, UI logic, and user interactions.
//          This file strictly adheres to the principle of isolating frontend and backend code.
//
// HOW TO USE: Import this default export into its parent component. Do not mix
//             backend logic (like direct database access) in this file. Always use
//             API calls to fetch data from the corresponding backend module.
// ============================================================================

import React from "react";

/**
 * {component_name} Frontend Component
 * 
 * This component is responsible for displaying the content to the user.
 * It is completely separated from its backend counterpart.
 */
export default function {component_name}Frontend() {{
  return (
    <div className="relative w-full border border-white/5 p-4 rounded-xl">
      {{/* 
        This is a placeholder for your actual UI. 
        Please replace this with your intricate design using GSAP, Three.js, etc.
        Ensure you fetch data from the backend using standard web requests to its paired backend module.
      */}}
      <h2 className="text-xl text-white font-bold">{component_name} Component</h2>
      <p className="text-zinc-400">Frontend module loaded successfully!</p>
    </div>
  );
}}
"""

BACKEND_TEMPLATE = """// ============================================================================
// FILE: {full_path}/backend/index.ts
// PURPOSE: This is the dedicated backend module for the {component_name} section.
//          It handles all database queries, business logic, and API route definitions.
//          This file strictly adheres to the principle of isolating frontend and backend code.
//
// HOW TO USE: Register this router in the main Express application. The frontend
//             module corresponding to this section will make HTTP requests here.
//             Ensure it returns REAL data from the database, not fake placeholders.
// ============================================================================

import {{ Router, type IRouter }} from "express";

const router: IRouter = Router();

/**
 * GET route for {component_name} data
 * 
 * Replace this endpoint with logic that queries real data from @workspace/db.
 * Do not return hardcoded or fake details.
 */
router.get("/", async (req, res) => {{
  try {{
    // TODO: Implement actual database query using drizzle-orm here
    // Example: const realData = await db.select().from(someTable);
    
    res.json({{
      message: "This is the backend API for {component_name}.",
      status: "success",
      realDataPlaceholder: true
    }});
  }} catch (err) {{
    console.error("Error fetching data for {component_name}:", err);
    res.status(500).json({{ error: "Internal Server Error" }});
  }}
}});

export default router;
"""

def create_module(path_str):
    # Normalize path
    parts = path_str.strip("/\\").replace("\\", "/").split("/")
    component_name = parts[-1]
    
    # Path inside artifacts/modules
    target_dir = os.path.join(MODULES_ROOT, *parts)
    frontend_dir = os.path.join(target_dir, "frontend")
    backend_dir = os.path.join(target_dir, "backend")
    
    # Check if exists
    if os.path.exists(target_dir):
        print(f"Warning: Directory {target_dir} already exists. Skipping creation to avoid overwrite.")
        return False
        
    print(f"Scaffolding module: {'/'.join(parts)}")
    
    # Create directories
    os.makedirs(frontend_dir, exist_ok=True)
    os.makedirs(backend_dir, exist_ok=True)
    
    # Write frontend template
    frontend_file = os.path.join(frontend_dir, "index.tsx")
    with open(frontend_file, 'w') as f:
        f.write(FRONTEND_TEMPLATE.format(
            full_path='/'.join(parts),
            component_name=component_name
        ))
        
    # Write backend template
    backend_file = os.path.join(backend_dir, "index.ts")
    with open(backend_file, 'w') as f:
        f.write(BACKEND_TEMPLATE.format(
            full_path='/'.join(parts),
            component_name=component_name
        ))
        
    print(f"  + Created {frontend_file}")
    print(f"  + Created {backend_file}")
    print(f"Successfully generated separate frontend and backend for {component_name}!")
    return True

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate strict Frontend/Backend isolated module structures with heavy English comments.")
    parser.add_argument("paths", nargs="+", help="One or more module paths (e.g., 'Home/HeroSection/Ticker', 'Exams/Categories/Engineering')")
    
    args = parser.parse_args()
    
    success_count = 0
    for path in args.paths:
        if create_module(path):
            success_count += 1
            
    print(f"\nScaffolding complete. Created {success_count} isolated modules.")
