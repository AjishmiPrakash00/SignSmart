from fastapi import FastAPI, UploadFile, File, Body
from fastapi.middleware.cors import CORSMiddleware
from pdf_reader import extract_text_from_pdf
from ocr_service import extract_text_from_image
from clause_detector import detect_risks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    if file.filename.lower().endswith(".pdf"):
        text = extract_text_from_pdf(file.file)
    else:
        text = extract_text_from_image(file.file)

    results = detect_risks(text)
    return {"results": results}


@app.post("/analyze-text")
async def analyze_text(data: dict = Body(...)):
    text = data.get("text", "")
    results = detect_risks(text)
    return {"results": results}