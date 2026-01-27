import { useFormContext } from 'react-hook-form';
import React from 'react';

import {
	BasicTextarea,
	type BasicTextareaProps
} from '@/components/basic-components/basic-textarea';
import { cn } from '@/lib/utils';

type FormTextareaProps = BasicTextareaProps & {
	label: string;
	name: string;
};

export const FormTextarea = ({
	name,
	label,
	...textareaProps
}: FormTextareaProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	return (
		<label htmlFor={name}>
			<div className="mb-1 text-sm font-medium">{label}</div>

			<BasicTextarea
				{...textareaProps}
				{...register(name)}
				id={name}
				className={cn(
					errors[name] && 'border-red-600',
					textareaProps.className
				)}
			/>

			{errors[name] && (
				<span className="mt-1 text-sm text-red-600">
					{errors[name]?.message?.toString()}
				</span>
			)}
		</label>
	);
};
