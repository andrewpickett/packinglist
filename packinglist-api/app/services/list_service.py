import uuid

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.models.category import PlCategory
from app.models.item import PlItem
from app.models.list import PlList
from app.schemas.list import ListCreate


def get_lists(user_id: uuid.UUID, db: Session):
    return db.query(PlList).filter(PlList.user_id == str(user_id)).order_by(PlList.disp_order).all()

def get_list(user_id: uuid.UUID, list_id: int, db: Session):
    return db.query(PlList).filter(PlList.user_id == str(user_id), PlList.id == list_id).first()

def create_list(user_id: uuid.UUID, new_list: ListCreate, db: Session):
    if new_list and new_list.name:
        last_ordered = db.query(PlList).filter(PlList.user_id == str(user_id)).order_by(desc(PlList.disp_order)).first()
        new_ordered = last_ordered.disp_order + 1 if last_ordered else 1
        db_list = PlList(name=new_list.name, user_id=str(user_id), disp_order=new_ordered)
        if new_list.categories:
            for i, cat in enumerate(new_list.categories):
                new_cat = PlCategory(name=cat.name, disp_order=(i+1))
                if cat.items:
                    for j, item in enumerate(cat.items):
                        new_cat.items.append(PlItem(name=item.name, disp_order=(j+1)))
                db_list.categories.append(new_cat)
        db.add(db_list)

        db.commit()
        db.refresh(db_list)
        return db_list
    return None

def update_list(user_id: uuid.UUID, update_list: ListCreate, list_id: int, db: Session):
    existing_list = get_list(user_id, list_id, db)
    if update_list and update_list.name == existing_list.name:
        print("YAY!")
    return None

def delete_list(user_id: uuid.UUID, list_id: int, db: Session):
    try:
        result = db.query(PlList).filter(PlList.id == list_id and PlList.user_id == str(user_id)).first()
        db.delete(result)
        db.commit()
        return 1
    except Exception:
        return 0