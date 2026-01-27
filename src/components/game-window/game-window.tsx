'use client';

import React, { useState } from 'react';

import { CharacterPanel } from '@/components/game-window/character-panel';
import { Chat } from '@/components/game-window/chat';
import { InventoryPanel } from '@/components/game-window/invetory-panel';
import { defaultCharactes } from '@/test-data/character-data';
import { Character } from '@/schema/character';
import { CreateUpdateCharacterDialog } from '../ui/concrete-dialogs/create-update-character-dialog/create-update-character-dialog';
import { PlusButton } from '../basic-components';

export const GameWindow = () => {
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null
	);
	const [characters, setCharacters] = useState<Character[]>(defaultCharactes);

	return (
		<div className="flex h-full w-full overflow-hidden bg-slate-950 text-slate-200">
			<CharacterPanel
				characters={characters}
				onSelectCharacter={setSelectedCharacter}
				addCharacterButton={
					<CreateUpdateCharacterDialog trigger={<PlusButton />} />
				}
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
