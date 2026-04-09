# =============================================================================
# ISHU Platform — PDF to Word Conversion Tool
# =============================================================================
# PURPOSE: Converts PDF documents to editable Word (.docx) format.
# ISOLATION: This module operates independently — no other tool is affected.
# TECH: pdf2docx library for high-fidelity PDF to Word conversion.
#
# HOW IT WORKS:
# 1. User uploads a PDF file
# 2. pdf2docx Converter parses the PDF structure (text, images, tables)
# 3. The content is reconstructed as a Word document with layout preservation
# 4. The .docx file is returned as a downloadable file
# =============================================================================

import uuid
import tempfile
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "pdf_to_word"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/pdf-to-word")
async def pdf_to_word(file: UploadFile = File(...)):
    """
    Convert a PDF file to a Word document (.docx).

    PARAMETERS:
    - file: The PDF file to convert

    RETURNS:
    - A Word (.docx) file preserving layout, text, images, and tables
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        from pdf2docx import Converter

        # Save uploaded PDF
        input_path = work_dir / "input.pdf"
        content = await file.read()
        with open(input_path, "wb") as f:
            f.write(content)

        # Convert PDF to Word using pdf2docx
        output_path = work_dir / "converted.docx"
        cv = Converter(str(input_path))
        cv.convert(str(output_path))
        cv.close()

        return FileResponse(
            path=str(output_path),
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            filename="converted.docx",
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
