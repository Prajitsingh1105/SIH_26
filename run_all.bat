@echo off
echo ========================================================
echo   AICTE Approval Workflow Automation Platform
echo   Starting Backend, AI Microservice, and Frontend...
echo ========================================================

start "AICTE Express Backend (Port 5100)" cmd /k "cd backend && node server.js"
start "AICTE Python APH Microservice (Port 8000)" cmd /k "cd ai-service && python app.py"
start "AICTE React Frontend (Port 5173)" cmd /k "cd frontend && npm run dev"

echo All services launched!
echo Access the Frontend at: http://localhost:5173
echo Express Backend at:    http://localhost:5100
echo Python APH Service at: http://localhost:8000
pause
