import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  Check, 
  Copy, 
  RotateCcw, 
  Award,
  Lightbulb
} from 'lucide-react';
import { APH_QA_DATABASE } from '../services/mockData';

export default function AphAiAssistant({ onAskQuestion }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Namaste. I am the AICTE Sovereign Approval Process Handbook (APH 2024–27) Regulatory Assistant. You can query me on statutory Faculty Cadre Ratios, Land Tenure Norms, EVC Video Geotagging Guidelines, or Deficiency Appeal windows.",
      citation: {
        chapter: "AICTE Regulatory Governance Baseline",
        clause: "APH 2024–27 Official Edition",
        page: "Chapter I-VII",
        confidence: "99% (High)"
      }
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const SUGGESTED_QUERIES = [
    "What are the mandatory norms for Faculty to Student Cadre Ratio?",
    "What is the policy for Land Lease tenure and upcoming expiry?",
    "What are the physical audit requirements for an Expert Visit Committee (EVC)?",
    "What is the procedure when an application is returned for deficiencies?",
    "What infrastructure is mandatory for introducing AI, ML and Robotics seats?"
  ];

  const handleSend = async (queryText) => {
    const q = queryText || input;
    if (!q.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: q }]);
    setInput('');
    setIsLoading(true);

    const res = await onAskQuestion(q);
    setIsLoading(false);

    if (res) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: res.answer,
        citation: res.citation,
        followups: res.suggestedFollowups
      }]);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase bg-teal/10 text-teal px-2 py-0.5 rounded font-mono">
              RETRIEVAL-AUGMENTED GENERATION (RAG)
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">AICTE Approval Process Handbook (APH) Assistant</h2>
          <p className="text-xs text-slate-500">
            Conversational statutory regulatory guidance grounded in official AICTE Approval Process Handbook (2024–27) chapters.
          </p>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Suggested Questions Bar */}
      <div className="app-card p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Suggested Handbook Regulatory Questions:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-left px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="app-card flex flex-col h-[500px] overflow-hidden">
        {/* Messages Body */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-2xl rounded-xl p-4 text-xs leading-relaxed space-y-2.5 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Grounded Handbook Citation Box */}
                {msg.citation && (
                  <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 space-y-1">
                    <div className="flex items-center justify-between text-teal font-bold">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Statutory Citation: {msg.citation.chapter}</span>
                      </div>
                      <span className="text-[10px] font-mono bg-teal/10 px-1.5 py-0.2 rounded text-teal">
                        Confidence: {msg.citation.confidence}
                      </span>
                    </div>
                    <div className="text-slate-600">
                      <strong>{msg.citation.clause}</strong> • {msg.citation.page}
                    </div>
                  </div>
                )}

                {msg.role === 'assistant' && (
                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => handleCopy(msg.text, idx)}
                      className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-[10px]"
                    >
                      {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <Sparkles className="w-4 h-4 text-teal animate-spin" />
              <span>Querying Approval Process Handbook (APH) Vector Index...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask any question about APH land, cadre ratio, EVC guidelines, or intake expansion..."
            className="flex-1 text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-lg bg-primary hover:bg-primary-hover text-white disabled:opacity-40 transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
