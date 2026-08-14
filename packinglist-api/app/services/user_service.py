import datetime
import uuid

from sqlalchemy.orm import Session

from app.models.user import PlUser
from app.schemas.user import UserCreate
from app.core.auth import hash_password, check_password


def get_users(db: Session):
    return db.query(PlUser).all()

def get_user(user_id: uuid.UUID, db: Session):
    db_user = db.query(PlUser).filter(PlUser.id == str(user_id)).first()
    if db_user:
        return db_user
    return None

def create_user(new_user: UserCreate, db: Session):
    if new_user and new_user.email and new_user.name and new_user.pass1 and new_user.pass2 and new_user.pass1 == new_user.pass2:
        db_user = PlUser(name=new_user.name, email=new_user.email, password=hash_password(new_user.pass1))
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    return None

def delete_user(user_id: uuid.UUID, db: Session):
    result = db.query(PlUser).filter(PlUser.id == str(user_id)).delete()
    db.commit()
    return result

def login(email: str, password: str, db: Session):
    db_user = db.query(PlUser).filter(PlUser.email == email).first()
    if db_user and check_password(password, db_user.password):
        print(db_user.id)
        db_user.last_login_dt = datetime.datetime.now()
        db.commit()
        return db_user
    return None