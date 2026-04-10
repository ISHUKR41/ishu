import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from PyPDF2 import PdfReader

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "pdf_to_text"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/pdf-to-text")
async def pdf_to_text(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        input_path = work_dir / "input.pdf"
        with open(input_path, "wb") as f:
            f.write(await file.read())

        reader = PdfReader(str(input_path))
        lines: list[str] = []
        for index, page in enumerate(reader.pages, start=1):
            text = page.extract_text() or ""
            lines.append(f"\n\n----- Page {index} -----\n")
            lines.append(text.strip())

        output_text = "\n".join(lines).strip()
        if not output_text:
            raise HTTPException(status_code=400, detail="No extractable text found in this PDF.")

        output_path = work_dir / "extracted.txt"
        output_path.write_text(output_text, encoding="utf-8")

        return FileResponse(
            path=str(output_path),
            media_type="text/plain; charset=utf-8",
            filename="extracted.txt",
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Text extraction failed: {exc}")
