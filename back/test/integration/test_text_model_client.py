from http.client import responses

from src.menu_generator.repository.gpt_text_model_client import GptTextModelClient


def test_gpt_text_model_client():
    gpt_text_model_client = GptTextModelClient("gpt-4o-mini")
    response = gpt_text_model_client.generate(prompt="¿1+1=2?")
    assert isinstance(response, str)
    assert "si" in response.lower()