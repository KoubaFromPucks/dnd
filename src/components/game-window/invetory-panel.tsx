import React from 'react';
import { Backpack, Dices } from 'lucide-react';
import { Character } from '@/schema/character';
import { PanelHeader } from './panel-header';
import { DiceThrows } from './dice-throws';
import { Button } from '../basic-components/button';
import { cn } from '@/utils/cn';
import { Item } from '@/schema/item';

const uneqipAllItemsWithSameSuffix = (
	character: Character,
	itemSuffix: string
) => {
	character.inventory.forEach(i => {
		console.log(i);
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
				<PanelHeader title="Inventář" icon={<Backpack size={16} />} />

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
				<PanelHeader
					title="Rychlé Hody"
					icon={<Dices size={16} />}
					hidePlusButton
				/>

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
	<Button
		className={cn(
			'flex w-full justify-between',
			item.equipped ? 'border-amber-900' : ''
		)}
		variant="secondary"
		size="sm"
		onClick={() => {
			item.equipped = !item.equipped;
			onEquippedChanged?.(item, item.equipped);
		}}
	>
		{item.name} <span className="text-slate-600">{item.quantity}x</span>
	</Button>
);
