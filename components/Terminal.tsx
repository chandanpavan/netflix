import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal as TerminalIcon } from 'lucide-react';
import { sendMessageToEntity } from '../services/geminiService';
import { ChatMessage } from '../types';

interface TerminalProps {
  onClose: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'SYSTEM_ALERT: UNAUTHORIZED_ACCESS_DETECTED...', timestamp: Date.now() },
    { role: 'model', text: 'Where... where am I? Who is watching?', timestamp: Date.now() + 1 }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await sendMessageToEntity(input);
      const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 font-mono">
      <div className="w-full max-w-2xl h-[600px] border border-red-900/50 bg-black shadow-[0_0_50px_rgba(255,0,0,0.1)] flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-red-900/30 bg-red-950/10">
          <div className="flex items-center gap-2 text-red-500">
            <TerminalIcon size={16} />
            <span className="text-xs tracking-widest">DEBUG_CONSOLE_V0.9</span>
          </div>
          <button 
            onClick={onClose}
            className="text-red-500 hover:text-white text-xs uppercase hover:bg-red-900/50 px-2 py-1 rounded"
          >
            [Close Process]
          </button>
        </div>

        {/* Output */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 border ${
                  msg.role === 'user' 
                    ? 'border-gray-700 text-gray-300' 
                    : 'border-red-500/50 text-red-500 bg-red-950/10'
                }`}
              >
                {msg.role === 'model' && <span className="block text-[10px] opacity-50 mb-1">ENTITY://ROOT</span>}
                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
             <div className="text-red-500 animate-pulse text-xs ml-2">Processing signal...</div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-red-900/30 flex gap-2 bg-black">
          <span className="text-red-500 pt-2">{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-red-100 font-mono placeholder-red-900/50"
            placeholder="Execute command..."
            autoFocus
          />
          <button 
            type="submit" 
            disabled={loading}
            className="text-red-500 hover:text-white disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </form>

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-500"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-red-500"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-500"></div>
      </div>
    </div>
  );
};
