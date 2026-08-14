import uuid

from fastapi import APIRouter, HTTPException, status
from fastapi.params import Depends
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.schemas.user import UserLogin, UserResponse, UserCreate
from app.services import user_service
from app.core.auth import create_access_token, get_current_user

router = APIRouter()

@router.get("/users/")
async def users(db: Session = Depends(get_db)):
    print("in users()")
    return user_service.get_users(db)

@router.post("/users/")
async def create_user(new_user: UserCreate, db: Session = Depends(get_db)):
    print("in create_user(UserCreate)")
    db_user = user_service.create_user(new_user, db)
    if db_user:
        access_token = create_access_token(data={"sub": db_user.id})
        return {"access_token": access_token, "token_type": "bearer", "id": db_user.id}
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access.")

@router.get("/users/{user_id}/", response_model=UserResponse)
async def user(user_id: uuid.UUID, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in user(UUID)")
    if token_user == user_id:
        db_user = user_service.get_user(user_id, db)
        if db_user:
            return db_user
    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid access.")

@router.post("/users/login/")
async def login(user_login: UserLogin, db: Session = Depends(get_db)):
    print("in login(str, str)")
    db_user = user_service.login(user_login.email, user_login.password, db)
    if db_user:
        access_token = create_access_token(data={"sub": db_user.id})
        return {"access_token": access_token, "token_type": "bearer", "id": db_user.id}
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access.")

@router.delete("/users/{user_id}")
async def delete_user(user_id: uuid.UUID, token_user: uuid.UUID = Depends(get_current_user), db: Session = Depends(get_db)):
    print("in delete_user(UUID)")
    if token_user == user_id:
        return user_service.delete_user(user_id, db)
    return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid access.")