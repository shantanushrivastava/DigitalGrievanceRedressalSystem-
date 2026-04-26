from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.db import get_db
from app.schemas.grievance_schema import GrievanceOut, GrievanceStatusUpdate
from app.services.admin_service import get_all_grievances, update_grievance_status, get_dashboard_stats
from app.core.dependencies import get_admin_user
from app.models.user_model import User

router = APIRouter(prefix="/api/admin", tags=["Admin"])

@router.get("/grievances", response_model=List[GrievanceOut])
def list_grievances(status: Optional[str] = Query(None), db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    return get_all_grievances(db, status)

@router.patch("/grievances/{grievance_id}", response_model=GrievanceOut)
def update_status(grievance_id: int, data: GrievanceStatusUpdate, db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    return update_grievance_status(db, grievance_id, data)

@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db), admin: User = Depends(get_admin_user)):
    return get_dashboard_stats(db)
