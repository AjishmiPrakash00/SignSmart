import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import LogoIcon from "../components/Logo";

function CheckIcon({ className = '' }){
  return (
    <svg className={"w-10 h-10 text-green-600 " + className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" stroke="#16a34a" strokeWidth="2" fill="#ecfdf5" />
      <path d="M7 12l3 3 7-7" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon(){
  return (
    <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" stroke="#ef4444" strokeWidth="2" fill="#fff1f2" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Results() {
  const { state } = useLocation();
  const results = state?.results || [];

  const total = results.length;
  const counts = results.reduce((acc, r) => { const k = r.risk || 'LOW'; acc[k] = (acc[k]||0)+1; return acc; }, {});

  // Determine overall severity: SAFE (no risks) or highest severity present
  const severityOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
  let overall = 'SAFE';
  if (total > 0) {
    overall = 'LOW';
    for (const r of results) {
      const sev = r.risk || 'LOW';
      if (severityOrder[sev] > severityOrder[overall]) overall = sev;
    }
  }

  const safetyScore = overall === 'HIGH' ? 0 : overall === 'MEDIUM' ? 40 : overall === 'LOW' ? 80 : 100;

  const colorMap = {
    HIGH: { text: 'text-red-600', bg: 'bg-rose-50', border: 'border-rose-100' },
    MEDIUM: { text: 'text-orange-500', bg: 'bg-amber-50', border: 'border-amber-100' },
    LOW: { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
    SAFE: { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-100' }
  };

  const theme = colorMap[overall] || colorMap.SAFE;

  const titleText = overall === 'SAFE'
    ? 'Low Risk - Looks Safe'
    : overall === 'LOW'
      ? 'Low Risk Detected'
      : overall === 'MEDIUM'
        ? 'Moderate Risk Detected'
        : 'High Risk Detected';

  const reportRef = useRef(null);

  async function handleDownload() {
    try {
      const loadScript = (src) => new Promise((res, rej) => {
        if (document.querySelector(`script[src="${src}"]`)) return res();
        const s = document.createElement('script');
        s.src = src;
        s.onload = res;
        s.onerror = rej;
        document.body.appendChild(s);
      });

      const html2canvasUrl = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      const jspdfUrl = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

      await loadScript(html2canvasUrl);
      await loadScript(jspdfUrl);

      const node = reportRef.current;
      if (!node) return alert('Nothing to export');

      const canvas = await window.html2canvas(node, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = { width: canvas.width, height: canvas.height };
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);

      let heightLeft = imgHeight - pdfHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('SignSmart-report.pdf');
    } catch (err) {
      console.error(err);
      alert('Failed to generate PDF');
    }
  }

  return (
    <div className="site-wrapper py-8" ref={reportRef}>
      <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
          <LogoIcon size="md" />
          <div>
            <div className="text-purple-700 font-semibold">SignSmart</div>
            <div className="text-sm text-slate-500">Contract Analysis Report</div>
          </div>
        </div>

        <div>
          <Link to="/" className="text-sm text-slate-600 hover:underline">← Analyze Another</Link>
        </div>
      </header>

      {/* Result summary card */}
      <div className="mt-6 rounded-2xl bg-white shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="mt-1">
            {overall === 'HIGH' ? <CrossIcon /> : <CheckIcon />}
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${theme.text}`}>
              {titleText}
            </h2>
            <p className="text-slate-600 mt-1">
              {overall === 'HIGH' && 'This contract contains multiple concerning clauses. We strongly recommend legal review before signing.'}
              {overall === 'MEDIUM' && 'This contract contains some concerning clauses. Consider legal review before signing.'}
              {overall === 'LOW' && 'This contract contains a few risky clauses. Read carefully and consider asking for changes.'}
              {overall === 'SAFE' && 'This contract appears relatively safe, but always read carefully.'}
            </p>
            <div className="mt-4 flex gap-8 items-end">
              <div>
                <div className="text-sm text-slate-500">Safety Score</div>
                <div className={`text-3xl font-extrabold ${theme.text}`}>{safetyScore}/100</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">Risks Found</div>
                <div className="text-2xl font-bold text-slate-800">{total}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-auto">
          <button onClick={handleDownload} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full shadow">Download Report</button>
        </div>
      </div>

      {/* Secondary status (only when safe) */}
      {overall === 'SAFE' && (
        <div className="mt-6 rounded-2xl bg-emerald-50 border border-emerald-100 p-6 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-2"><CheckIcon /></div>
            <h3 className="text-lg font-semibold text-emerald-700">No Major Risks Detected</h3>
            <p className="text-slate-600 mt-2 max-w-3xl">This contract doesn't contain obvious red flags from our database. However, always read the entire document carefully and consult a lawyer if you're unsure.</p>
          </div>
        </div>
      )}

      {/* Risky clauses section - show when any risks found */}
      {total > 0 && (
        <section className="mt-8">
          <h4 className="text-lg font-semibold text-rose-600 mb-4">Risky Clauses Found</h4>

          <div className="space-y-6">
            {results.map((r, idx) => {
              const sev = r.risk || 'LOW';
              const cls = colorMap[sev] || colorMap.LOW;
              return (
                <div key={idx}>
                  <div className={`rounded-xl ${cls.bg} border ${cls.border} p-4`}>
                    <div className="flex items-start gap-3">
                      <div className={`${cls.text} font-semibold`}>{r.title || 'Potential risky clause'}</div>
                    </div>
                    <pre className={`mt-3 font-mono text-sm text-slate-600 ${cls.bg} p-3 rounded`}>{r.sentence}</pre>
                  </div>

                  <div className="mt-3 rounded-xl bg-white shadow-sm p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-sky-50 text-sky-600 rounded-md flex items-center justify-center">i</div>
                      <div>
                        <div className="font-semibold">In Simple Words</div>
                        <div className="text-sm text-slate-600">{r.explanation}</div>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-md flex items-center justify-center">•</div>
                      <div>
                        <div className="font-semibold">Why This is Risky for Women</div>
                        <div className="text-sm text-slate-600">Can lead to sudden job loss without security.</div>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-md flex items-center justify-center">✓</div>
                      <div>
                        <div className="font-semibold">What You Can Do</div>
                        <div className="text-sm text-slate-600">Ask for mutual termination terms or written notice period.</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* General tips */}
      <section className="mt-8 rounded-2xl bg-violet-50 border border-violet-100 p-6">
        <h4 className="font-semibold">General Contract Safety Tips</h4>
        <ul className="mt-3 list-disc pl-5 text-slate-600 space-y-2">
          <li>Never sign a contract you haven't read completely</li>
          <li>Ask for time to review — don't sign under pressure</li>
          <li>Get clarification in writing for anything unclear</li>
          <li>Keep copies of all signed documents</li>
          <li>Consult a lawyer for important contracts</li>
          <li>Trust your instincts — if something feels wrong, investigate further</li>
        </ul>
      </section>

      {/* Need legal help */}
      <section className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
        <h4 className="font-semibold mb-3">Need Legal Help?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">Free Legal Aid</div>
            <div className="text-sm text-slate-600">State Legal Services Authority</div>

            <div className="mt-4 font-semibold">National Helpline</div>
            <div className="text-sm text-slate-600">181 — for legal rights and assistance</div>
          </div>

          <div>
            <div className="font-semibold">Consumer Courts</div>
            <div className="text-sm text-slate-600">For service-related disputes</div>

            <div className="mt-4 font-semibold">Labour Department</div>
            <div className="text-sm text-slate-600">For employment contract issues</div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm">
        <strong>Legal Disclaimer:</strong> This analysis is for educational and awareness purposes only. It is not a substitute for professional legal advice. Always consult a qualified lawyer before signing important contracts.
      </div>
    </div>
  );
}