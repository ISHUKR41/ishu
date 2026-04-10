import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from PIL import Image

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "convert_image"
TEMP_DIR.mkdir(parents=True, exist_ok=True)

FORMAT_MAP = {
    "jpg": ("JPEG", "jpg", "image/jpeg"),
    "jpeg": ("JPEG", "jpg", "image/jpeg"),
    "png": ("PNG", "png", "image/png"),
    "webp": ("WEBP", "webp", "image/webp"),
    "bmp": ("BMP", "bmp", "image/bmp"),
    "tiff": ("TIFF", "tiff", "image/tiff"),
    "gif": ("GIF", "gif", "image/gif"),
}


@router.post("/convert-image")
async def convert_image(file: UploadFile = File(...), target_format: str = Form("png")):
    normalized = target_format.strip().lower()
    if normalized not in FORMAT_MAP:
        allowed = ", ".join(sorted(FORMAT_MAP.keys()))
        raise HTTPException(status_code=400, detail=f"Unsupported target format. Use one of: {allowed}")

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        input_path = work_dir / "input"
        with open(input_path, "wb") as f:
            f.write(await file.read())

        image = Image.open(str(input_path))
        pil_format, extension, media_type = FORMAT_MAP[normalized]

        if pil_format in {"JPEG", "BMP"} and image.mode in ("RGBA", "P"):
            image = image.convert("RGB")

        output_path = work_dir / f"converted.{extension}"

        save_kwargs = {}
        if pil_format == "JPEG":
            save_kwargs = {"quality": 92, "optimize": True}
        elif pil_format == "PNG":
            save_kwargs = {"optimize": True}

        image.save(str(output_path), format=pil_format, **save_kwargs)

        return FileResponse(
            path=str(output_path),
            media_type=media_type,
            filename=output_path.name,
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Image conversion failed: {exc}")
