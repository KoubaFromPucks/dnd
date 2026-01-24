import React from 'react';
import { Shield, Heart } from 'lucide-react';
import { Portrait } from '../portrait';
import { Character } from '@/schema/character';
import { getAC } from '@/utils/character-utils';

type CharacterStatsProps = {
	character?: Character;
};

export const CharacterStats = ({ character }: CharacterStatsProps) => {
	return (
		<div className="flex flex-col gap-6 rounded-b-xl border-x border-b border-slate-800 bg-slate-800/30 p-2">
			<div className="text-center">
				<Portrait url={character?.pictureUrl} />
				<h2 className="text-xl font-bold text-amber-500">
					{character?.characterName}
				</h2>
				<p className="text-sm text-slate-400 italic">
					{character?.race.name} {character?.class.name} (Lvl {character?.level}
					)
				</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between rounded-lg border border-red-900/50 bg-slate-800 p-3">
					<Heart className="text-red-500" size={20} />
					<span className="font-bold text-red-200">
						{character?.hp.current} / {character?.hp.max} HP
					</span>
				</div>
				<div className="flex items-center justify-between rounded-lg border border-blue-900/50 bg-slate-800 p-3">
					<Shield className="text-blue-400" size={20} />
					<span className="font-bold text-blue-200">AC {getAC(character)}</span>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2 text-xs">
				{Object.entries({
					strength: character?.stats?.strength || 0,
					dexterity: character?.stats?.dexterity || 0,
					constitution: character?.stats?.constitution || 0,
					intelligence: character?.stats?.intelligence || 0,
					wisdom: character?.stats?.wisdom || 0,
					charisma: character?.stats?.charisma || 0
				}).map(([stat, val]) => (
					<StatBlock key={stat} stat={stat.slice(0, 3)} value={val} />
				))}
			</div>
		</div>
	);
};

const StatBlock = ({ stat, value }: { stat: string; value: number }) => (
	<div className="rounded border border-slate-700 bg-slate-800 p-2 text-center">
		<div className="text-slate-500 uppercase">{stat}</div>
		<div className="text-lg font-bold">{value}</div>
	</div>
);
