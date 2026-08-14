import uuid

from fastapi import APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.core.db import get_db
from app.schemas.list import ListCreate, ListResponse
from app.services import list_service

router = APIRouter()

@router.get("/lists/")
async def lists(token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in lists()")
    return list_service.get_lists(token_user, db)

@router.get("/lists/{list_id}/", response_model=ListResponse)
async def get_list(list_id: int, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in get_list()")
    return list_service.get_list(token_user, list_id, db)

@router.post("/lists/")
async def create_list(new_list: ListCreate, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in create_list")
    return list_service.create_list(token_user, new_list, db)

@router.put("/lists/{list_id}/")
async def update_list(list_id: int, update_list: ListCreate, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in update_list")
    return list_service.update_list(token_user, update_list, list_id, db)

@router.delete("/lists/{list_id}/")
async def delete_list(list_id: int, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in delete_list(UUID)")
    return list_service.delete_list(token_user, list_id, db)