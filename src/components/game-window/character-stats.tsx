import React, { ReactNode } from 'react';
import { Shield, Heart, Coins, Weight, Edit2 } from 'lucide-react';
import { Portrait } from '../portrait';
import { Character } from '@/schema/character';
import {
	getAC,
	getCurrentCarryWeight,
	getMaximalCarryWeight
} from '@/utils/character-utils';
import { CreateUpdateCharacterDialog } from '../ui/concrete-dialogs/create-update-character-dialog/create-update-character-dialog';
import { Button } from '../basic-components';

type StateVariant = 'red' | 'blue' | 'yellow' | 'gray';

const variantStyles: Record<StateVariant, string> = {
	red: 'border-red-900/50 text-red-200',
	blue: 'border-blue-900/50 text-blue-200',
	yellow: 'border-yellow-900/50 text-yellow-200',
	gray: 'border-gray-900/50 text-gray-200'
};

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
					{character?.raceName} {character?.className} (Lvl {character?.level})
				</p>
			</div>

			<div className="space-y-4">
				<StateLabel
					label="HP"
					icon={<Heart className="text-red-500" size={20} />}
					value={`${character?.hp.current} / ${character?.hp.max}`}
					variant="red"
				/>
				<StateLabel
					label="AC"
					icon={<Shield className="text-blue-400" size={20} />}
					value={getAC(character)}
					variant="blue"
				/>
				<StateLabel
					label="Gold"
					icon={<Coins className="text-yellow-400" size={20} />}
					value={character?.currentGold || 0}
					variant="yellow"
				/>
				<StateLabel
					label="Weight"
					icon={<Weight className="text-gray-400" size={20} />}
					value={`${getCurrentCarryWeight(character)} / ${getMaximalCarryWeight(character)}`}
					variant="gray"
				/>
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
			<CreateUpdateCharacterDialog
				trigger={
					<Button variant="ghost">
						<Edit2 size={16} className="mr-3" /> Edit
					</Button>
				}
			></CreateUpdateCharacterDialog>
		</div>
	);
};

const StatBlock = ({ stat, value }: { stat: string; value: number }) => (
	<div className="rounded border border-slate-700 bg-slate-800 p-2 text-center">
		<div className="text-slate-500 uppercase">{stat}</div>
		<div className="text-lg font-bold">{value}</div>
	</div>
);

const StateLabel = ({
	label,
	icon,
	value,
	variant
}: {
	label: string;
	icon?: ReactNode;
	value: string | number;
	variant: StateVariant;
}) => (
	<div
		className={`flex items-center justify-between rounded-lg border bg-slate-800 p-3 ${variantStyles[variant]}`}
	>
		{icon}
		<span className={`font-bold ${variantStyles[variant].split(' ')[1]}`}>
			{value} {label}
		</span>
	</div>
);
