import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from PyPDF2 import PdfReader, PdfWriter

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "reorder"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


def parse_order(raw: str, total_pages: int) -> list[int]:
    if not raw.strip():
        raise HTTPException(status_code=400, detail="Please provide page order (e.g. 3,1,2).")

    parts = [part.strip() for part in raw.split(",") if part.strip()]
    order: list[int] = []
    seen: set[int] = set()

    for part in parts:
        page_number = int(part)
        if page_number < 1 or page_number > total_pages:
            raise HTTPException(status_code=400, detail=f"Invalid page number: {part}")

        index = page_number - 1
        if index in seen:
            raise HTTPException(status_code=400, detail=f"Duplicate page in order: {part}")

        seen.add(index)
        order.append(index)

    for index in range(total_pages):
        if index not in seen:
            order.append(index)

    return order


@router.post("/reorder-pdf")
async def reorder_pdf(file: UploadFile = File(...), order: str = Form("")):
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
        page_order = parse_order(order, len(reader.pages))

        writer = PdfWriter()
        for index in page_order:
            writer.add_page(reader.pages[index])

        output_path = work_dir / "reordered.pdf"
        with open(output_path, "wb") as f:
            writer.write(f)

        return FileResponse(
            path=str(output_path),
            media_type="application/pdf",
            filename="reordered.pdf",
        )
    except HTTPException:
        raise
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid page order format.")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Reorder failed: {exc}")
