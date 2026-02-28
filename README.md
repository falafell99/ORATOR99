🎤 ORATOR
"Baby steps to the mic. Giant leaps in confidence."

🏆 Submission for the GDE MIT Hackathon 2026 (Education Track) 📍 Gábor Dénes University, Budapest

📌 Project Overview
ORATOR is a gamified, bilingual (English & Hungarian) web application designed to help students and professionals overcome the fear of public speaking (glossophobia). By combining impromptu topic generation with real-time AI analysis, ORATOR serves as a 24/7 personal speaking coach.

This project directly addresses the Education Challenge by providing a scalable, stress-free environment for students to practice thesis defenses, presentations, and everyday communication.

🎥 Hackathon Deliverables
YouTube Demo (max 2 mins): Watch here
Presentation Slides: View Google Drive
Live Prototype: orator-99.vercel.app
✨ Key Features
🎲 Impromptu Roulette: Gamified random topic generator to simulate on-the-spot speaking scenarios.
🎙️ Real-time Transcription: Uses browser-native Speech Recognition to display spoken words instantly on screen.
🇭🇺 Bilingual Support: Full UI and speech-recognition support for both English (en-US) and Hungarian (hu-HU).
🧠 Azure Pronunciation Assessment: Deep integration with Azure AI to provide precise, industry-standard metrics:
Fluency Score
Pronunciation Score
Prosody (Intonation) Score
🤖 AI Coaching (LLM): Advanced prompt engineering generates actionable feedback based on the specific transcript.
🧠 Linguistic Analysis & DS Metrics
Our FastAPI backend implements custom algorithms to provide objective data-driven insights:
Vocabulary Richness (TTR): Measures lexical diversity using the Type-Token Ratio.
Pace Analysis (WPM): Monitors the Words Per Minute rate to ensure an optimal speaking pace (target: 120–150 WPM).
Confidence Scoring: A custom heuristic engine that detects filler words and hedging phrases to calculate a real-time Confidence Index.
🏗️ Architecture & Tech Stack
Frontend (Client)
Framework: React + Vite
Styling: Tailwind CSS + shadcn/ui
Animations: Framer Motion (for smooth, stress-reducing UI transitions)
Audio Handling: Native Web Speech API & MediaRecorder
Backend (Server)
Framework: Python / FastAPI
AI & Machine Learning:
Microsoft Azure AI Speech (Pronunciation Assessment)
OpenAI / Gemini API (For contextual LLM feedback generation)
🚀 How to Run Locally
Prerequisites
Node.js (v18+)
Python 3.10+
Azure AI Speech API Key & LLM API Key
1. Frontend Setup
Bash
cd ORATOR99
npm install
npm run dev
2. Backend Setup
Bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
Create a .env file in the backend directory:

Code snippet
AZURE_SPEECH_KEY=your_azure_key
AZURE_REGION=your_azure_region
LLM_API_KEY=your_llm_api_key
Run the FastAPI server:

Bash
python3 main.py
🎯 The Impact (Why it matters)
Public speaking is a critical soft skill often neglected in traditional education. ORATOR democratizes access to expert-level feedback. By utilizing Microsoft Azure's robust metrics combined with targeted LLM prompting, we provide an affordable, highly scalable tool for educational institutions worldwide.

👥 Team
Rafael Ibayev - Full Stack Developer
Roni Osipov - Web Developer
Elene Samsiani - Frontend Designer
Karina Osipovi - AI Integration
Developed for the GDE MIT Hackathon 2026.
