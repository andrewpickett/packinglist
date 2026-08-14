import uuid

from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.schemas.item import ItemCreate
from app.services import item_service
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/lists/{list_id}/categories/{category_id}/items/")
async def items(list_id: int, category_id: int, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in items()")
    return item_service.get_items(token_user, list_id, category_id, db)

@router.post("/lists/{list_id}/categories/{category_id}/items/")
async def create_item(list_id: int, category_id: int, new_item: ItemCreate, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in create_item")
    return item_service.create_item(token_user, list_id, category_id, new_item, db)