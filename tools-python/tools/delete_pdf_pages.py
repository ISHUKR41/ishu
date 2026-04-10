import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from PyPDF2 import PdfReader, PdfWriter

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "delete_pages"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


def parse_page_ranges(raw: str, total_pages: int) -> list[int]:
    if not raw.strip():
        raise HTTPException(status_code=400, detail="Please provide page ranges to delete.")

    selected: set[int] = set()
    chunks = [chunk.strip() for chunk in raw.split(",") if chunk.strip()]

    for chunk in chunks:
        if "-" in chunk:
            parts = [part.strip() for part in chunk.split("-", 1)]
            if len(parts) != 2:
                raise HTTPException(status_code=400, detail=f"Invalid range: {chunk}")

            start = int(parts[0])
            end = int(parts[1])
            if start < 1 or end < start:
                raise HTTPException(status_code=400, detail=f"Invalid range: {chunk}")

            for page_number in range(start, end + 1):
                if page_number <= total_pages:
                    selected.add(page_number - 1)
        else:
            page_number = int(chunk)
            if page_number < 1 or page_number > total_pages:
                raise HTTPException(status_code=400, detail=f"Invalid page: {chunk}")
            selected.add(page_number - 1)

    if not selected:
        raise HTTPException(status_code=400, detail="No valid pages were selected.")

    if len(selected) >= total_pages:
        raise HTTPException(status_code=400, detail="Cannot delete all pages from a PDF.")

    return sorted(selected)


@router.post("/delete-pdf-pages")
async def delete_pdf_pages(file: UploadFile = File(...), pages: str = Form("")):
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
        delete_indexes = set(parse_page_ranges(pages, len(reader.pages)))

        writer = PdfWriter()
        for index, page in enumerate(reader.pages):
            if index not in delete_indexes:
                writer.add_page(page)

        output_path = work_dir / "pages-removed.pdf"
        with open(output_path, "wb") as f:
            writer.write(f)

        return FileResponse(
            path=str(output_path),
            media_type="application/pdf",
            filename="pages-removed.pdf",
        )
    except HTTPException:
        raise
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid page range format.")
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Delete operation failed: {exc}")
