# =============================================================================
# ISHU Platform — PDF to JPG Conversion Tool
# =============================================================================
# PURPOSE: Converts PDF pages to high-quality JPG images.
# ISOLATION: This module operates independently — no other tool is affected.
# TECH: PyMuPDF (fitz) for rendering PDF pages to pixel-perfect images.
#
# HOW IT WORKS:
# 1. User uploads a PDF + selects DPI quality
# 2. PyMuPDF renders each page at the specified resolution
# 3. Pages are saved as JPG images
# 4. If multiple pages, returns a ZIP; single page returns JPG directly
# =============================================================================

import uuid
import tempfile
import zipfile
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "pdf_to_jpg"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/pdf-to-jpg")
async def pdf_to_jpg(
    file: UploadFile = File(...),
    dpi: int = Form(200),
):
    """
    Convert PDF pages to JPG images.

    PARAMETERS:
    - file: The PDF file to convert
    - dpi: Output resolution (default 200, range 72-600)

    RETURNS:
    - Single page: JPG image. Multiple pages: ZIP of JPG images.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    # Clamp DPI to safe range
    dpi = max(72, min(600, dpi))

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        import fitz  # PyMuPDF

        # Save uploaded file
        input_path = work_dir / "input.pdf"
        content = await file.read()
        with open(input_path, "wb") as f:
            f.write(content)

        # Open PDF
        doc = fitz.open(str(input_path))
        total_pages = len(doc)

        # Calculate zoom factor from DPI (72 DPI is default)
        zoom = dpi / 72
        matrix = fitz.Matrix(zoom, zoom)

        # Render each page to JPG
        image_paths = []
        for i in range(total_pages):
            page = doc[i]
            pix = page.get_pixmap(matrix=matrix)
            img_path = work_dir / f"page_{i + 1}.jpg"
            pix.save(str(img_path))
            image_paths.append(img_path)

        doc.close()

        # Single page → return JPG directly
        if total_pages == 1:
            return FileResponse(
                path=str(image_paths[0]),
                media_type="image/jpeg",
                filename="page_1.jpg",
            )

        # Multiple pages → return ZIP
        zip_path = work_dir / "pdf_images.zip"
        with zipfile.ZipFile(str(zip_path), "w") as zf:
            for img_path in image_paths:
                zf.write(str(img_path), img_path.name)

        return FileResponse(
            path=str(zip_path),
            media_type="application/zip",
            filename="pdf_images.zip",
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
