export type ChatMessage = {
	role: 'system' | 'user' | 'assistant'; // system = system prompt, user = player, assistant = AI/game master
	content: string;
	characterId?: string; // id of the character
	characterName?: string; // name of the character
};
