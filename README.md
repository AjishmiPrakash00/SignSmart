# 🛡️ SignSmart – Contract Risk Awareness Platform

> **Before you sign, know what you’re giving away.**

SignSmart helps users identify hidden risks in agreements and contracts before signing them.

It analyzes uploaded documents and highlights potentially harmful clauses in simple language — empowering users to make informed decisions.

---

## 🚨 Problem

People often sign:

- Rental agreements  
- Employment contracts  
- Internship offers  
- Loan documents  
- Hostel/consent forms  

without fully understanding hidden legal risks.

Common hidden clauses:

- Termination without notice  
- Penalty fees  
- Surveillance consent  
- Liability waivers  
- Visitor restrictions  
- Discriminatory or restrictive terms  

SignSmart alerts users to these before they sign.

---

## 🎯 Features

### 🔍 Document Analysis
- 📄 Upload PDF or image agreements  
- 📝 Automatic text extraction (PDF + OCR)  
- ⚠️ Risky clause detection using keyword logic  
- 🧠 Simple-English explanations  

### 📊 Insight & Reporting
- 🔴 Risk level classification (High / Medium / Low)  
- 🎨 Highlighted risky clauses in results  
- 📊 Overall document risk score  
- 📥 Downloadable risk analysis report  

### 🤖 AI Support & Navigation
- 🤖 Built-in AI chatbot assistant to guide users  
- 🧭 Helps users navigate the site and understand results  

### 🛠️ Other
- 🔐 Login page (UI-ready for authentication)

---

## 🏗️ Tech Stack

**Frontend**  
- React (Vite)  
- React Router  
- Fetch API  

**Backend**  
- FastAPI  
- Uvicorn  
- pdfplumber (PDF extraction)  
- pytesseract (OCR)  
- Python  

---

## 📁 Project Structure

```
SignSmart/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Upload.jsx
│   │   │   └── Results.jsx
│   │   ├── components/
│   │   │   ├── HighlightedText.jsx
│   │   │   └── RiskBadge.jsx
│   │   └── services/
│   │       └── api.js
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── pdf_reader.py
│   ├── ocr_service.py
│   ├── clause_detector.py
│   └── requirements.txt
│
├── data/
│   └── keywords.json
│
└── README.md
```

---

## ⚙️ Installation

### 🔹 Clone Repo

```bash
git clone https://github.com/Krisha-here/SignSmart.git
cd SignSmart
```

---

### 🔹 Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt

uvicorn main:app --reload
```

Backend available at:

```
http://127.0.0.1:8000
```

API docs:

```
http://127.0.0.1:8000/docs
```

---

### 🔹 Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend available at:

```
http://localhost:5173
```

---

## 🔎 How It Works

1. User uploads a PDF or image document  
2. Backend extracts text using OCR/pdf parsing  
3. Text is analyzed for risky clauses  
4. Risk classification applied  
5. Results displayed with explanations  
6. User can download detailed report  
7. AI chatbot assists along the way  

---

## 🧪 Example

**Input Document:**
```
The company may terminate employment without notice.
Surveillance monitoring may be conducted daily.
A penalty of ₹500 applies for late entry.
```

**Output:**
- 🔴 Termination without notice – High Risk  
- 🔴 Surveillance clause – High Risk  
- 🟠 Penalty charge – Medium Risk  
- 📊 Total Score: **23/100 (Low Risk Threshold)**  

---

## 🌍 Future Improvements

- AI-powered clause summarization
- Multi-language support
- Clause categorization (Employment, Privacy, Finance)
- JWT-based user authentication
- Risk score dashboard visualization

---

## 🏆 Vision

SignSmart empowers individuals with legal awareness so they can make informed decisions before signing agreements.

**Legal awareness • Personal protection • Confidence to decide**

---

## 📜 License

This project is open-source under the MIT License.
