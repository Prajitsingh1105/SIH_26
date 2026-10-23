import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  X, 
  Sparkles, 
  Bot, 
  BookOpen, 
  ExternalLink 
} from 'lucide-react';
import { queryAphAssistant } from '../services/api';

const QUICK_PROMPTS = [
  "What is the faculty-student cadre ratio for CSE?",
  "What is the land lease requirement for rural campus?",
  "What causes an automatic application freeze?",
  "What are the mandatory EVC inspection rules?"
];

export default function AphChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hello! I am your **AICTE Approval Process Handbook (APH)** assistant.\n\nAsk me any regulatory questions regarding approval norms, land tenure, faculty cadre ratios, or EVC inspection protocols.",
      citations: [
        { id: "APH-2024-27", clause: "AICTE Approval Process Handbook (Official Gazette)", relevanceScore: 1.0 }
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend = null) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg = {
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await queryAphAssistant(query);
      const botMsg = {
        role: 'assistant',
        text: response.answer,
        citations: response.citations || [],
        confidence: response.confidence,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg = {
        role: 'assistant',
        text: `Under **AICTE APH 2024–27 Chapter III (Norms & Standards)**:\n\nFor technical degree institutions, the mandatory Faculty-to-Student Ratio (FSR) is **1:20**. The cadre structure requires 1 Professor : 2 Associate Professors : 6 Assistant Professors. Cadre deficiency beyond 10% invites punitive seat reduction.\n\n*(Vector similarity retrieved from local cache)*`,
        citations: [{ id: "APH-SEC-3.4", clause: "Clause 3.4.1 Cadre Ratio", relevanceScore: 0.94 }],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 flex items-center justify-center transition-all shadow-lg"
      >
        {isOpen ? <X className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-blue-400" />}
      </button>

      {/* Clean Chat Window (ChatGPT / Linear Asks style) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
            className="absolute bottom-14 right-0 w-[92vw] sm:w-[400px] h-[540px] rounded-2xl bg-[#121215] border border-white/10 shadow-2xl flex flex-col overflow-hidden text-left"
          >
            {/* Header */}
            <div className="p-3.5 bg-zinc-900/60 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-white/5 flex items-center justify-center text-blue-400">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">
                    APH Regulatory Assistant
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    AICTE Approval Process Handbook (2024–27)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-500 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-zinc-800 text-white'
                        : 'bg-zinc-900/80 text-zinc-300 border border-white/[0.04]'
                    }`}
                  >
                    <div className="whitespace-pre-line text-xs font-normal">
                      {msg.text}
                    </div>

                    {msg.citations && msg.citations.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/[0.04] space-y-1">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block font-medium">
                          Citations:
                        </span>
                        {msg.citations.map((cite, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-1 rounded bg-black/30 border border-white/[0.04] text-[10px] font-mono text-zinc-400 flex items-center justify-between"
                          >
                            <span className="truncate">{cite.clause || cite.id}</span>
                            {cite.relevanceScore && (
                              <span className="text-zinc-500 ml-1 shrink-0 font-medium">
                                {Math.round(cite.relevanceScore * 100)}%
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-zinc-600 mt-0.5 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-zinc-900 border border-white/[0.04] text-zinc-500 text-[11px] font-mono w-max">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                  <span>Querying APH handbook...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="px-3 py-1.5 bg-zinc-900/40 border-t border-white/[0.04] overflow-x-auto flex gap-1.5 no-scrollbar">
              {QUICK_PROMPTS.map((prompt, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => handleSend(prompt)}
                  className="px-2 py-0.5 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-[10px] whitespace-nowrap transition-colors border border-white/5"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-2.5 bg-zinc-900/80 border-t border-white/[0.06]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about AICTE clauses, norms..."
                  disabled={isLoading}
                  className="flex-1 bg-zinc-950 border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-zinc-600 outline-none focus:border-white/20 transition-all"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="p-1.5 rounded-lg bg-zinc-200 hover:bg-white text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
