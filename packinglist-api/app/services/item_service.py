import uuid

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.models.category import PlCategory
from app.models.item import PlItem
from app.models.list import PlList
from app.schemas.item import ItemCreate


def get_items(user_id: uuid.UUID, list_id: int, category_id: int, db: Session):
    user_list = db.query(PlList).filter(PlList.user_id == str(user_id), PlList.id == list_id).first()
    if user_list:
        list_category = db.query(PlCategory).filter(PlCategory.list_id == list_id, PlCategory.id == category_id).first()
        if list_category:
            return db.query(PlItem).filter(PlItem.category_id == category_id).order_by(PlItem.disp_order).all()
    return None

def create_item(user_id: uuid.UUID, list_id: int, category_id: int, new_item: ItemCreate, db: Session):
    user_list = db.query(PlList).filter(PlList.user_id == str(user_id), PlList.id == list_id).first()
    if user_list and new_item and new_item.name:
        last_ordered = db.query(PlItem).filter(PlItem.category_id == category_id).order_by(desc(PlItem.disp_order)).first()
        new_ordered = last_ordered.disp_order + 1 if last_ordered else 1
        db_item = PlItem(name=new_item.name, category_id=category_id, disp_order=new_ordered)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
        return db_item
    return None
