import tempfile
import uuid
from pathlib import Path

import fitz
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "page_numbers"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/add-page-numbers")
async def add_page_numbers(
    file: UploadFile = File(...),
    start: int = Form(1),
    position: str = Form("bottom-right"),
    font_size: int = Form(11),
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    normalized_position = position.strip().lower()
    if normalized_position not in {"bottom-right", "bottom-center", "bottom-left"}:
        raise HTTPException(status_code=400, detail="Position must be bottom-left, bottom-center, or bottom-right.")

    if start < 1:
        raise HTTPException(status_code=400, detail="Start page number must be at least 1.")

    font_size = max(8, min(48, font_size))

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        input_path = work_dir / "input.pdf"
        with open(input_path, "wb") as f:
            f.write(await file.read())

        doc = fitz.open(str(input_path))
        for page_index in range(len(doc)):
            page = doc[page_index]
            label = str(start + page_index)
            rect = page.rect

            if normalized_position == "bottom-left":
                x = 28
            elif normalized_position == "bottom-center":
                x = rect.width / 2
            else:
                x = max(28, rect.width - 48)

            y = max(28, rect.height - 24)
            page.insert_text(
                point=(x, y),
                text=label,
                fontsize=font_size,
                color=(0, 0, 0),
            )

        output_path = work_dir / "numbered.pdf"
        doc.save(str(output_path), garbage=3, deflate=True)
        doc.close()

        return FileResponse(
            path=str(output_path),
            media_type="application/pdf",
            filename="numbered.pdf",
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Page numbering failed: {exc}")
