import uuid

from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.schemas.category import CategoryCreate
from app.services import category_service
from app.core.auth import get_current_user

router = APIRouter()

@router.get("/lists/{list_id}/categories/")
async def categories(list_id: int, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in categories()")
    return category_service.get_categories(token_user, list_id, db)

@router.post("/lists/{list_id}/categories/")
async def create_list(list_id: int, new_category: CategoryCreate, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in create_category")
    return category_service.create_category(token_user, list_id, new_category, db)