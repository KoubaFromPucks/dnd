import React from 'react';
import { Button } from '../../basic-components';
import { Portrait } from '../../portrait';
import { Character } from '@/schema/character';

export const SpeakingCharacterSelector = ({
	selectedCharacterId,
	characters,
	onSelectCharacter
}: {
	selectedCharacterId: string | null;
	characters: Character[];
	onSelectCharacter: (characterId: string | null) => void;
}) => (
	<div className="border-t border-slate-800 bg-slate-900 pt-3">
		<div className="flex items-center font-bold uppercase">Talking as:</div>
		<div className="flex flex-wrap justify-center gap-2 overflow-x-auto">
			<SpeakingCharacterOption
				onClick={onSelectCharacter}
				isSelected={selectedCharacterId === null}
			/>
			{characters.map(char => (
				<SpeakingCharacterOption
					key={char.id}
					character={char}
					onClick={onSelectCharacter}
					isSelected={selectedCharacterId === char.id}
				/>
			))}
		</div>
	</div>
);

const SpeakingCharacterOption = ({
	character,
	onClick,
	isSelected
}: {
	character?: Character;
	onClick: (characterId: string | null) => void;
	isSelected?: boolean;
}) => (
	<Button
		onClick={() => onClick(character?.id ?? null)}
		variant={isSelected ? 'outline' : 'ghost'}
	>
		{character && (
			<>
				<Portrait
					url={character.pictureUrl}
					size="sm"
					label={`${character.characterName} Portrait`}
				/>
				<span className="ml-2">{character.characterName}</span>
			</>
		)}
		{!character && <span>DM</span>}
	</Button>
);
