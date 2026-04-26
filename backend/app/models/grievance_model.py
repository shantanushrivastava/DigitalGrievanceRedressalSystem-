from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.db import Base

class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String(20), unique=True, index=True, nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)  # auto-classified
    priority = Column(Enum("low", "medium", "high"), default="low")  # auto-predicted
    status = Column(Enum("open", "in_progress", "resolved", "closed"), default="open")
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)  # nullable for anonymous
    submitter_name = Column(String(100), nullable=True)   # for anonymous
    submitter_email = Column(String(150), nullable=True)  # for anonymous
    admin_remarks = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="grievances")
