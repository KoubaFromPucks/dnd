import React, {useState} from "react";{}
import { MessageSquare, Shield, Heart, Zap, Backpack, Dices } from 'lucide-react';
import { Button } from "../basic-components/button";

export const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
    { role: 'dm', text: 'Vstupujete do temné jeskyně. Vzduch je cítit vlhkostí a hnilobou. Co uděláte?' }
  ]);  
    const handleSendMessage = () => {
    if (!input.trim()) return;
        setMessages([...messages, { role: 'user', text: input }]);
        // Zde by následovalo volání API Gemini...
        setInput('');
  };

    return (
    <div className="flex-1 flex flex-col relative h-full w-full">
        <header className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
          <h1 className="flex items-center gap-2 font-serif text-amber-600 text-xl tracking-widest uppercase">
            <Zap size={20} /> Dungeon Master AI
          </h1>
          <div className="text-slate-500 text-sm">Lokace: Zapomenuté doly</div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'dm' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] [word-break:break-word] p-4 rounded-2xl shadow-xl wrap-break-words ${
                m.role === 'dm' 
                ? 'bg-slate-800 border-l-4 border-amber-600 text-slate-200' 
                : 'bg-amber-700 text-white rounded-tr-none'
              }`}>
                <p className="leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        <footer className="p-6 bg-slate-900 border-t border-slate-800">
          <div className="flex gap-4 max-w-4xl mx-auto items-center">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Napište svou akci (např. Prohledám truhlu...)"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-600 transition-colors"
            />
            <Button 
              onClick={handleSendMessage}
              variant="default"
              size="default"
            >
              ODESLAT
            </Button>
          </div>
        </footer>
      </div>
    );
};