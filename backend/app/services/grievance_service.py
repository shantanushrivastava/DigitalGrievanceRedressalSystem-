from sqlalchemy.orm import Session
from app.models.grievance_model import Grievance
from app.schemas.grievance_schema import GrievanceCreate
from app.utils.ticket_generator import generate_ticket_id

async def submit_grievance(db: Session, data: GrievanceCreate, user_id: int = None):
    ticket_id = generate_ticket_id()
    grievance = Grievance(
        ticket_id=ticket_id,
        title=data.title,
        description=data.description,
        category="General",
        priority="low",
        user_id=user_id,
        submitter_name=data.submitter_name,
        submitter_email=data.submitter_email,
    )
    db.add(grievance)
    db.commit()
    db.refresh(grievance)
    return grievance

def get_user_grievances(db: Session, user_id: int):
    return db.query(Grievance).filter(Grievance.user_id == user_id).order_by(Grievance.created_at.desc()).all()