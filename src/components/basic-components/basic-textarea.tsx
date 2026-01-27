import { forwardRef } from 'react';
import React from 'react';

export type BasicTextareaProps =
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		className?: string;
	};

export const BasicTextarea = forwardRef<
	HTMLTextAreaElement,
	BasicTextareaProps
>(({ className, ...props }, ref) => (
	<textarea
		className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-s flex min-h-20 w-full rounded-md border px-3 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
		ref={ref}
		{...props}
	/>
));

BasicTextarea.displayName = 'BasicTextarea';
