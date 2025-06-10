from dataclasses import dataclass
from typing import List

@dataclass
class DishRequest:
    dishes: List[str]
