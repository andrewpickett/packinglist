import uuid

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.models.category import PlCategory
from app.models.list import PlList
from app.schemas.category import CategoryCreate


def get_categories(user_id: uuid.UUID, list_id: int, db: Session):
    user_list = db.query(PlList).filter(PlList.user_id == str(user_id), PlList.id == list_id).first()
    if user_list:
        return db.query(PlCategory).filter(PlCategory.list_id == list_id).order_by(PlCategory.disp_order).all()
    return None

def create_category(user_id: uuid.UUID, list_id: int, new_category: CategoryCreate, db: Session):
    user_list = db.query(PlList).filter(PlList.user_id == str(user_id), PlList.id == list_id).first()
    if user_list and new_category and new_category.name:
        last_ordered = db.query(PlCategory).filter(PlCategory.list_id == list_id).order_by(desc(PlCategory.disp_order)).first()
        new_ordered = last_ordered.disp_order + 1 if last_ordered else 1
        db_category = PlCategory(name=new_category.name, list_id=list_id, disp_order=new_ordered)
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category
    return None
