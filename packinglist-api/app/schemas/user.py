import datetime
import uuid
from typing import List

from pydantic import BaseModel, Field

from app.schemas.list import ListResponse


class UserLogin(BaseModel):
    email: str
    password: str

class UserCreate(BaseModel):
    email: str
    name: str
    pass1: str
    pass2: str

class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    name: str
    last_login_dt: datetime.datetime
    create_dt: datetime.datetime
    update_dt: datetime.datetime
    lists: List[ListResponse] = Field(default_factory=list)

    class Config:
        from_attributes = True