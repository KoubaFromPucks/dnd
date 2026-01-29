import React, { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { useSendChatMessageMutation } from '../hooks';
import { type ChatMessage } from '@/schema/chat-message';
import { toast } from 'sonner';
import { SubmitButton } from '@/components/basic-components';
import { Character } from '@/schema/character';
import { SpeakingCharacterSelector } from './speaking-character-selector';
import { getCharacterColor } from '@/lib/character-utils';
import { BasicTextarea } from '@/components/basic-components/basic-textarea';

type ChatProps = {
	characters: Character[];
};

const SCROLL_THRESHOLD_PX = 350;
const SCROLL_ANIMATION_DELAY_MS = 50;

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

	const scrollContainerRef = React.useRef<HTMLDivElement>(null);

	const scrollToBottom = (force = false) => {
		const container = scrollContainerRef.current;
		if (container) {
			const { scrollHeight, clientHeight, scrollTop } = container;

			const isAtBottom =
				scrollHeight - scrollTop <= clientHeight + SCROLL_THRESHOLD_PX;

			if (force || isAtBottom) {
				setTimeout(() => {
					container.scrollTo({
						top: container.scrollHeight,
						behavior: 'smooth'
					});
				}, SCROLL_ANIMATION_DELAY_MS);
			}
		}
	};

	useEffect(() => {
		const lastMessage = messages[messages.length - 1];
		const forceScroll = lastMessage?.role === 'user';

		scrollToBottom(forceScroll);
	}, [messages, scrollContainerRef.current]);

	const onMessageSubmit = () => {
		const trimmedInput = input.trim();
		if (!trimmedInput) return;

		const newMessages: ChatMessage[] = [
			...messages,
			{
				role: 'user',
				content: trimmedInput,
				characterId: selectedCharacterId ?? undefined,
				characterName: characters.find(c => c.id === selectedCharacterId)
					?.characterName
			}
		];
		setMessages(newMessages);
		setInput('');

		sendMessageMutation.mutate(
			{ chatHistory: newMessages, characters },
			{
				onSuccess: responseMessage => {
					setMessages(prevMessages => [...prevMessages, responseMessage]);
				},
				onError: error => {
					toast.error(
						`Failed to send your message to the AI. The message shown in the chat was not processed and is only stored locally. Please check your connection and try again. (${error.message})`
					);
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

			<div
				ref={scrollContainerRef}
				className="flex-1 space-y-6 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] p-6"
			>
				{messages
					.filter(m => m.role !== 'system')
					.map((m, i) => (
						<div
							key={`chat-message-${i}`}
							className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
						>
							<div
								className={`wrap-break-words max-w-[80%] rounded-2xl p-4 [word-break:break-word] shadow-xl ${
									m.role === 'assistant'
										? 'border-l-4 border-amber-600 bg-slate-800 text-slate-200'
										: `rounded-tr-none ${getCharacterColor(characters.findIndex(c => c.id === m.characterId))} text-white`
								}`}
							>
								<p className="leading-relaxed whitespace-pre-wrap">
									{m.content}
								</p>
							</div>
						</div>
					))}
			</div>

			<footer className="bg-slate-900 px-6 pb-3">
				<SpeakingCharacterSelector
					characters={characters}
					onSelectCharacter={setSelectedCharacterId}
					selectedCharacterId={selectedCharacterId}
				/>
				<div className="mx-auto mt-4 flex max-w-4xl items-center gap-4">
					<label className="sr-only" htmlFor="chat-input">
						Type your action and press Enter to submit message to Dungeon Master
						AI
					</label>
					<BasicTextarea
						id="chat-input"
						value={input}
						rows={1}
						onChange={e => {
							setInput(e.target.value);
						}}
						onKeyDown={e => {
							if (
								e.key === 'Enter' &&
								!e.shiftKey &&
								!sendMessageMutation.isPending
							) {
								e.preventDefault();
								onMessageSubmit();
							}
						}}
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
