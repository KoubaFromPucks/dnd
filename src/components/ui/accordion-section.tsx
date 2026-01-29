import React from 'react';
import { AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

export const AccordionSection = ({
	title,
	children
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<AccordionItem
		value={title.toLowerCase().replace(/\s+/g, '-')}
		className="border-border"
	>
		<AccordionTrigger className="text-primary font-bold tracking-wider uppercase hover:no-underline">
			{title}
		</AccordionTrigger>
		<AccordionContent className="space-y-4 px-1 pt-2">
			{children}
		</AccordionContent>
	</AccordionItem>
);
