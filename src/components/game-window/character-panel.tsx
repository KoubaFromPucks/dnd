import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { CharacterStats } from './character-stats';
import { Character } from '@/schema/character';
import { PanelHeader } from './panel-header';
import { CreateUpdateCharacterDialog } from '@/components/ui';
import { PlusButton } from '@/components/basic-components';

type characterPanelProps = {
	characters: Character[];
	onSelectCharacter: (character: Character | null) => void;
	onCharacterAdd: (character: Character) => void;
	onCharacterUpdate?: (character: Character) => void;
};

export const CharacterPanel = ({
	characters,
	onSelectCharacter,
	onCharacterAdd,
	onCharacterUpdate
}: characterPanelProps) => {
	const [expandedId, setExpandedId] = useState<string | null>(null);

	return (
		<aside className="flex h-full w-72 flex-col gap-3 overflow-y-auto border-r border-slate-800 bg-slate-900 p-6">
			<PanelHeader
				title="Party"
				icon={<Users size={16} />}
				actionButton={
					<CreateUpdateCharacterDialog
						trigger={<PlusButton />}
						onSave={character => {
							onCharacterAdd(character);
						}}
					/>
				}
			/>

			{characters.map(char => (
				<div key={char.id} className="flex flex-col">
					<button
						onClick={() => {
							const newExpandedId = expandedId === char.id ? null : char.id;
							setExpandedId(newExpandedId);
							onSelectCharacter(newExpandedId ? char : null);
						}}
						className={`flex items-center justify-between rounded-t-xl border border-slate-800 p-3 transition-colors ${
							expandedId === char.id
								? 'bg-slate-800 text-amber-500'
								: 'rounded-xl bg-slate-900 text-slate-300'
						}`}
					>
						<div className="flex items-center gap-2">
							{expandedId === char.id ? (
								<ChevronDown size={16} />
							) : (
								<ChevronRight size={16} />
							)}
							<span className="text-sm font-bold">{char.characterName}</span>
						</div>
						<span className="text-[10px] opacity-50">Lvl {char.level}</span>
					</button>

					{expandedId === char.id && (
						<CharacterStats
							character={char}
							onCharacterUpdate={updatedCharacter => {
								onCharacterUpdate?.(updatedCharacter);
							}}
						/>
					)}
				</div>
			))}
		</aside>
	);
};
