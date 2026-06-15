from fastapi import FastAPI

app = FastAPI(title="NouriPet API")


@app.get("/")
def home():
    return {
        "message": "welcome to nutriki 🌱"
    }