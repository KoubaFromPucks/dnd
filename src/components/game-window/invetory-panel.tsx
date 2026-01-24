import React from 'react';
import { Backpack, Dices } from 'lucide-react';
import { Character } from '@/schema/character';
import { PanelHeader } from './panel-header';
import { DiceThrows } from './dice-throws';

export const InventoryPanel = ({
	character
}: {
	character: Character | null;
}) => (
	<aside className="flex h-full w-72 flex-col gap-6 border-l border-slate-800 bg-slate-900 p-6">
		<section className="overflow-y-auto">
			<PanelHeader title="Inventář" icon={<Backpack size={16} />} />

			<div className="space-y-2">
				{character?.inventory.map(item => (
					<InventoryItem
						key={item.name}
						name={item.name}
						quantity={item.quantity}
					/>
				))}
			</div>
		</section>

		<section className="mt-auto">
			<PanelHeader
				title="Rychlé Hody"
				icon={<Dices size={16} />}
				hidePlusButton
			/>

			<DiceThrows />
		</section>
	</aside>
);

const InventoryItem = ({
	name,
	quantity
}: {
	name: string;
	quantity: number;
}) => (
	<div className="flex cursor-pointer justify-between rounded border border-slate-700 bg-slate-800 p-2 text-sm hover:border-amber-900">
		{name} <span className="text-slate-600">{quantity}x</span>
	</div>
);
