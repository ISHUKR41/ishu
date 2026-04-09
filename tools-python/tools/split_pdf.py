# =============================================================================
# ISHU Platform — Split PDF Tool
# =============================================================================
# PURPOSE: Splits a PDF into individual pages or specific page ranges.
# ISOLATION: This module operates independently — no other tool is affected.
# TECH: PyPDF2 for page-level extraction with zero quality loss.
#
# HOW IT WORKS:
# 1. User uploads a single PDF + specifies which pages to extract
# 2. PyPDF2 PdfReader reads the source file
# 3. Specified pages are written to a new PDF via PdfWriter
# 4. The resulting PDF is returned as a downloadable file
# =============================================================================

import uuid
import tempfile
import zipfile
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from PyPDF2 import PdfReader, PdfWriter

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "split"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/split-pdf")
async def split_pdf(
    file: UploadFile = File(...),
    pages: Optional[str] = Form(None),
    split_all: bool = Form(False),
):
    """
    Split a PDF by page range or into individual pages.

    PARAMETERS:
    - file: The PDF file to split
    - pages: Comma-separated page numbers or ranges (e.g., "1,3,5-8")
    - split_all: If true, splits into individual single-page PDFs (returns ZIP)

    RETURNS:
    - A PDF with selected pages, or a ZIP of individual page PDFs
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        # Save uploaded file
        input_path = work_dir / "input.pdf"
        content = await file.read()
        with open(input_path, "wb") as f:
            f.write(content)

        reader = PdfReader(str(input_path))
        total_pages = len(reader.pages)

        if split_all:
            # Split into individual pages — return as ZIP
            zip_path = work_dir / "split_pages.zip"
            with zipfile.ZipFile(str(zip_path), "w") as zf:
                for i in range(total_pages):
                    writer = PdfWriter()
                    writer.add_page(reader.pages[i])
                    page_path = work_dir / f"page_{i + 1}.pdf"
                    with open(page_path, "wb") as pf:
                        writer.write(pf)
                    zf.write(str(page_path), f"page_{i + 1}.pdf")

            return FileResponse(
                path=str(zip_path),
                media_type="application/zip",
                filename="split_pages.zip",
            )
        else:
            # Extract specific pages
            page_indices = _parse_page_range(pages, total_pages)
            writer = PdfWriter()
            for idx in page_indices:
                writer.add_page(reader.pages[idx])

            output_path = work_dir / "split_output.pdf"
            with open(output_path, "wb") as f:
                writer.write(f)

            return FileResponse(
                path=str(output_path),
                media_type="application/pdf",
                filename="split_output.pdf",
            )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to split PDF: {str(e)}")


def _parse_page_range(pages_str: Optional[str], total: int) -> list:
    """
    Parses a page range string like '1,3,5-8' into zero-indexed page numbers.
    Returns all pages if no range is specified.
    """
    if not pages_str:
        return list(range(total))

    indices = set()
    for part in pages_str.split(","):
        part = part.strip()
        if "-" in part:
            start, end = part.split("-", 1)
            start_idx = max(0, int(start) - 1)
            end_idx = min(total, int(end))
            indices.update(range(start_idx, end_idx))
        else:
            idx = int(part) - 1
            if 0 <= idx < total:
                indices.add(idx)

    return sorted(indices)
