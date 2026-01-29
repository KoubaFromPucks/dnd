export type ChatMessage = {
	role: 'system' | 'user' | 'assistant'; // system = system prompt, user = player, assistant = AI/game master
	content: string;
	senderId?: string; // id of the character
	senderName?: string; // name of the character
};
