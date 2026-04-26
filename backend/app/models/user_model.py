from sqlalchemy import Column, Integer, String, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    phone = Column(String(15), nullable=True)
    role = Column(Enum("citizen", "admin"), default="citizen")
    created_at = Column(DateTime, default=datetime.utcnow)

    grievances = relationship("Grievance", back_populates="user")
