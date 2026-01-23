import React from 'react';
import { Shield, Heart } from 'lucide-react';
import { Portrait } from '../portrait';

export const CharacterPanel = () => {
	return (
		<aside className="flex h-full w-64 flex-col gap-6 overflow-y-auto border-r border-slate-800 bg-slate-900 p-6">
			<div className="text-center">
				<Portrait />
				<h2 className="text-xl font-bold text-amber-500">Ragnar Železný</h2>
				<p className="text-sm text-slate-400 italic">
					Trpaslík Bojovník (Lvl 1)
				</p>
			</div>

			<div className="space-y-4">
				<div className="flex items-center justify-between rounded-lg border border-red-900/50 bg-slate-800 p-3">
					<Heart className="text-red-500" size={20} />
					<span className="font-bold text-red-200">12 / 12 HP</span>
				</div>
				<div className="flex items-center justify-between rounded-lg border border-blue-900/50 bg-slate-800 p-3">
					<Shield className="text-blue-400" size={20} />
					<span className="font-bold text-blue-200">AC 16</span>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2 text-xs">
				{Object.entries({
					strength: 12,
					dexterity: 14,
					constitution: 16,
					intelligence: 10,
					wisdom: 8,
					charisma: 13
				}).map(([stat, val]) => (
					<StatBlock key={stat} stat={stat.slice(0, 3)} value={val} />
				))}
			</div>
		</aside>
	);
};

const StatBlock = ({ stat, value }: { stat: string; value: number }) => (
	<div className="rounded border border-slate-700 bg-slate-800 p-2 text-center">
		<div className="text-slate-500 uppercase">{stat}</div>
		<div className="text-lg font-bold">{value}</div>
	</div>
);
