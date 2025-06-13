import os
from concurrent.futures import as_completed
from concurrent.futures import ThreadPoolExecutor

from dotenv import load_dotenv
import openai
from openai.types.chat import ChatCompletion

load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")


from src.menu_generator.domain.text_model_client import TextModelClient


class GptTextModelClient(TextModelClient):

    def __init__(self, model_name: str):
        self.model_name = model_name

    def generate(self, prompt: str) -> str:
        response = openai.chat.completions.create(
            model=self.model_name,
            messages=[
                {"role": "user", "content": self._create_prompt(prompt)}
            ]
        )
        return self._process_answer(response=response)

    def _create_prompt(self, prompt: str) -> str:
        return prompt

    def _process_answer(self, response: ChatCompletion) -> str:
        return response.choices[0].message.content


    def generate_many(self, prompts: list[str], max_workers: int = 7) -> list[str]:

        results = [None] * len(prompts)
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            # Asigna cada prompt a una posición (índice) para mantener el orden de resultados
            futures = {executor.submit(self.generate, prompt): idx for idx, prompt in enumerate(prompts)}
            for future in as_completed(futures):
                idx = futures[future]
                try:
                    results[idx] = future.result()
                except Exception as exc:
                    results[idx] = f"Error: {exc}"
        return results