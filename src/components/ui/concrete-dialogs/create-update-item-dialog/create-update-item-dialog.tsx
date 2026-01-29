import React, { ReactNode, useRef } from 'react';

import { Button } from '@/components/basic-components/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog';
import { useState } from 'react';
import {
	CreateUpdateItemDialogHandle,
	CreateUpdateItemForm
} from './create-update-item-form';
import { Item } from '@/schema/item';
import { toast } from 'sonner';

export const CreateUpdateItemDialog = ({
	itemToUpdate,
	isOpen,
	onSave,
	trigger
}: {
	itemToUpdate?: Item;
	isOpen?: boolean;
	onSave?: (item: Item) => void;
	trigger: ReactNode;
}) => {
	const [open, setOpen] = useState(isOpen);
	const formRef = useRef<CreateUpdateItemDialogHandle>(null);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{itemToUpdate ? 'Update' : 'Create'} Item</DialogTitle>
					<DialogDescription>Input the item details below.</DialogDescription>
				</DialogHeader>

				<CreateUpdateItemForm
					ref={formRef}
					itemToUpdate={itemToUpdate}
					onSuccess={data => {
						onSave?.(data);
						setOpen(false);
						toast.success('Item saved successfully!');
					}}
					onError={error => {
						Object.entries(error).forEach(([key, value]) => {
							toast.error(`${key}: ${value?.message || 'Invalid value'}`);
						});
					}}
				/>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => {
							setOpen(false);
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							formRef.current?.submit();
						}}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
