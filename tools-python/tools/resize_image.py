import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from PIL import Image

router = APIRouter()

TEMP_DIR = Path(tempfile.gettempdir()) / "ishu_tools" / "resize_image"
TEMP_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/resize-image")
async def resize_image(
    file: UploadFile = File(...),
    width: int = Form(1200),
    height: int = Form(1200),
    keep_aspect: bool = Form(True),
):
    width = max(1, min(8000, width))
    height = max(1, min(8000, height))

    process_id = str(uuid.uuid4())
    work_dir = TEMP_DIR / process_id
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        input_path = work_dir / "input"
        with open(input_path, "wb") as f:
            f.write(await file.read())

        image = Image.open(str(input_path))

        if keep_aspect:
            resized = image.copy()
            resized.thumbnail((width, height), Image.Resampling.LANCZOS)
        else:
            resized = image.resize((width, height), Image.Resampling.LANCZOS)

        output_format = (image.format or "PNG").upper()
        output_extension = "png"
        output_media_type = "image/png"

        if output_format in {"JPG", "JPEG"}:
            if resized.mode in ("RGBA", "P"):
                resized = resized.convert("RGB")
            output_format = "JPEG"
            output_extension = "jpg"
            output_media_type = "image/jpeg"
        elif output_format == "WEBP":
            output_extension = "webp"
            output_media_type = "image/webp"
        else:
            output_format = "PNG"

        output_path = work_dir / f"resized.{output_extension}"
        save_kwargs = {"optimize": True}
        if output_format == "JPEG":
            save_kwargs["quality"] = 90

        resized.save(str(output_path), format=output_format, **save_kwargs)

        return FileResponse(
            path=str(output_path),
            media_type=output_media_type,
            filename=output_path.name,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Image resize failed: {exc}")
