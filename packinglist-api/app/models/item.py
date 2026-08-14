import datetime

from sqlalchemy import Column, String, DateTime, Integer, ForeignKey

from app.models.base import Base


class PlItem(Base):
    __tablename__ = "pl_item"

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    category_id = Column(Integer, ForeignKey("pl_category.id"), nullable=False)
    name = Column(String(100), nullable=False)
    disp_order = Column(Integer, default=0)
    create_dt = Column(DateTime, default=lambda: datetime.datetime.now())
    update_dt = Column(DateTime, default=lambda: datetime.datetime.now())
