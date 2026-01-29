import React from 'react';
import { cn } from '@/lib/utils';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ children, ...props }: IconButtonProps) => {
	return (
		<button
			onClick={e => {
				e.stopPropagation();
				props.onClick?.(e);
			}}
			className={cn('p-1 text-slate-500 transition-colors', props.className)}
			title={props.title}
		>
			{children}
		</button>
	);
};
