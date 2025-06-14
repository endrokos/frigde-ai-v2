from abc import ABC, abstractmethod

class VisionModelClient(ABC):

    @abstractmethod
    def generate(self, prompt: str, image_base64: str) -> str:
        raise NotImplementedError
