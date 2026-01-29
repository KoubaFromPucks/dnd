import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const stringArrayToSelectOptions = (options: string[]) => {
	return options.map(option => ({ label: option, value: option }));
};

export const delay = (ms: number) =>
	new Promise(resolve => setTimeout(resolve, ms));
