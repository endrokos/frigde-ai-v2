from abc import ABC, abstractmethod


class TextModelClient(ABC):

    @abstractmethod
    def generate(self, prompt: str):
        raise NotImplementedError

    @abstractmethod
    def _create_prompt(self, prompt):
        raise NotImplementedError

    @abstractmethod
    def _process_answer(self, response):
        raise NotImplementedError