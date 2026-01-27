// components/form/form-select.tsx
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select, { ActionMeta, MultiValue, SingleValue } from 'react-select';

type Option = { value: string; label: string };

type FormSelectProps = {
	name: string;
	label: string;
	options: Option[];
	placeholder?: string;
	isMulti?: boolean;
	className?: string;
};

export const FormSelect = ({
	name,
	label,
	options,
	placeholder,
	isMulti = false,
	className
}: FormSelectProps) => {
	const {
		control,
		formState: { errors }
	} = useFormContext();

	return (
		<label className={`flex flex-col gap-1 ${className ?? ''}`}>
			<div className="ml-1 text-sm font-medium">{label}</div>

			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value, ref } }) => {
					const getValue = () => {
						if (isMulti) {
							return options.filter(opt =>
								(value as string[])?.includes(opt.value)
							);
						}
						return options.find(opt => opt.value === value) || null;
					};

					return (
						<Select
							ref={ref}
							isMulti={isMulti}
							placeholder={placeholder}
							options={options}
							value={getValue()}
							onChange={(
								val: MultiValue<Option> | SingleValue<Option>,
								_actionMeta: ActionMeta<Option>
							) => {
								if (isMulti) {
									onChange((val as MultiValue<Option>).map(v => v.value));
								} else {
									onChange((val as SingleValue<Option>)?.value);
								}
							}}
							unstyled
							classNames={{
								control: ({ isFocused }) => `
									!bg-background !border !border-input !rounded-md !min-h-[40px] !text-sm !transition-all
									${isFocused ? '!ring-2 !ring-ring !ring-offset-2 !ring-offset-background !outline-none' : ''}
									${errors[name] ? '!border-red-600' : ''}
								`,
								menu: () =>
									'!bg-background !border !border-border !mt-2 !rounded-md !shadow-xl !z-50',
								option: ({ isFocused, isSelected }) => `
									!text-sm !px-3 !py-2 !cursor-pointer
									${isSelected ? '!bg-primary !text-primary-foreground' : ''}
									${isFocused && !isSelected ? '!bg-slate-800 !text-primary' : ''}
									${!isFocused && !isSelected ? '!text-foreground' : ''}
								`,
								multiValue: () => '!bg-primary !rounded !mr-1 !my-0.5',
								multiValueLabel: () =>
									'!text-primary-foreground !px-2 !py-0.5 !text-xs !font-medium',
								multiValueRemove: () =>
									'!text-primary-foreground !hover:bg-amber-700 !rounded-r !transition-colors !px-1',
								placeholder: () => '!text-muted-foreground',
								input: () => '!text-foreground',
								singleValue: () => '!text-foreground',
								indicatorSeparator: () => '!bg-border',
								dropdownIndicator: () =>
									'!text-muted-foreground !hover:text-foreground !px-2',
								clearIndicator: () =>
									'!text-muted-foreground !hover:text-red-500',
								noOptionsMessage: () => '!p-4 !text-muted-foreground !text-sm'
							}}
						/>
					);
				}}
			/>

			{errors[name] && (
				<span className="mt-1 ml-1 text-sm text-red-600">
					{errors[name]?.message?.toString()}
				</span>
			)}
		</label>
	);
};
