// frontend/src/services/api.js

const API_URL = "http://127.0.0.1:8000/analyze";

export async function analyzeDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(API_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to analyze document");
  }

  return res.json(); // { results: [...] }
}

export async function analyzeText(text) {
  const res = await fetch("http://127.0.0.1:8000/analyze-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("Failed to analyze text");
  }

  return res.json();
}