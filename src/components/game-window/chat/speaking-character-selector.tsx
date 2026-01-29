import React from 'react';
import { Button } from '../../basic-components';
import { Portrait } from '../../portrait';
import { Character } from '@/schema/character';

export const SpeakingChracterSelector = ({
	selectedCharacterId,
	characters,
	onSelectCharacter
}: {
	selectedCharacterId: string | null;
	characters: Character[];
	onSelectCharacter: (characterId: string | null) => void;
}) => (
	<footer className="border-t border-slate-800 bg-slate-900 pt-3">
		<div className="flex items-center">Talking as:</div>
		<div className="flex justify-center gap-2 overflow-x-auto">
			<SpeakingChracterOption
				onClick={onSelectCharacter}
				isSelected={selectedCharacterId === null}
			/>
			{characters.map(char => (
				<SpeakingChracterOption
					key={char.id}
					character={char}
					onClick={onSelectCharacter}
					isSelected={selectedCharacterId === char.id}
				/>
			))}
		</div>
	</footer>
);

const SpeakingChracterOption = ({
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
				<Portrait url={character.pictureUrl} size="sm" />
				<span className="ml-2">{character.characterName}</span>
			</>
		)}
		{!character && <span>DM</span>}
	</Button>
);
