# =============================================================================
# ISHU Platform — Python Tools Microservice (FastAPI)
# =============================================================================
# This is the main entry point for the Python-based PDF/document processing
# microservice. It runs as a separate process alongside the Express.js backend.
#
# ARCHITECTURE:
# - Express.js (Node.js) handles all main API routes
# - This FastAPI service handles heavy-duty file processing (PDF, images, docs)
# - Express proxies tool requests to this service on port 8000
#
# TECH STACK:
# - FastAPI (Python ASGI framework) — for high-performance async API
# - PyPDF2/PyMuPDF/pikepdf — for PDF manipulation
# - python-docx/python-pptx/openpyxl — for Office document handling
# - Pillow — for image processing
# - pytesseract — for OCR text extraction
# - googletrans — for document translation
#
# ISOLATION PRINCIPLE:
# - Each tool is defined in its own file under tools/
# - Each tool has its own API endpoint
# - No tool interferes with another
# - File uploads are processed in isolated temp directories
# =============================================================================

import os
import shutil
import tempfile
import uuid
from importlib import import_module
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# =============================================================================
# Tool Router Registry
# Each tuple: (module path, feature tag)
# Missing modules are skipped automatically instead of crashing startup.
# =============================================================================
TOOL_ROUTER_SPECS = [
    ("tools.merge_pdf", "PDF Core"),
    ("tools.split_pdf", "PDF Core"),
    ("tools.compress_pdf", "PDF Core"),
    ("tools.rotate_pdf", "PDF Core"),
    ("tools.watermark", "PDF Core"),
    ("tools.page_numbers", "PDF Core"),
    ("tools.repair_pdf", "PDF Core"),
    ("tools.edit_pdf", "PDF Core"),
    ("tools.sign_pdf", "PDF Core"),
    ("tools.unlock_pdf", "PDF Security"),
    ("tools.protect_pdf", "PDF Security"),
    ("tools.ocr_pdf", "PDF OCR"),
    ("tools.pdf_to_word", "Conversion"),
    ("tools.word_to_pdf", "Conversion"),
    ("tools.pdf_to_jpg", "Conversion"),
    ("tools.jpg_to_pdf", "Conversion"),
    ("tools.pdf_to_excel", "Conversion"),
    ("tools.excel_to_pdf", "Conversion"),
    ("tools.pdf_to_ppt", "Conversion"),
    ("tools.ppt_to_pdf", "Conversion"),
]

enabled_tools_count = 0


def include_optional_tool_router(app_instance: FastAPI, module_path: str, tag: str) -> bool:
    """
    Tries to import and register one tool router.
    Returns True if registered, False if skipped.
    """
    try:
        module = import_module(module_path)
        router = getattr(module, "router", None)

        if router is None:
            print(f"[ISHU Tools] Skipped {module_path}: router not found")
            return False

        app_instance.include_router(router, prefix="/api/tools/process", tags=[tag])
        print(f"[ISHU Tools] Loaded {module_path}")
        return True
    except Exception as exc:
        print(f"[ISHU Tools] Skipped {module_path}: {exc}")
        return False


# =============================================================================
# Application Lifecycle — cleanup temp files on shutdown
# =============================================================================
@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Manages the application lifecycle.
    On startup: Creates temporary upload directory.
    On shutdown: Cleans up all temporary files to prevent disk bloat.
    """
    # Startup — ensure temp directory exists
    temp_dir = Path(tempfile.gettempdir()) / "ishu_tools"
    temp_dir.mkdir(exist_ok=True)
    print(f"[ISHU Tools] Temp directory ready: {temp_dir}")
    yield
    # Shutdown — clean up temp files
    if temp_dir.exists():
        shutil.rmtree(temp_dir, ignore_errors=True)
        print("[ISHU Tools] Temp directory cleaned up.")


# =============================================================================
# FastAPI Application Instance
# =============================================================================
app = FastAPI(
    title="ISHU Tools — PDF & Document Processing Microservice",
    description=(
        "A high-performance Python microservice for processing PDFs, "
        "documents, images, and more. Each tool is isolated in its own module "
        "with zero cross-tool interference."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# =============================================================================
# CORS Configuration — Allow requests from the frontend
# =============================================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
# Health Check Endpoint — Used by Express to verify Python service is running
# =============================================================================
@app.get("/health")
async def health_check():
    """
    Returns a simple health status.
    The Express.js backend pings this endpoint to confirm the Python
    microservice is alive before proxying tool requests.
    """
    return {
        "status": "healthy",
        "service": "ishu-tools-python",
        "version": "1.0.0",
        "tools_available": enabled_tools_count,
    }


# =============================================================================
# Register All Tool Routers — Each tool gets its own URL prefix
# =============================================================================
for module_path, tag in TOOL_ROUTER_SPECS:
    if include_optional_tool_router(app, module_path, tag):
        enabled_tools_count += 1


# =============================================================================
# Run Configuration — Start the FastAPI server
# =============================================================================
if __name__ == "__main__":
    import uvicorn

    # Run on port 8000 so it doesn't conflict with Express on port 5000
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload during development
        log_level="info",
    )
