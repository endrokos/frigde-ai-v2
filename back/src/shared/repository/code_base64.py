import base64
import imghdr

from fastapi import UploadFile


async def process_image_content(imagen: UploadFile) -> str:
    contenido = await imagen.read()
    base64_image = (
        f"data:{imagen.content_type};base64,{base64.b64encode(contenido).decode()}"
    )
    return base64_image
