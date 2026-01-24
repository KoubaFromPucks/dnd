'use client';

import { Button } from '../basic-components/button';
import React, { ReactNode } from 'react';
import { Plus } from 'lucide-react';

type PanelHeaderProps = {
	title: string;
	icon: ReactNode;
	hidePlusButton?: boolean;
};

export const PanelHeader = ({
	title,
	icon,
	hidePlusButton
}: PanelHeaderProps) => (
	<div className="mb-3 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4">
		<h3 className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
			{icon} {title}
		</h3>
		{!hidePlusButton && (
			<Button
				variant="ghost"
				size="sm"
				className="h-8 w-8 p-0 hover:text-amber-500"
			>
				<Plus size={18} />
			</Button>
		)}
	</div>
);
