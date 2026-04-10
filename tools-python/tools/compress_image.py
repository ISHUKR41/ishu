import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from PIL import Image

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "compress_image"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/compress-image")
async def compress_image(file: UploadFile = File(...), quality: int = Form(82)):
    quality = max(10, min(95, quality))

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        input_path = work_dir / "input"
        with open(input_path, "wb") as f:
            f.write(await file.read())

        image = Image.open(str(input_path))
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")

        output_path = work_dir / "compressed.jpg"
        image.save(str(output_path), format="JPEG", quality=quality, optimize=True)

        return FileResponse(
            path=str(output_path),
            media_type="image/jpeg",
            filename="compressed.jpg",
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Image compression failed: {exc}")
