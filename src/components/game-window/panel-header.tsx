'use client';

import React, { ReactNode } from 'react';

type PanelHeaderProps = {
	title: string;
	icon: ReactNode;
	actionButton?: ReactNode;
};

export const PanelHeader = ({
	title,
	icon,
	actionButton
}: PanelHeaderProps) => (
	<div className="mb-3 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-4">
		<h3 className="flex items-center gap-2 text-xs font-bold tracking-widest text-slate-500 uppercase">
			{icon} {title}
		</h3>
		{actionButton}
	</div>
);
