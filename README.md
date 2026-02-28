# 🎤 ORATOR 
> **"Baby steps to the mic. Giant leaps in confidence."**

🏆 **Submission for the GDE MIT Hackathon 2026 (Education Track)** 📍 *Gábor Dénes University, Budapest*

[![Powered by Azure](https://img.shields.io/badge/Powered%20by-Microsoft%20Azure%20AI-blue?style=for-the-badge)](https://azure.microsoft.com/)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Tailwind-61DAFB?style=for-the-badge&logo=react&logoColor=black)]()
[![Backend](https://img.shields.io/badge/Backend-Python%20%7C%20FastAPI-3776AB?style=for-the-badge&logo=python&logoColor=white)]()

## 📌 Project Overview
**ORATOR** is a gamified, bilingual (English & Hungarian) web application designed to help students and professionals overcome the fear of public speaking (glossophobia). By combining impromptu topic generation with real-time AI analysis, ORATOR serves as a 24/7 personal speaking coach.

This project directly addresses the **Education Challenge** by providing a scalable, stress-free environment for students to practice thesis defenses, presentations, and everyday communication.

## 🎥 Hackathon Deliverables
* **YouTube Demo (max 2 mins):** https://youtu.be/ok3tHQ2btQY?feature=shared
* **Presentation Slides:** https://drive.google.com/file/d/1jkPGfIYV_psNMBJ7C2SQdfKaoW0zvJ5o/view
* **Live Prototype:** https://orator-99.vercel.app

---

## ✨ Key Features
1. **🎲 Impromptu Roulette:** Gamified random topic generator to simulate on-the-spot speaking scenarios.
2. **🎙️ Real-time Transcription:** Uses browser-native Speech Recognition to display spoken words instantly on screen.
3. **🇭🇺 Bilingual Support:** Full UI and speech-recognition support for both English (`en-US`) and Hungarian (`hu-HU`).
4. **🧠 Azure Pronunciation Assessment:** Deep integration with Azure AI to provide precise, industry-standard metrics:
   * **Fluency Score**
   * **Pronunciation Score**
   * **Prosody (Intonation) Score**
5. **🤖 AI Coaching (LLM):** Advanced prompt engineering generates actionable feedback (Strengths & Areas to Improve) based on the specific transcript.

---

## 🏗️ Architecture & Tech Stack

### Frontend (Client)
* **Framework:** React + Vite
* **Styling:** Tailwind CSS + `shadcn/ui`
* **Animations:** Framer Motion (for smooth, stress-reducing UI transitions)
* **Audio Handling:** Native Web Speech API & MediaRecorder

### Backend (Server)
* **Framework:** Python / FastAPI
* **AI & Machine Learning:** * Microsoft Azure AI Speech (Pronunciation Assessment)
  * OpenAI / Gemini API (for contextual LLM feedback generation)

---

## 🚀 How to Run Locally

### Prerequisites
* Node.js (v18+)
* Python 3.10+
* Azure AI Speech API Key
* LLM API Key (OpenAI or Gemini)

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
The frontend will run on http://localhost:8080 (or similar).

2. Backend Setup
Bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
Create a .env file in the backend directory:

Code snippet
AZURE_SPEECH_KEY=your_azure_key
AZURE_REGION=your_azure_region
LLM_API_KEY=your_llm_api_key
Run the FastAPI server:

Bash
uvicorn main:app --reload --port 8000
🎯 The Impact (Why it matters)
Public speaking is a critical soft skill often neglected in traditional education due to a lack of resources for one-on-one coaching. ORATOR democratizes access to expert-level feedback. By utilizing Microsoft Azure's robust prosody and fluency metrics combined with targeted LLM prompting, we provide an affordable, highly scalable tool for educational institutions worldwide.

👥 Team
Rafael Ibayev - Full Stack Developer
Roni Osipov - Web developer
Elene Samsiani - Frontend Designer
Karina Osipovi - AI Integration
