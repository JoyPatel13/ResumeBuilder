# PrepIQ 🧠
### AI-Powered Interview Preparation Platform

> Upload your resume, paste a job description, and let AI build your personalized interview strategy in seconds.

**[Live Demo](https://prep-iq-sepia.vercel.app)** • Built with the MERN Stack + Google Gemini AI

---

## 📌 Overview

PrepIQ is a full-stack GenAI web application that helps job seekers prepare smarter for interviews. By analyzing your resume and the target job description, it generates a tailored interview plan — including technical and behavioral questions, skill gap analysis, a day-by-day preparation roadmap, and an ATS-optimized resume PDF.

---

## ✨ Features

- **AI Interview Report Generation** — Paste a job description and upload your resume (or write a self-description), and Gemini AI generates a complete, structured interview strategy
- **Technical & Behavioral Questions** — Role-specific questions with interviewer intention and model answers
- **Skill Gap Analysis** — Identifies missing skills with severity levels (low / medium / high)
- **Preparation Roadmap** — A personalized day-by-day study plan tailored to the job
- **ATS-Optimized Resume PDF** — Generates a professionally formatted, ATS-friendly resume as a downloadable PDF using Puppeteer
- **JWT Authentication** — Secure cookie-based auth with token blacklisting on logout
- **Interview History** — View and revisit all previously generated interview reports

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| React Router v7 | Client-side routing |
| Axios | HTTP client |
| SCSS | Styling |
| Context API | Global state management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Authentication |
| Multer | Resume file upload handling |
| pdf-parse | PDF text extraction |
| Puppeteer | HTML to PDF generation |
| Google Gemini AI (`@google/genai`) | AI report & resume generation |
| Zod | Schema validation for AI responses |

---

## 🏗️ Architecture

```
PrepIQ/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── config/           # Database connection
│   │   ├── controllers/      # Route handlers (auth, interview)
│   │   ├── middlewares/      # JWT auth, file upload
│   │   ├── models/           # Mongoose schemas (User, InterviewReport, Blacklist)
│   │   ├── routes/           # API route definitions
│   │   ├── services/         # AI service (Gemini integration)
│   │   └── app.js
│   └── server.js
│
└── frontend/                 # React + Vite SPA
    └── src/
        ├── features/
        │   ├── auth/         # Login, Register, Protected route
        │   └── interview/    # Home, Interview report pages
        └── App.jsx
```

---

## 🤖 AI Integration

PrepIQ uses **Google Gemini 2.5 Flash** via the `@google/genai` SDK with structured JSON output (constrained by a response schema) to ensure consistent, parseable AI responses.

**Interview Report Generation:**
- Sends resume text + job description + self-description to Gemini
- Gemini returns a structured JSON object with `title`, `matchScore`, `technicalQuestions`, `behavioralQuestions`, `skillGaps`, and `preparationPlan`
- Response is validated and saved to MongoDB

**Resume PDF Generation:**
- Gemini generates an ATS-optimized HTML resume tailored to the job description
- Puppeteer renders the HTML and exports it as a downloadable PDF

---

## 🔐 Authentication Flow

- User registers/logs in → JWT issued and stored in an **httpOnly cookie**
- Protected routes verify the JWT via middleware
- On logout, the token is added to a **blacklist collection** in MongoDB, invalidating it immediately

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GOOGLE_GENAI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## 🌐 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

## 📸 Screenshots

<img width="1252" height="901" alt="{DAAEE542-14AF-4AFE-9950-6CFFB2E897E7}" src="https://github.com/user-attachments/assets/980b6298-c7fc-47c3-8a18-916cc2506bb8" />

<img width="1517" height="911" alt="{912F5204-A181-4ECA-A15A-25BB1604A655}" src="https://github.com/user-attachments/assets/a17bf50d-03df-4c73-a248-71cbe60e4e59" />

<img width="1201" height="914" alt="{99F8C7C8-8EC0-408B-ADD0-C70E5C2F9830}" src="https://github.com/user-attachments/assets/7aa2610b-884c-4fa8-a659-0aec2d9a1ab3" />

<img width="1187" height="896" alt="{61E140A3-B520-44EF-A673-FFF938F04EB1}" src="https://github.com/user-attachments/assets/c8bd3c1e-40f9-4a98-b2e5-e95ef90355c5" />






---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built by <a href="https://github.com/joypatel13">Joy Patel</a></p>
