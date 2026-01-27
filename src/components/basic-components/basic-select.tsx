import { forwardRef } from 'react';
import React from 'react';

export type BasicSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
	className?: string;
	children?: React.ReactNode;
};

const BasicSelect = forwardRef<HTMLSelectElement, BasicSelectProps>(
	({ className, ...props }, ref) => (
		<select
			className={`
				flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
				ring-offset-background transition-all
				focus-visible:outline-hidden 
				focus-visible:ring-2 
				focus-visible:ring-ring 
				focus-visible:ring-offset-2
				disabled:cursor-not-allowed disabled:opacity-50 
				${className ?? ''}`}
			ref={ref}
			{...props}
		>
			{props.children}
		</select>
	)
);
BasicSelect.displayName = 'BasicSelect';

export { BasicSelect };
