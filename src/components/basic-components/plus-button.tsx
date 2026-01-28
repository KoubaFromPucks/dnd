import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './button';

export const PlusButton = ({ onClick }: { onClick?: () => void }) => (
	<Button
		variant="ghost"
		size="sm"
		className="h-8 w-8 p-0 hover:text-amber-500"
		onClick={onClick}
	>
		<Plus size={18} />
	</Button>
);
