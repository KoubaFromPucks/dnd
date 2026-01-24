import React from 'react';
import { Backpack, Dices } from 'lucide-react';
import { Character } from '@/schema/character';

export const InventoryPanel = ({
	character
}: {
	character: Character | null;
}) => (
	<aside className="flex h-full w-72 flex-col gap-6 overflow-y-auto border-l border-slate-800 bg-slate-900 p-6">
		<section>
			<h3 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
				<Backpack size={16} /> Inventář
			</h3>
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
			<h3 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
				<Dices size={16} /> Rychlé Hody
			</h3>
			<div className="grid grid-cols-2 gap-2">
				{[20, 12, 10, 8, 6, 4].map(sides => (
					<button
						key={sides}
						className="rounded border border-slate-700 bg-slate-950 p-2 font-bold text-amber-500 transition-colors hover:bg-slate-800"
					>
						d{sides}
					</button>
				))}
			</div>
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
