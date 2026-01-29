import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import { useSendChatMessageMutation } from '../hooks';
import { type ChatMessage } from '@/schema/chat-message';
import { toast } from 'sonner';
import { SubmitButton } from '../../basic-components/submit-button';
import { Character } from '@/schema/character';
import { SpeakingChracterSelector } from './speaking-character-selector';

type ChatProps = {
	characters: Character[];
};

export const Chat = ({ characters }: ChatProps) => {
	const [input, setInput] = useState('');
	const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
		null
	);
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			role: 'assistant',
			content:
				'You enter a dark cave. The air smells of dampness and decay. What do you do?'
		}
	]);
	const sendMessageMutation = useSendChatMessageMutation();

	const onMessageSubmit = () => {
		if (!input.trim()) return;

		const newMessages: ChatMessage[] = [
			...messages,
			{
				role: 'user',
				content: input,
				characterId: selectedCharacterId ?? undefined,
				characterName: characters.find(c => c.id === selectedCharacterId)
					?.characterName
			}
		];
		setMessages(newMessages);
		setInput('');

		sendMessageMutation.mutate(
			{ chatHistory: newMessages, characters: characters },
			{
				onSuccess: responseMessage => {
					setMessages(prevMessages => [...prevMessages, responseMessage]);
				},
				onError: error => {
					toast.error(`Failed to send message: ${error.message}`);
				}
			}
		);
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
						className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
					>
						<div
							className={`wrap-break-words max-w-[80%] rounded-2xl p-4 [word-break:break-word] shadow-xl ${
								m.role === 'assistant'
									? 'border-l-4 border-amber-600 bg-slate-800 text-slate-200'
									: 'rounded-tr-none bg-amber-700 text-white'
							}`}
						>
							<p className="leading-relaxed">{m.content}</p>
						</div>
					</div>
				))}
			</div>

			<footer className="bg-slate-900 px-6 pb-3">
				<SpeakingChracterSelector
					characters={characters}
					onSelectCharacter={setSelectedCharacterId}
					selectedCharacterId={selectedCharacterId}
				/>
				<div className="mx-auto mt-4 flex max-w-4xl items-center gap-4">
					<input
						value={input}
						onChange={e => setInput(e.target.value)}
						onKeyDown={e => e.key === 'Enter' && onMessageSubmit()}
						placeholder="Type your action (e.g., Search the chest...)"
						className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 transition-colors focus:border-amber-600 focus:outline-none"
					/>
					<SubmitButton
						onClick={onMessageSubmit}
						disabled={sendMessageMutation.isPending}
					>
						SUBMIT
					</SubmitButton>
				</div>
			</footer>
		</div>
	);
};
