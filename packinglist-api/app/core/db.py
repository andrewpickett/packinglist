from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models import user, list, category, item
from app.models.base import Base

DATABASE_URL = "mysql+mysqlconnector://root:fjQ_76KRUVLQe@localhost:3306/packinglist"

engine = create_engine(DATABASE_URL, echo=True)

Base.metadata.create_all(engine, checkfirst=True)

# I don't really like this -- I'm loading each model class here so that it is instantiated before needing to be used...
db_loads = [user.PlUser(), list.PlList(), category.PlCategory(), item.PlItem()]

SessionLocal = sessionmaker(autocommit=False, bind=engine, expire_on_commit=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
