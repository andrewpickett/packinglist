import datetime

from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.models.base import Base


class PlList(Base):
    __tablename__ = "pl_list"

    id = Column(Integer, primary_key=True, autoincrement=True, unique=True)
    user_id = Column(String(36), ForeignKey("pl_user.id"), nullable=False)
    name = Column(String(100), nullable=False)
    disp_order = Column(Integer, default=0)
    create_dt = Column(DateTime, default=lambda: datetime.datetime.now())
    update_dt = Column(DateTime, default=lambda: datetime.datetime.now())

    categories = relationship("PlCategory", backref="pllist", cascade="all, delete", order_by="PlCategory.disp_order")
