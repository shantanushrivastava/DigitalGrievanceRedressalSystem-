from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database.db import get_db
from app.schemas.grievance_schema import GrievanceCreate, GrievanceOut
from app.services.grievance_service import submit_grievance, get_user_grievances
from app.core.dependencies import get_current_user
from app.models.user_model import User

router = APIRouter(prefix="/api/grievances", tags=["Grievances"])

@router.post("/submit", response_model=GrievanceOut)
async def submit(data: GrievanceCreate, db: Session = Depends(get_db)):
    return await submit_grievance(db, data)

@router.post("/submit/logged-in", response_model=GrievanceOut)
async def submit_logged_in(data: GrievanceCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await submit_grievance(db, data, user_id=current_user.id)

@router.get("/my", response_model=List[GrievanceOut])
def my_grievances(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_user_grievances(db, current_user.id)
