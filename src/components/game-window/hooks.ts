import { useMutation } from '@tanstack/react-query';
import { Character } from '@/schema/character';
import { delay } from '@/lib/utils';
import { ChatMessage } from '@/schema/chat-message';

export const useSendChatMessageMutation = () =>
	useMutation({
		mutationFn: async ({
			chatHistory,
			characters
		}: {
			chatHistory: ChatMessage[];
			characters: Character[];
		}) => {
			await delay(1500); // Simulate network delay
			console.log('Sending chat message with history:', chatHistory);
			console.log('Characters involved:', characters);

			// TODO prepare data messages HERE or in another module
			//? For example, slice chatHistory to last N messages, format characters, etc.

			// TODO send to api HERE
			//! ideally just call one function defined in another module
			//! ideally stored in src/facades/ or src/lib/ or src/<module name>/<file name>.ts
			//? Example: sendChatMessageAPI(<parameters>); - parameters could be chatHistory, characters, etc.

			return {
				role: 'assistant',
				content: 'This is a response from the game master AI.'
			} as ChatMessage;
		}
	});
