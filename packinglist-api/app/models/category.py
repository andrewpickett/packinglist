import datetime

from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.models.base import Base


class PlCategory(Base):
    __tablename__ = "pl_category"

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    list_id = Column(Integer, ForeignKey("pl_list.id"), nullable=False)
    name = Column(String(100), nullable=False)
    disp_order = Column(Integer, default=0)
    create_dt = Column(DateTime, default=lambda: datetime.datetime.now())
    update_dt = Column(DateTime, default=lambda: datetime.datetime.now())

    items = relationship("PlItem", backref="plcategory", cascade="all, delete", order_by="PlItem.disp_order")
