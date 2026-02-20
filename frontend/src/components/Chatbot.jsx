import { useState, useRef, useEffect } from 'react'

const responses = {
  hello: 'Hi! I\'m the SignSmart assistant. I can help you understand contracts, find resources, or answer questions about your rights.',
  'how does it work': 'Our app analyzes contracts by scanning for risky clauses. You can paste text or upload a PDF/image, and we\'ll highlight concerning sections and explain them in simple language.',
  risks: 'We scan for 12+ types of risks including termination clauses, surveillance, penalties, curfews, maternity restrictions, liability issues, and visitor restrictions.',
  legal: 'We provide links to free legal aid, the National Commission for Women (NCW), women\'s helpline (181), and consumer courts to help you get professional legal support.',
  safe: 'If we find no risky clauses, we show a green "Looks Safe" status with a safety score of 100/100. Always read the full document carefully.',
  risky: 'If we find risky clauses, we display them with color codes: red for high risk, orange for moderate, and yellow for low risk.',
  pdf: 'You can download your analysis report as a PDF from the results page. Click "Download Report" after analyzing a contract.',
  default: 'I\'m not sure about that. Try asking me: "How does it work?", "What risks do you check for?", "Where can I get legal help?", or "How do I download a report?"'
}

function ChatIcon(){
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor" />
    </svg>
  )
}

function CloseIcon(){
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" />
    </svg>
  )
}

export default function Chatbot(){
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I\'m here to help. Ask me anything about SignSmart or contract analysis.' }
  ])
  const [input, setInput] = useState('')
  const messagesEnd = useRef(null)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function parseQuery(q) {
    const lower = q.toLowerCase()
    if (lower.includes('hello') || lower.includes('hi')) return responses.hello
    if (lower.includes('how') && lower.includes('work')) return responses['how does it work']
    if (lower.includes('risk')) return responses.risks
    if (lower.includes('legal') || lower.includes('help') || lower.includes('lawyer')) return responses.legal
    if (lower.includes('safe')) return responses.safe
    if (lower.includes('download') || lower.includes('pdf')) return responses.pdf
    return responses.default
  }

  function handleSend(){
    if (!input.trim()) return
    const userMessage = { role: 'user', text: input }
    setMessages([...messages, userMessage])
    const botResponse = { role: 'bot', text: parseQuery(input) }
    setTimeout(() => {
      setMessages(m => [...m, botResponse])
    }, 500)
    setInput('')
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <div className="w-96 h-96 flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden">
          <header className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChatIcon />
              <span className="font-semibold">SignSmart Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="hover:opacity-75">
              <CloseIcon />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          <div className="p-4 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button onClick={handleSend} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90">Send</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl transition flex items-center justify-center">
          <ChatIcon />
        </button>
      )}
    </div>
  )
}
