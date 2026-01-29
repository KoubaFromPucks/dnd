'use client';

import React, { useState } from 'react';

import { CharacterPanel } from '@/components/game-window/character-panel/character-panel';
import { Chat } from '@/components/game-window/chat/chat';
import { InventoryPanel } from '@/components/game-window/inventory-panel/invetory-panel';
import { defaultCharacters } from '@/test-data/character-data';
import { Character } from '@/schema/character';

export const GameWindow = () => {
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null
	);
	const [characters, setCharacters] = useState<Character[]>(defaultCharacters);

	const setUpdatedCharacters = (updatedCharacter: Character) => {
		setCharacters(
			characters.map(character =>
				character.id === updatedCharacter.id ? updatedCharacter : character
			)
		);
	};

	return (
		<div className="flex h-full w-full overflow-hidden bg-slate-950 text-slate-200">
			<CharacterPanel
				characters={characters}
				onSelectCharacter={setSelectedCharacter}
				onCharacterAdd={character => {
					setCharacters([...characters, character]);
				}}
				onCharacterUpdate={setUpdatedCharacters}
			/>

			<Chat characters={characters} />

			<InventoryPanel
				character={selectedCharacter}
				onInventoryChange={newInventory => {
					if (!selectedCharacter) return;

					const updatedCharacter = {
						...selectedCharacter,
						inventory: newInventory
					};
					setUpdatedCharacters(updatedCharacter);
					setSelectedCharacter(updatedCharacter);
				}}
			/>
		</div>
	);
};
