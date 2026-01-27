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
		<Dialog open={open}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create / Update Character</DialogTitle>
					<DialogDescription>
						Input the character details below.
					</DialogDescription>
				</DialogHeader>

				<CreateUpdateCharacterForm
					ref={formRef}
					characterToUpdate={characterToUpdate}
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
							onSave?.(characterToUpdate!);
						}}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
