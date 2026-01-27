import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { Button } from '../basic-components/button';

export const Chat = () => {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([
		{
			role: 'dm',
			text: 'Vstupujete do temné jeskyně. Vzduch je cítit vlhkostí a hnilobou. Co uděláte?'
		}
	]);
	const handleSendMessage = () => {
		if (!input.trim()) return;
		setMessages([...messages, { role: 'user', text: input }]);
		// TODO call API
		setInput('');
	};

	return (
		<div className="relative flex h-full w-full flex-1 flex-col">
			<header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4">
				<h1 className="flex items-center gap-2 font-serif text-xl tracking-widest text-amber-600 uppercase">
					<Zap size={20} /> Dungeon Master AI
				</h1>
			</header>

			<div className="flex-1 space-y-6 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] p-6">
				{messages.map((m, i) => (
					<div
						key={i}
						className={`flex ${m.role === 'dm' ? 'justify-start' : 'justify-end'}`}
					>
						<div
							className={`wrap-break-words max-w-[80%] rounded-2xl p-4 [word-break:break-word] shadow-xl ${
								m.role === 'dm'
									? 'border-l-4 border-amber-600 bg-slate-800 text-slate-200'
									: 'rounded-tr-none bg-amber-700 text-white'
							}`}
						>
							<p className="leading-relaxed">{m.text}</p>
						</div>
					</div>
				))}
			</div>

			<footer className="border-t border-slate-800 bg-slate-900 p-6">
				<div className="mx-auto flex max-w-4xl items-center gap-4">
					<input
						value={input}
						onChange={e => setInput(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
						placeholder="Napište svou akci (např. Prohledám truhlu...)"
						className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 transition-colors focus:border-amber-600 focus:outline-none"
					/>
					<Button onClick={handleSendMessage} variant="default" size="default">
						ODESLAT
					</Button>
				</div>
			</footer>
		</div>
	);
};
