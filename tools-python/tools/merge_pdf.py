# =============================================================================
# ISHU Platform — Merge PDF Tool
# =============================================================================
# PURPOSE: Combines multiple PDF files into a single PDF document.
# ISOLATION: This module operates independently — no other tool is affected.
# TECH: PyPDF2 for PDF merging with page-level precision.
#
# HOW IT WORKS:
# 1. User uploads 2+ PDF files via multipart form data
# 2. PyPDF2 PdfMerger reads each file in order
# 3. All pages from all PDFs are merged into one output file
# 4. The merged PDF is returned as a downloadable file
# =============================================================================

import os
import uuid
import tempfile
from pathlib import Path
from typing import List

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
from PyPDF2 import PdfMerger

# Create isolated router for this tool — zero interference with other tools
router = APIRouter()

# Temporary directory for processing files
TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "merge"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/merge-pdf")
async def merge_pdfs(files: List[UploadFile] = File(...)):
    """
    Merge multiple PDF files into a single PDF.

    PARAMETERS:
    - files: List of PDF files to merge (minimum 2 files required)

    RETURNS:
    - A single merged PDF file as a download

    EXAMPLE:
    POST /api/tools/process/merge-pdf
    Body: multipart/form-data with 2+ PDF files
    """
    # Validation — need at least 2 PDFs to merge
    if len(files) < 2:
        raise HTTPException(
            status_code=400,
            detail="At least 2 PDF files are required for merging."
        )

    # Validate all files are PDFs
    for f in files:
        if not f.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail=f"File '{f.filename}' is not a PDF. Only PDF files are allowed."
            )

    # Generate unique processing ID to prevent file conflicts
    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        # Save all uploaded files to temp directory
        saved_paths = []
        for i, file in enumerate(files):
            file_path = work_dir / f"input_{i}.pdf"
            content = await file.read()
            with open(file_path, "wb") as f:
                f.write(content)
            saved_paths.append(file_path)

        # Merge all PDFs using PyPDF2
        merger = PdfMerger()
        for path in saved_paths:
            merger.append(str(path))

        # Write merged output
        output_path = work_dir / "merged_output.pdf"
        merger.write(str(output_path))
        merger.close()

        # Return the merged file as a download
        return FileResponse(
            path=str(output_path),
            media_type="application/pdf",
            filename="merged.pdf",
            headers={"Content-Disposition": "attachment; filename=merged.pdf"}
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to merge PDFs: {str(e)}"
        )
