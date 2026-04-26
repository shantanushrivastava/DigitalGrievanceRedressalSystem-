from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TicketTrack(BaseModel):
    ticket_id: str

class TicketStatusOut(BaseModel):
    ticket_id: str
    title: str
    category: str
    priority: str
    status: str
    admin_remarks: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
