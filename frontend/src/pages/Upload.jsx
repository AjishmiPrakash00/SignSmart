import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeDocument, analyzeText } from "../services/api";
import LogoIcon from "../components/Logo";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [tab, setTab] = useState("paste");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    setLoading(true);
    try {
      const data = await analyzeDocument(file);
      navigate("/results", { state: { results: data.results } });
    } catch (err) {
      alert("Backend error. Check FastAPI terminal.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!text || text.trim() === "") return alert("Please paste contract text");

    setLoading(true);
    try {
      const data = await analyzeText(text);
      navigate("/results", { state: { results: data.results } });
    } catch (err) {
      alert("Backend error. Check FastAPI terminal.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-wrapper">
      <header className="brand">
        <div className="shield">
          <LogoIcon size="md" />
        </div>
        <div>
          <div className="title">SignSmart</div>
          <div className="tag">Know Your Rights Before You Sign</div>
        </div>
      </header>

      <main className="hero">
        <h1>Sign Smart, Not Scared</h1>
        <p>Don't understand what you're signing? We highlight risky clauses in contracts and explain them in simple language—before you commit.</p>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-number">12+</div>
            <div className="stat-label">Risk Types</div>
          </div>
          <div className="stat-card">
            <div className="stat-number text-pink-500">Instant</div>
            <div className="stat-label">Analysis</div>
          </div>
          <div className="stat-card">
            <div className="stat-number text-orange-400">Free</div>
            <div className="stat-label">Always</div>
          </div>
        </div>
      </main>

      <section className="main-card">
        <div className="tabs">
          <div className={`tab ${tab === 'paste' ? 'active' : ''}`} onClick={() => setTab('paste')}>Paste Text</div>
          <div className={`tab ${tab === 'upload' ? 'active' : ''}`} onClick={() => setTab('upload')}>Upload File</div>
        </div>

        {tab === 'paste' ? (
          <form onSubmit={handleTextSubmit}>
            <label className="block text-sm text-slate-600">Paste your contract or agreement text below</label>
            <textarea className="textarea" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your rent agreement, job contract, NDA, hospital consent form, or any legal document here..." />
            <div className="controls">
              <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Analyzing...' : 'Analyze Text'}</button>
              <button className="btn-ghost" type="button" onClick={() => setText('')}>Clear</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleFileSubmit}>
            <label className="block text-sm text-slate-600">Upload PDF or image file</label>
            <input className="mt-3" type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files[0])} />
            <div className="controls">
              <button className="btn-primary" type="submit" disabled={loading}>{loading ? 'Analyzing...' : 'Analyze File'}</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}