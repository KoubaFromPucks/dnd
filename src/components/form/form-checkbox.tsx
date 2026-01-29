// components/form/form-checkbox.tsx
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormCheckboxProps = {
	name: string;
	label: string;
	className?: string;
};

export const FormCheckbox = ({ name, label, className }: FormCheckboxProps) => {
	const { control } = useFormContext();

	return (
		<div
			className={cn(
				'flex w-full items-center justify-between border-b border-slate-800/50 px-1 py-3',
				className
			)}
		>
			<span className="text-sm font-medium text-slate-300 select-none">
				{label}
			</span>

			<Controller
				control={control}
				name={name}
				render={({ field: { value, onChange } }) => (
					<label className="relative flex cursor-pointer items-center">
						<input
							type="checkbox"
							className="peer sr-only"
							checked={value}
							onChange={e => onChange(e.target.checked)}
						/>
						<div className="h-6 w-6 rounded border border-slate-700 bg-slate-900 transition-all peer-checked:border-amber-500 peer-checked:bg-amber-500/20 peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-950">
							<Check
								className={cn(
									'mx-auto mt-0.5 h-5 w-5 text-amber-500 transition-opacity',
									value ? 'opacity-100' : 'opacity-0'
								)}
							/>
						</div>
					</label>
				)}
			/>
		</div>
	);
};
