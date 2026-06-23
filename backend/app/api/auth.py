from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas.user import UserRegister, UserLogin
from app.db.dependencies import get_db
from app.models.user import User
from app.core.security import hash_password
from app.core.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

#register endpoint
@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):
    
    # check if user exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # create user
    new_user = User(
        nickname=user.nickname,
        email=user.email,
        password_hash=hash_password(user.password),
        age=user.age,
        height_cm=user.height_cm,
        weight_kg=user.weight_kg,
        activity_level=user.activity_level
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "user created successfully 🌱",
        "user_id": new_user.id
    }

from app.core.security import verify_password
from app.core.jwt import create_access_token

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"user_id": db_user.id})

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_me(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    user = (
        db.query(User)
        .filter(
            User.id ==
            current_user["user_id"]
        )
        .first()
    )

    return {
        "nickname": user.nickname
    }