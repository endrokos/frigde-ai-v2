import openai
from openai.types.chat import ChatCompletion

from back.src.shared.domain.vision_model_client import VisionModelClient


class GptVisionModelClient(VisionModelClient):
    def __init__(self, model_name: str):
        self.model_name = model_name

    def generate(
        self,
        prompt: str,
        image_base64: str,
    ) -> str:
        messages = self._create_messages(prompt, image_base64)
        response = openai.chat.completions.create(
            model=self.model_name,
            messages=messages
        )
        return self._process_answer(response)

    def _create_messages(self, prompt: str, image_base64: str, mime_type: str = "image/png"):
        return [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": image_base64
                        }
                    }
                ]
            }
        ]

    def _process_answer(self, response: ChatCompletion) -> str:
        return response.choices[0].message.content
