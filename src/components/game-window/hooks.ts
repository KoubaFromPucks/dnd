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

			return {
				role: 'assistant',
				content: 'This is a response from the game master AI.'
			} as ChatMessage;
		}
	});
