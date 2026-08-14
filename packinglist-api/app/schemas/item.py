import datetime

from pydantic import BaseModel


class ItemCreate(BaseModel):
    name: str

class ItemResponse(BaseModel):
    id: int
    category_id: int
    name: str
    disp_order: int
    create_dt: datetime.datetime
    update_dt: datetime.datetime

    class Config:
        from_attributes = True