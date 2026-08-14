import datetime
import uuid
from typing import List

from pydantic import BaseModel, Field

from app.schemas.category import CategoryResponse, CategoryCreate


class ListCreate(BaseModel):
    name: str
    categories: List[CategoryCreate] = Field(default_factory=list)


class ListResponse(BaseModel):
    id: int
    user_id: uuid.UUID
    name: str
    disp_order: int
    create_dt: datetime.datetime
    update_dt: datetime.datetime
    categories: List[CategoryResponse] = Field(default_factory=list)

    class Config:
        from_attributes = True