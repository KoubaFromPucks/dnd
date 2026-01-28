import { POSSIBLE_STATS, statsSchema } from './stats';
import { ItemSchema } from './item';
import { POSSIBLE_CLASSES } from './character-class';

import { z } from 'zod';
import { POSSIBLE_RACES } from './character-race';
import { POSSIBLE_SKILLS } from './skill';

export const ARRAY_STRING_SEPARATOR = '\n';

export const stringToArray = (input: string) =>
	input
		.split(ARRAY_STRING_SEPARATOR)
		.map(str => str.trim())
		.filter(Boolean);

export const arrayToString = (input: string[]) =>
	input.join(ARRAY_STRING_SEPARATOR);

const stringToArraySchema = z
	.string()
	.transform(stringToArray)
	.pipe(z.string().array());

export const CharacterCreateUpdateSchema = z.object({
	id: z.string().uuid(),
	pictureUrl: z.string().url().optional().or(z.literal('')),
	characterBackground: z.string().optional().or(z.literal('')),
	characterName: z.string().min(1),
	level: z.number().min(1).max(20),
	stats: statsSchema,
	hp: z.object({ current: z.number().min(0), max: z.number().min(1) }),
	inventory: ItemSchema.array(),
	currentGold: z.number().min(0),
	alignment: z.string().optional().or(z.literal('')),
	conditions: stringToArraySchema,
	proficiencyBonus: z.number().min(0),
	ac: z.number().min(0),
	maxCarryWeight: z.number().min(0),

	// race
	raceName: z.enum(POSSIBLE_RACES),
	speed: z.number().min(0),
	darkvision: z.number().min(0),
	traits: stringToArraySchema,
	languages: stringToArraySchema,

	// class
	className: z.enum(POSSIBLE_CLASSES),
	savingThrows: z.array(z.enum(POSSIBLE_STATS)),
	features: stringToArraySchema,
	proficiencySkills: z.array(z.enum(POSSIBLE_SKILLS))
});

export type Character = z.output<typeof CharacterCreateUpdateSchema>;

export type CharacterCreateUpdateInput = z.input<
	typeof CharacterCreateUpdateSchema
>;
