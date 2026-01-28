import { useFormContext, get } from 'react-hook-form';
import React from 'react';

import {
	BasicInput,
	type BasicInputProps
} from '@/components/basic-components/basic-input';
import { cn } from '@/lib/utils';
import { InputLabelDiv } from './input-label-div';

type FormInputProps = BasicInputProps & {
	label: string;
	name: string;
};

export const FormInput = ({ name, label, ...inputProps }: FormInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	const error = get(errors, name);

	return (
		<label htmlFor={name}>
			<InputLabelDiv label={label} />

			<BasicInput
				{...inputProps}
				{...register(name, {
					valueAsNumber: inputProps.type === 'number'
				})}
				id={name}
				className={cn(error && 'border-red-600', inputProps.className)}
			/>

			{error && (
				<span className="mt-1 text-sm text-red-600">
					{error?.message?.toString()}
				</span>
			)}
		</label>
	);
};
