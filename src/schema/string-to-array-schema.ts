import { z } from 'zod';

export const ARRAY_STRING_SEPARATOR = '\n';

export const stringToArray = (input: string) =>
	input
		.split(ARRAY_STRING_SEPARATOR)
		.map(str => str.trim())
		.filter(Boolean);

export const arrayToString = (input: string[]) =>
	input.join(ARRAY_STRING_SEPARATOR);

export const stringToArraySchema = z
	.string()
	.transform(stringToArray)
	.pipe(z.string().array());
