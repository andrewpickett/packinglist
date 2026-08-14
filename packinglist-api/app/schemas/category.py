import datetime
from typing import List

from pydantic import BaseModel, Field

from app.schemas.item import ItemResponse, ItemCreate


class CategoryCreate(BaseModel):
    name: str
    items: List[ItemCreate] = Field(default_factory=list)


class CategoryResponse(BaseModel):
    id: int
    list_id: int
    name: str
    disp_order: int
    create_dt: datetime.datetime
    update_dt: datetime.datetime
    items: List[ItemResponse] = Field(default_factory=list)

    class Config:
        from_attributes = True