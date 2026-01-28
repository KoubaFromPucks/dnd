import { z } from 'zod';

export const POSSIBLE_STATS = [
	'strength',
	'dexterity',
	'constitution',
	'intelligence',
	'wisdom',
	'charisma'
] as const;

export const statsSchema = z.object({
	strength: z.number().min(1),
	dexterity: z.number().min(1),
	constitution: z.number().min(1),
	intelligence: z.number().min(1),
	wisdom: z.number().min(1),
	charisma: z.number().min(1)
});

export const optionalStatsSchema = z.object({
	strength: z.number().min(1).optional(),
	dexterity: z.number().min(1).optional(),
	constitution: z.number().min(1).optional(),
	intelligence: z.number().min(1).optional(),
	wisdom: z.number().min(1).optional(),
	charisma: z.number().min(1).optional()
});

export type Stats = z.infer<typeof statsSchema>;
