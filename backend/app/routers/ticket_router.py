from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.ticket_schema import TicketStatusOut
from app.services.ticket_service import track_ticket

router = APIRouter(prefix="/api/tickets", tags=["Tickets"])

@router.get("/{ticket_id}", response_model=TicketStatusOut)
def track(ticket_id: str, db: Session = Depends(get_db)):
    return track_ticket(db, ticket_id)
