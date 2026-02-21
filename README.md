<img width="1034" height="512" alt="image" src="https://github.com/user-attachments/assets/a0e9da0f-7565-42a9-bb9d-ef464ce08550" />

# 🛡️ SignSmart – Contract Risk Awareness Platform 🎯

---

## Basic Details

**Team Name:** Bug Busters  

### Team Members
- Member 1: Ajishmi Prakash – Adi Shankara Institute of Engineering and technology 
- Member 2: Aaryatha P R – Adi Shankara Institute of Engineering and technology    

---

## Hosted Project Link

Frontend: [http://localhost:5173 ](https://signsmarts.netlify.app/login) 
Backend: [http://127.0.0.1:8000  ](https://signsmart.onrender.com)

https://signsmarts.netlify.app/login

---

## Project Description

SignSmart is a web-based platform that analyzes agreements and contracts before signing.  
It detects risky clauses, explains them in simple language, assigns a risk score, and generates downloadable reports — helping users make informed decisions.

---

## The Problem Statement

Many individuals sign rental agreements, employment contracts, internship offers, and loan documents without fully understanding hidden clauses.

These documents often contain:
- Termination without notice  
- Hidden penalty charges  
- Surveillance consent  
- Liability waivers  
- Restrictive policies  

Later, the response becomes:

> “But you signed it.”

---

## The Solution

SignSmart solves this problem by:

- Allowing users to upload contracts (PDF/Image)  
- Extracting text using OCR and PDF parsing  
- Detecting risky clauses using keyword logic  
- Classifying risk levels (High / Medium / Low)  
- Generating an overall document risk score  
- Providing simple-English explanations  
- Offering a downloadable risk report  
- Assisting users with an AI chatbot for navigation  

---

# Technical Details

## Technologies/Components Used

### For Software

**Languages used:**
- Python  
- JavaScript  

**Frameworks used:**
- FastAPI  
- React (Vite)  

**Libraries used:**
- pdfplumber  
- pytesseract  
- React Router  
- Fetch API  

**Tools used:**
- VS Code  
- Git & GitHub  
- Uvicorn  
- Node.js  

---

# Features

### 📄 Feature 1: Smart Document Upload
Upload PDF or image-based agreements for analysis.

### 🔍 Feature 2: Automatic Text Extraction
Extracts text using PDF parsing and OCR.

### ⚠️ Feature 3: Risk Detection Engine
Detects risky clauses using keyword logic and classifies them into High / Medium / Low risk.

### 📊 Feature 4: Document Risk Score
Generates an overall risk score for the uploaded document.

### 📥 Feature 5: Downloadable Report
Users can download a structured risk analysis report.

### 🤖 Feature 6: AI Chatbot Assistant
Built-in chatbot to guide users through navigation and understanding results.

---

# Implementation

## For Software

### Installation

```bash
git clone https://github.com/Krisha-here/SignSmart.git
cd SignSmart
```

### Backend Setup

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:
http://127.0.0.1:8000

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173

---

# Project Documentation

## Screenshots

<img width="1367" height="681" alt="image" src="https://github.com/user-attachments/assets/ac6bbc25-10b6-4cad-8ebf-159d969270aa" />
login page

<img width="1465" height="640" alt="image" src="https://github.com/user-attachments/assets/15c9e819-003b-45ea-a8ce-902815388752" />
Upload PDF Here

<img width="1460" height="643" alt="image" src="https://github.com/user-attachments/assets/293d8c29-ece4-4882-87fc-1ad2cb864a47" />
Risk Analysis and highlighted clauses.

<img width="1301" height="640" alt="image" src="https://github.com/user-attachments/assets/b7b368b6-5771-4066-8189-306eca3d80d5" />
Downloadig the Analysis Report

<img width="1537" height="676" alt="image" src="https://github.com/user-attachments/assets/69995c02-d518-4bee-9f92-e4834e3efaa8" />
AI chatbot assisting users in navigation.

---

## System Architecture

User → React Frontend → FastAPI Backend →  
PDF/OCR Processing → Clause Detection Engine → Risk Scoring → Response to Frontend  

The frontend communicates with the backend via REST API.  
The backend processes documents and returns structured risk data.

---

## Application Workflow

1. User logs in  
2. Uploads contract  
3. Backend extracts text  
4. Risk detection algorithm runs  
5. Risk score calculated  
6. Results displayed  
7. User downloads report  

---

# API Documentation

Base URL:
```
http://127.0.0.1:8000
```

---

## Endpoints

### POST /upload

**Description:** Upload and analyze a document  

**Request:**  
Form-data (file upload)

**Response:**
```json
{
  "status": "success",
  "risk_score": 45,
  "risk_level": "Medium",
  "detected_clauses": []
}
```

---

### GET /docs

Auto-generated FastAPI Swagger documentation.

---

# Project Demo

## Video

Explain:
- Document upload
- Risk detection
- Score generation
- Report download
- Chatbot navigation

---

# AI Tools Used (Transparency)

**Tool Used:** ChatGPT  

**Purpose:**
- README structuring  
- Debugging backend logic  
- Feature brainstorming  
- Documentation formatting  

**Approximate AI-generated code:** ~15–20%

**Human Contributions:**
- Architecture design  
- Backend logic  
- Clause detection engine  
- UI implementation  
- Risk scoring logic  
- Testing and integration  

---

# Team Contributions

**Ajishmi Prakash:**
- Frontend development 
- Risk scoring system
- Documentation

**Aaryatha P R:**
- Backend development (FastAPI)
- Frontend development
- UX design
- API integration


---

# License

This project is licensed under the MIT License.

---

Made with ❤️ at TinkerHub...
