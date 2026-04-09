# =============================================================================
# ISHU Platform — Word to PDF Conversion Tool
# =============================================================================
# PURPOSE: Converts Word (.docx) documents to PDF format.
# ISOLATION: This module operates independently — no other tool is affected.
# TECH: python-docx for reading + reportlab for PDF generation.
#
# HOW IT WORKS:
# 1. User uploads a .docx file
# 2. python-docx extracts all paragraphs, styles, and images
# 3. reportlab generates a high-quality PDF preserving text and formatting
# 4. The PDF file is returned as a downloadable file
# =============================================================================

import uuid
import tempfile
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "word_to_pdf"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/word-to-pdf")
async def word_to_pdf(file: UploadFile = File(...)):
    """
    Convert a Word document (.docx) to PDF.

    PARAMETERS:
    - file: The Word (.docx) file to convert

    RETURNS:
    - A PDF file preserving text and basic formatting
    """
    if not file.filename.lower().endswith((".docx", ".doc")):
        raise HTTPException(status_code=400, detail="Only Word files (.docx) are supported.")

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        from docx import Document
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.units import inch
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

        # Save uploaded file
        input_path = work_dir / "input.docx"
        content = await file.read()
        with open(input_path, "wb") as f:
            f.write(content)

        # Read Word document
        doc = Document(str(input_path))

        # Create PDF
        output_path = work_dir / "converted.pdf"
        pdf_doc = SimpleDocTemplate(
            str(output_path),
            pagesize=A4,
            topMargin=1 * inch,
            bottomMargin=1 * inch,
            leftMargin=1 * inch,
            rightMargin=1 * inch,
        )

        # Setup styles
        styles = getSampleStyleSheet()
        heading_style = ParagraphStyle(
            "CustomHeading",
            parent=styles["Heading1"],
            fontSize=18,
            spaceAfter=12,
        )
        body_style = ParagraphStyle(
            "CustomBody",
            parent=styles["Normal"],
            fontSize=11,
            spaceAfter=6,
            leading=16,
        )

        # Convert paragraphs
        elements = []
        for para in doc.paragraphs:
            text = para.text.strip()
            if not text:
                elements.append(Spacer(1, 6))
                continue

            # Detect headings vs body text
            if para.style.name.startswith("Heading"):
                elements.append(Paragraph(text, heading_style))
            else:
                elements.append(Paragraph(text, body_style))

        # Build PDF
        if elements:
            pdf_doc.build(elements)
        else:
            raise HTTPException(status_code=400, detail="The document appears to be empty.")

        return FileResponse(
            path=str(output_path),
            media_type="application/pdf",
            filename="converted.pdf",
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Conversion failed: {str(e)}")
