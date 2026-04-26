from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database.db import Base, engine
from app.routers import auth_router, grievance_router, ticket_router, admin_router

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Digital Grievance Redressal System API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router.router)
app.include_router(grievance_router.router)
app.include_router(ticket_router.router)
app.include_router(admin_router.router)

@app.get("/")
def root():
    return {"message": f"Welcome to {settings.APP_NAME} API"}
