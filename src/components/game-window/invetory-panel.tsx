import React from 'react';
import { Backpack, Dices, Edit2, Trash2 } from 'lucide-react';
import { Character } from '@/schema/character';
import { PanelHeader } from './panel-header';
import { DiceThrows } from './dice-throws';
import { Button } from '../basic-components/button';
import { cn } from '@/lib/utils';
import { Item } from '@/schema/item';
import { IconButton } from '../basic-components';

const uneqipAllItemsWithSameSuffix = (
	character: Character,
	itemSuffix: string
) => {
	character.inventory.forEach(i => {
		if (i.itemType.endsWith(itemSuffix) && i.equipped) {
			i.equipped = false;
		}
	});
};

export const InventoryPanel = ({
	character,
	onEquippedChanged
}: {
	character: Character | null;
	onEquippedChanged: () => void;
}) => {
	return (
		<aside className="flex h-full w-72 flex-col gap-6 border-l border-slate-800 bg-slate-900 p-6">
			<section className="overflow-y-auto">
				<PanelHeader title="Inventory" icon={<Backpack size={16} />} />

				<div className="space-y-2">
					{character?.inventory.map(item => (
						<InventoryItem
							key={item.name}
							item={item}
							onEquippedChanged={(item, equipped) => {
								if (equipped && item.itemType.endsWith('armor')) {
									uneqipAllItemsWithSameSuffix(character!, 'armor');
								}
								if (equipped && item.itemType.endsWith('weapon')) {
									uneqipAllItemsWithSameSuffix(character!, 'weapon');
								}
								if (equipped && item.itemType === 'shield') {
									uneqipAllItemsWithSameSuffix(character!, 'shield');
								}

								item.equipped = equipped;
								onEquippedChanged();
							}}
						/>
					))}
				</div>
			</section>

			<section className="mt-auto">
				<PanelHeader title="Quick Throws" icon={<Dices size={16} />} />

				<DiceThrows />
			</section>
		</aside>
	);
};

const InventoryItem = ({
	item,
	onEquippedChanged
}: {
	item: Item;
	onEquippedChanged: (item: Item, equipped: boolean) => void;
}) => (
	<div className="relative flex items-center gap-2">
		<Button
			className={cn(
				'flex flex-1 justify-between pr-14',
				item.equipped
					? 'border-amber-600 bg-amber-900/20 text-amber-500'
					: 'border-slate-800'
			)}
			variant="secondary"
			size="sm"
			onClick={() => onEquippedChanged?.(item, !item.equipped)}
		>
			<span className="text-[10px] text-slate-200">{item.quantity} x</span>
			<span className="truncate">{item.name}</span>
		</Button>

		<div className="absolute right-2 flex items-center gap-1">
			<IconButton className="hover:text-amber-500">
				<Edit2 size={14} />
			</IconButton>
			<IconButton className="hover:text-red-500">
				<Trash2 size={14} />
			</IconButton>
		</div>
	</div>
);
