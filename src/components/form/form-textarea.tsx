import { useFormContext, get } from 'react-hook-form';
import React from 'react';

import {
	BasicTextarea,
	type BasicTextareaProps
} from '@/components/basic-components/basic-textarea';
import { cn } from '@/lib/utils';
import { InputLabelDiv } from './input-label-div';

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

	const error = get(errors, name);

	return (
		<label htmlFor={name}>
			<InputLabelDiv label={label} />

			<BasicTextarea
				{...textareaProps}
				{...register(name)}
				id={name}
				className={cn(error && 'border-red-600', textareaProps.className)}
			/>

			{error && (
				<span className="mt-1 ml-1 text-sm text-red-600">
					{error?.message?.toString()}
				</span>
			)}
		</label>
	);
};
