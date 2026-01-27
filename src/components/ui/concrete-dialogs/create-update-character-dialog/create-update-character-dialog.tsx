import React from 'react';

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
import { Edit2 } from 'lucide-react';
import { CreateUpdateCharacterForm } from './create-update-character-form';

export const CreateUpdateCharacterDialog = ({
	isOpen,
	onSave
}: {
	isOpen?: boolean;
	onSave?: (name: string) => void;
}) => {
	const [characterName] = useState('');

	return (
		<Dialog open={isOpen}>
			<DialogTrigger asChild>
				<button className="mx-auto flex items-center justify-center gap-2 text-center text-slate-500 hover:text-amber-500">
					<Edit2 size={16} /> Edit
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create / Update Character</DialogTitle>
					<DialogDescription>
						Input the character details below.
					</DialogDescription>
				</DialogHeader>
				
				<CreateUpdateCharacterForm />

				<DialogFooter>
					<Button variant="outline" onClick={() => {}}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							onSave?.(characterName);
						}}
					>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
