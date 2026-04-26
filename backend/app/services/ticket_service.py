from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.grievance_model import Grievance

def track_ticket(db: Session, ticket_id: str):
    grievance = db.query(Grievance).filter(Grievance.ticket_id == ticket_id).first()
    if not grievance:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return grievance
