from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.schemas.user_schema import UserRegister, UserLogin, TokenResponse
from app.services.auth_service import register_user, login_user

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/register", response_model=dict)
def register(data: UserRegister, db: Session = Depends(get_db)):
    user = register_user(db, data)
    return {"message": "Registration successful", "user_id": user.id}

@router.post("/login", response_model=TokenResponse)
def login(data: UserLogin, db: Session = Depends(get_db)):
    token, user = login_user(db, data.email, data.password)
    return {"access_token": token, "token_type": "bearer", "user": user}
