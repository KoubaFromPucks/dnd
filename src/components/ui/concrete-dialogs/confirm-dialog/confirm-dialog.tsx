import React, { ReactNode, useState } from 'react';
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

type ConfirmDialogProps = {
	trigger: ReactNode;
	title: string;
	text: string;
	onConfirm: () => void;
};

export const ConfirmDialog = ({
	trigger,
	title,
	text,
	onConfirm
}: ConfirmDialogProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{text && <DialogDescription>{text}</DialogDescription>}
				</DialogHeader>
				<DialogFooter>
					<Button variant="secondary" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							setOpen(false);
							onConfirm();
						}}
					>
						Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
