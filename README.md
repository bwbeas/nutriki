# 🌷Nutriki
🔗 https://nutriki-blush.vercel.app

**Nutriki** is a full-stack web application designed to encourage healthy habits through simple daily tracking, personalized insights, and a gentle, calming interface.
Originally built as a personal project to solve a problem I faced myself, Nutriki grew into an application I wanted to share with everyone.

<img width="600" height="400" alt="1" src="https://github.com/user-attachments/assets/f48386d5-362d-4851-a57f-f8fcd4bc3ce5" />

---
## 📌Features

### 🍱Meal Tracking
- Log your meals throughout the day
- View your recent nutrition history
- Monthly meal analytics

### 💧Water Tracking
- Log glasses of water
- Daily hydration tracking
- Best hydration day insights
- Monthly hydration charts

### 😊Mood Tracking
- Record your daily mood
- Personalized mood messages
- Mood distribution analytics

### 🩸Menstrual Cycle Companion
- Track your latest period
- Automatic cycle day calculation
- Current phase detection
- Ovulation prediction
- Next period prediction
- Interactive calendar highlighting important dates

### 🌱Plant Growth
- Name your own virtual plant
- Your plant grows based on your wellness journey
- Different growth stages from seed to tree

### 📊Dashboard
- Personalized affirmations
- Cycle summary
- Hydration reminders
- Meal reminders
- Mood-based encouragement
- Plant progress overview

### 📈Analytics
- Weekly wellness summary
- Monthly meal logs
- Monthly hydration logs
- Mood distribution charts
- Best nutrition and hydration days

### 📬Contact Page
Visitors can leave feedback or suggestions directly through the application.

---
## 🛠Tech Stack

### Frontend
- React
- Vite
- Material UI
- Axios
- Recharts
- Day.js

### Backend
- FastAPI
- SQLAlchemy
- JWT Authentication
- Python

### Database
- PostgreSQL (Supabase)

### Deployment
- Frontend: Vercel
- Backend: Render

---
## 📷Screenshots
<img width="450" height="200" alt="2" src="https://github.com/user-attachments/assets/f4478c98-372c-442f-aca6-c7ead3bfe38c" />
<img width="450" height="300" alt="3" src="https://github.com/user-attachments/assets/dee5ea9c-7117-4811-af5f-e5abcac78868" />
<img width="450" height="300" alt="4" src="https://github.com/user-attachments/assets/88bdc58a-9d16-49ba-a21c-328bf159a6c3" />
<img width="400" height="200" alt="5" src="https://github.com/user-attachments/assets/235ba9c5-714b-44c9-b70e-8e5db86fc127" />
<img width="450" height="350" alt="6" src="https://github.com/user-attachments/assets/1febf546-1e9c-46c4-8670-20812c71afdb" />

---
## Running Locally
### Clone the repository
```bash
git clone https://github.com/yourusername/nutriki.git
```
```bash
cd nutriki
```
---
### Backend
```bash
cd backend
python -m venv .venv
```
Activate the virtual environment.
Install dependencies:
```bash
pip install -r requirements.txt
```
Create a `.env` file:
```env
DATABASE_URL=your_database_url
SECRET_KEY=your_secret_key
EMAIL_ADDRESS=your_email
EMAIL_PASSWORD=your_app_password
```
Run the server:
```bash
uvicorn app.main:app --reload
```
---
### Frontend
```bash
cd frontend
npm install
npm run dev
```
---
## ❤️Why I Built Nutriki

I built Nutriki because I couldn't find a wellness tracker that felt calm, encouraging, and focused on women's everyday health.
Instead of overwhelming dashboards or calorie counting, I wanted something that gently reminds us that every small step—drinking water, eating a meal, checking in with our emotions—is worth celebrating.
I hope Nutriki can make someone else's wellness journey feel just a little easier. 🌷

-beas jana
