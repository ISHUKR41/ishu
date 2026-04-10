import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from PyPDF2 import PdfReader, PdfWriter

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "rotate"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/rotate-pdf")
async def rotate_pdf(file: UploadFile = File(...), angle: int = Form(90)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    normalized_angle = angle % 360
    if normalized_angle not in (90, 180, 270):
        raise HTTPException(status_code=400, detail="Angle must be 90, 180, or 270.")

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        input_path = work_dir / "input.pdf"
        with open(input_path, "wb") as f:
            f.write(await file.read())

        reader = PdfReader(str(input_path))
        writer = PdfWriter()
        for page in reader.pages:
            page.rotate(normalized_angle)
            writer.add_page(page)

        output_path = work_dir / "rotated.pdf"
        with open(output_path, "wb") as f:
            writer.write(f)

        return FileResponse(
            path=str(output_path),
            media_type="application/pdf",
            filename="rotated.pdf",
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Rotation failed: {exc}")
