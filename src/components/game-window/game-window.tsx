'use client';

import React, { useState } from 'react';

import { CharacterPanel } from '@/components/game-window/character-panel';
import { Chat } from '@/components/game-window/chat';
import { InventoryPanel } from '@/components/game-window/invetory-panel';
import { defaultCharacters } from '@/test-data/character-data';
import { Character } from '@/schema/character';

export const GameWindow = () => {
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null
	);
	const [characters, setCharacters] = useState<Character[]>(defaultCharacters);

	return (
		<div className="flex h-full w-full overflow-hidden bg-slate-950 text-slate-200">
			<CharacterPanel
				characters={characters}
				onSelectCharacter={setSelectedCharacter}
				onCharacterAdd={character => {
					setCharacters([...characters, character]);
				}}
				onCharacterUpdate={(updatedCharacter: Character) => {
					setCharacters(
						characters.map(char =>
							char.id === updatedCharacter.id ? updatedCharacter : char
						)
					);
				}}
			/>

			<Chat />

			<InventoryPanel
				character={selectedCharacter}
				onEquippedChanged={() => {
					setSelectedCharacter({ ...selectedCharacter! });
				}}
			/>
		</div>
	);
};
