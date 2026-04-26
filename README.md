# GrievanceHub

A Digital Grievance Redressal System built with React + FastAPI + MySQL.

## Project Structure

```
grievance-hub/
├── backend/   (FastAPI + MySQL)
└── frontend/  (React + Tailwind CSS)
```

## Setup

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt
```

Create MySQL database:
```sql
CREATE DATABASE grievancehub;
```

Update `.env` with your MySQL credentials, then run:
```bash
uvicorn app.main:app --reload
```

API runs at: http://localhost:8000  
Swagger docs: http://localhost:8000/docs

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

---

## Create Admin User

After running backend, manually update a user's role in MySQL:
```sql
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';
```

## Features

- Anonymous + logged-in grievance submission
- Unique ticket ID generation
- Citizen dashboard to track own grievances
- Admin dashboard with stats + status management
- JWT-based authentication
