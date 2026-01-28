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
	CreateUpdateCharacterDialogHandle,
	CreateUpdateCharacterForm
} from './create-update-character-form';
import { Character } from '@/schema/character';
import { toast } from 'sonner';

export const CreateUpdateCharacterDialog = ({
	characterToUpdate,
	isOpen,
	onSave,
	trigger
}: {
	characterToUpdate?: Character;
	isOpen?: boolean;
	onSave?: (character: Character) => void;
	trigger: ReactNode;
}) => {
	const [open, setOpen] = useState(isOpen);
	const formRef = useRef<CreateUpdateCharacterDialogHandle>(null);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{characterToUpdate ? 'Update' : 'Create'} Character
					</DialogTitle>
					<DialogDescription>
						Input the character details below.
					</DialogDescription>
				</DialogHeader>

				<CreateUpdateCharacterForm
					ref={formRef}
					characterToUpdate={characterToUpdate}
					onSuccess={data => {
						onSave?.(data);
						setOpen(false);
						toast.success('Character saved successfully!');
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
