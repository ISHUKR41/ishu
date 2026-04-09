# =============================================================================
# ISHU Platform — Python Tools Microservice (FastAPI)
# =============================================================================
# This is the main entry point for the Python-based PDF/document processing
# microservice. It runs as a separate process alongside the Express.js backend.
#
# ARCHITECTURE:
# - Express.js (Node.js) handles all main API routes
# - This FastAPI service handles heavy-duty file processing (PDF, images, docs)
# - Express proxies tool requests to this service on port 8001
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
from pathlib import Path
from contextlib import asynccontextmanager

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

# =============================================================================
# Import all individual tool modules — each tool is completely isolated
# =============================================================================
from tools.merge_pdf import router as merge_pdf_router
from tools.split_pdf import router as split_pdf_router
from tools.compress_pdf import router as compress_pdf_router
from tools.pdf_to_word import router as pdf_to_word_router
from tools.word_to_pdf import router as word_to_pdf_router
from tools.pdf_to_jpg import router as pdf_to_jpg_router
from tools.jpg_to_pdf import router as jpg_to_pdf_router
from tools.rotate_pdf import router as rotate_pdf_router
from tools.watermark import router as watermark_router
from tools.unlock_pdf import router as unlock_pdf_router
from tools.protect_pdf import router as protect_pdf_router
from tools.page_numbers import router as page_numbers_router
from tools.ocr_pdf import router as ocr_pdf_router
from tools.repair_pdf import router as repair_pdf_router
from tools.pdf_to_excel import router as pdf_to_excel_router
from tools.excel_to_pdf import router as excel_to_pdf_router
from tools.pdf_to_ppt import router as pdf_to_ppt_router
from tools.ppt_to_pdf import router as ppt_to_pdf_router
from tools.edit_pdf import router as edit_pdf_router
from tools.sign_pdf import router as sign_pdf_router


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
        "tools_available": 20,
    }


# =============================================================================
# Register All Tool Routers — Each tool gets its own URL prefix
# =============================================================================
# PDF Core Tools
app.include_router(merge_pdf_router, prefix="/api/tools/process", tags=["PDF Core"])
app.include_router(split_pdf_router, prefix="/api/tools/process", tags=["PDF Core"])
app.include_router(compress_pdf_router, prefix="/api/tools/process", tags=["PDF Core"])
app.include_router(rotate_pdf_router, prefix="/api/tools/process", tags=["PDF Core"])
app.include_router(watermark_router, prefix="/api/tools/process", tags=["PDF Core"])
app.include_router(page_numbers_router, prefix="/api/tools/process", tags=["PDF Core"])
app.include_router(repair_pdf_router, prefix="/api/tools/process", tags=["PDF Core"])
app.include_router(edit_pdf_router, prefix="/api/tools/process", tags=["PDF Core"])
app.include_router(sign_pdf_router, prefix="/api/tools/process", tags=["PDF Core"])

# PDF Security Tools
app.include_router(unlock_pdf_router, prefix="/api/tools/process", tags=["PDF Security"])
app.include_router(protect_pdf_router, prefix="/api/tools/process", tags=["PDF Security"])

# PDF OCR Tools
app.include_router(ocr_pdf_router, prefix="/api/tools/process", tags=["PDF OCR"])

# Conversion Tools — PDF to other formats and vice versa
app.include_router(pdf_to_word_router, prefix="/api/tools/process", tags=["Conversion"])
app.include_router(word_to_pdf_router, prefix="/api/tools/process", tags=["Conversion"])
app.include_router(pdf_to_jpg_router, prefix="/api/tools/process", tags=["Conversion"])
app.include_router(jpg_to_pdf_router, prefix="/api/tools/process", tags=["Conversion"])
app.include_router(pdf_to_excel_router, prefix="/api/tools/process", tags=["Conversion"])
app.include_router(excel_to_pdf_router, prefix="/api/tools/process", tags=["Conversion"])
app.include_router(pdf_to_ppt_router, prefix="/api/tools/process", tags=["Conversion"])
app.include_router(ppt_to_pdf_router, prefix="/api/tools/process", tags=["Conversion"])


# =============================================================================
# Run Configuration — Start the FastAPI server
# =============================================================================
if __name__ == "__main__":
    import uvicorn

    # Run on port 8001 so it doesn't conflict with Express on port 5000
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8001,
        reload=True,  # Auto-reload during development
        log_level="info",
    )
