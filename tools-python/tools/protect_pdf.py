import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from PyPDF2 import PdfReader, PdfWriter

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "protect"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/protect-pdf")
async def protect_pdf(file: UploadFile = File(...), password: str = Form(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    if len(password.strip()) < 4:
        raise HTTPException(status_code=400, detail="Password must be at least 4 characters.")

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
            writer.add_page(page)

        writer.encrypt(password)

        output_path = work_dir / "protected.pdf"
        with open(output_path, "wb") as f:
            writer.write(f)

        return FileResponse(
            path=str(output_path),
            media_type="application/pdf",
            filename="protected.pdf",
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Protection failed: {exc}")
