# =============================================================================
# ISHU Platform — JPG to PDF Conversion Tool
# =============================================================================
# PURPOSE: Converts one or more JPG/PNG images into a single PDF document.
# ISOLATION: This module operates independently — no other tool is affected.
# TECH: Pillow (PIL) for image processing + reportlab for PDF generation.
# =============================================================================

import uuid
import tempfile
from pathlib import Path
from typing import List

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "jpg_to_pdf"
TEMP_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".gif", ".webp", ".tiff"}


@router.post("/jpg-to-pdf")
async def jpg_to_pdf(
    files: List[UploadFile] = File(...),
    orientation: str = Form("portrait"),
):
    """
    Convert images (JPG, PNG, etc.) to a single PDF document.

    PARAMETERS:
    - files: One or more image files
    - orientation: 'portrait' or 'landscape'

    RETURNS:
    - A PDF containing all images, one per page
    """
    if not files:
        raise HTTPException(status_code=400, detail="At least one image is required.")

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        from PIL import Image

        # Save and validate all images
        images = []
        for f in files:
            ext = Path(f.filename).suffix.lower()
            if ext not in ALLOWED_EXTENSIONS:
                raise HTTPException(
                    status_code=400,
                    detail=f"Unsupported format: {ext}. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
                )

            img_path = work_dir / f"img_{len(images)}{ext}"
            content = await f.read()
            with open(img_path, "wb") as out:
                out.write(content)

            img = Image.open(str(img_path))
            # Convert RGBA to RGB for PDF compatibility
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
            images.append(img)

        if not images:
            raise HTTPException(status_code=400, detail="No valid images provided.")

        # Create PDF from images — each image becomes one page
        output_path = work_dir / "images.pdf"
        first_img = images[0]
        remaining = images[1:] if len(images) > 1 else []

        first_img.save(
            str(output_path),
            "PDF",
            resolution=200.0,
            save_all=True,
            append_images=remaining,
        )

        return FileResponse(
            path=str(output_path),
            media_type="application/pdf",
            filename="images.pdf",
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
