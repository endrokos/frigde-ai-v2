from abc import ABC


class TextModelClient(ABC):
    def generate(self, prompt: str):
        raise NotImplementedError

    def _create_prompt(self, prompt):
        raise NotImplementedError

    def _process_answer(self, response):
        raise NotImplementedError