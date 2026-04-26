from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.grievance_model import Grievance
from app.schemas.grievance_schema import GrievanceStatusUpdate

def get_all_grievances(db: Session, status: str = None):
    query = db.query(Grievance)
    if status:
        query = query.filter(Grievance.status == status)
    return query.order_by(Grievance.created_at.desc()).all()

def update_grievance_status(db: Session, grievance_id: int, data: GrievanceStatusUpdate):
    grievance = db.query(Grievance).filter(Grievance.id == grievance_id).first()
    if not grievance:
        raise HTTPException(status_code=404, detail="Grievance not found")
    grievance.status = data.status
    if data.admin_remarks:
        grievance.admin_remarks = data.admin_remarks
    db.commit()
    db.refresh(grievance)
    return grievance

def get_dashboard_stats(db: Session):
    total = db.query(Grievance).count()
    open_count = db.query(Grievance).filter(Grievance.status == "open").count()
    in_progress = db.query(Grievance).filter(Grievance.status == "in_progress").count()
    resolved = db.query(Grievance).filter(Grievance.status == "resolved").count()
    return {
        "total": total,
        "open": open_count,
        "in_progress": in_progress,
        "resolved": resolved
    }
