from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class GrievanceCreate(BaseModel):
    title: str
    description: str
    submitter_name: Optional[str] = None
    submitter_email: Optional[EmailStr] = None

class GrievanceOut(BaseModel):
    id: int
    ticket_id: str
    title: str
    description: str
    category: str
    priority: str
    status: str
    submitter_name: Optional[str]
    submitter_email: Optional[str]
    admin_remarks: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class GrievanceStatusUpdate(BaseModel):
    status: str
    admin_remarks: Optional[str] = None
