import datetime
import uuid

from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship

from app.models.base import Base


class PlUser(Base):
    __tablename__ = "pl_user"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), unique=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    last_login_dt = Column(DateTime, default=lambda: datetime.datetime.now())
    create_dt = Column(DateTime, default=lambda: datetime.datetime.now())
    update_dt = Column(DateTime, default=lambda: datetime.datetime.now())

    lists = relationship("PlList", backref="pluser")
