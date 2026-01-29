import React from 'react';
import { Backpack, Dices, Edit2, Trash2 } from 'lucide-react';
import { Character } from '@/schema/character';
import { PanelHeader } from '../panel-header';
import { DiceThrows } from './dice-throws';
import { cn } from '@/lib/utils';
import { Item } from '@/schema/item';
import { IconButton, PlusButton, Button } from '../../basic-components';
import { ConfirmDialog } from '../../ui';
import { CreateUpdateItemDialog } from '../../ui/concrete-dialogs/create-update-item-dialog/create-update-item-dialog';

export const InventoryPanel = ({
	character,
	onInventoryChange
}: {
	character: Character | null;
	onInventoryChange: (inventory: Item[]) => void;
}) => {
	return (
		<aside className="flex h-full w-72 flex-col gap-6 border-l border-slate-800 bg-slate-900 p-6">
			<section className="overflow-y-auto">
				<PanelHeader
					title="Inventory"
					icon={<Backpack size={16} />}
					actionButton={
						<CreateUpdateItemDialog
							trigger={<PlusButton />}
							onSave={item => {
								if (!character) return;

								onInventoryChange([...character.inventory, item]);
							}}
						/>
					}
				/>

				<div className="space-y-2">
					{character?.inventory.map(item => (
						<InventoryItem
							key={item.name}
							item={item}
							onDelete={() => {
								onInventoryChange(character.inventory.filter(i => i !== item));
							}}
							onItemChange={(updatedItem: Item) =>
								onInventoryChange(
									character.inventory.map(i => (i === item ? updatedItem : i))
								)
							}
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
	onDelete,
	onItemChange
}: {
	item: Item;
	onDelete: () => void;
	onItemChange: (updatedItem: Item) => void;
}) => {
	const [equipped, setEquipped] = React.useState(item.equipped);

	return (
		<div className="relative flex items-center gap-2">
			<Button
				className={cn(
					'flex flex-1 justify-between pr-14',
					equipped
						? 'border-amber-600 bg-amber-900/20 text-amber-500'
						: 'border-slate-800'
				)}
				variant="secondary"
				size="sm"
				onClick={() => {
					setEquipped(!equipped);
					item.equipped = !equipped;
				}}
			>
				<span className="text-[10px] text-slate-200">{item.quantity} x</span>
				<span className="truncate">{item.name}</span>
			</Button>

			<div className="absolute right-2 flex items-center gap-1">
				<CreateUpdateItemDialog
					itemToUpdate={item}
					trigger={
						<IconButton className="hover:text-amber-500" title="Edit Item">
							<Edit2 size={14} />
						</IconButton>
					}
					onSave={onItemChange}
				/>

				<ConfirmDialog
					trigger={
						<IconButton className="hover:text-red-500" title="Delete Item">
							<Trash2 size={14} />
						</IconButton>
					}
					title="Delete Item"
					text={`Are you sure you want to delete '${item.name}'?`}
					onConfirm={() => {
						onDelete();
					}}
					confirmButtonVariant="destructive"
				/>
			</div>
		</div>
	);
};
