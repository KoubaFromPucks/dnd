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
					<DialogTitle>Vytvořit / Upravit Postavu</DialogTitle>
					<DialogDescription>
						Zadejte jméno vaší postavy a další detaily.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2"></div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => {}}>
						Zrušit
					</Button>
					<Button
						onClick={() => {
							onSave?.(characterName);
						}}
					>
						Uložit
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
