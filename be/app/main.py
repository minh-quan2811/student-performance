from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import predict

app = FastAPI(title="Student Performance API")

# CORS (allow Next.js frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(predict.router, prefix="/api", tags=["predict"])


@app.get("/")
def root():
    return {"status": "ok", "message": "Student Performance API running"}