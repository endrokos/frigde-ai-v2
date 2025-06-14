from dataclasses import dataclass
from typing import Optional


@dataclass
class DiskRequest:
    disk: str
    recipe: Optional[str]
    ingredients: Optional[str]