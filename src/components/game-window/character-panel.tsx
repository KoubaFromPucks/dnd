import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import { CharacterStats } from './character-stats';
import { Character } from '@/schema/character';
import { PanelHeader } from './panel-header';

type characterPanelProps = {
	characters: Character[];
	onSelectCharacter: (character: Character | null) => void;
};

export const CharacterPanel = ({
	characters,
	onSelectCharacter
}: characterPanelProps) => {
	const [expandedId, setExpandedId] = useState<string | null>(
		characters[0]?.characterName
	);

	return (
		<aside className="flex h-full w-72 flex-col gap-3 overflow-y-auto border-r border-slate-800 bg-slate-900 p-6">
			<PanelHeader title="Družina" icon={<Users size={16} />} />

			{characters.map(char => (
				<div key={char.characterName} className="flex flex-col">
					<button
						onClick={() => {
							const newExpandedId =
								expandedId === char.characterName ? null : char.characterName;
							setExpandedId(newExpandedId);
							onSelectCharacter(newExpandedId ? char : null);
						}}
						className={`flex items-center justify-between rounded-t-xl border border-slate-800 p-3 transition-colors ${
							expandedId === char.characterName
								? 'bg-slate-800 text-amber-500'
								: 'rounded-xl bg-slate-900 text-slate-300'
						}`}
					>
						<div className="flex items-center gap-2">
							{expandedId === char.characterName ? (
								<ChevronDown size={16} />
							) : (
								<ChevronRight size={16} />
							)}
							<span className="text-sm font-bold">{char.characterName}</span>
						</div>
						<span className="text-[10px] opacity-50">Lvl {char.level}</span>
					</button>

					{expandedId === char.characterName && (
						<CharacterStats character={char} />
					)}
				</div>
			))}
		</aside>
	);
};
