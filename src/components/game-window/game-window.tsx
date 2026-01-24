'use client';

import React, { useState } from 'react';

import { CharacterPanel } from '@/components/game-window/character-panel';
import { Chat } from '@/components/game-window/chat';
import { InventoryPanel } from '@/components/game-window/invetory-panel';
import { defaultCharactes } from '@/test-data/characters';
import { Character } from '@/schema/character';

export const GameWindow = () => {
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null
	);

	return (
		<div className="flex h-full w-full overflow-hidden bg-slate-950 text-slate-200">
			<CharacterPanel
				characters={defaultCharactes}
				onSelectCharacter={setSelectedCharacter}
			/>

			<Chat />

			<InventoryPanel character={selectedCharacter} />
		</div>
	);
};
