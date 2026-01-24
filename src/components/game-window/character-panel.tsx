import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Users } from 'lucide-react';
import { Button } from '../basic-components/button';
import { CharacterStats } from './character-stats';
import { Character } from '@/schema/character';

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
			<div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4">
				<h3 className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
					<Users size={16} /> Družina
				</h3>
				<Button
					variant="ghost"
					size="sm"
					className="h-8 w-8 p-0 hover:text-amber-500"
				>
					<Plus size={18} />
				</Button>
			</div>

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
