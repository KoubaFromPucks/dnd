import { POSSIBLE_STATS, statsSchema } from './stats';
import { ItemSchema } from './item';
import { POSSIBLE_CLASSES } from './character-class';

import { z } from 'zod';
import { POSSIBLE_RACES } from './character-race';
import { POSSIBLE_SKILLS } from './skill';
import { stringToArraySchema } from './string-to-array-schema';

export const CharacterSchema = z.object({
	id: z.string().uuid(),
	pictureUrl: z.string().url().optional().or(z.literal('')),
	characterBackground: z.string().optional().or(z.literal('')),
	characterName: z.string().min(1),
	level: z.number().min(1).max(20),
	stats: statsSchema,
	hp: z.object({ current: z.number().min(0), max: z.number().min(1) }),
	inventory: z.array(ItemSchema),
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

export type Character = z.output<typeof CharacterSchema>;

export type CharacterCreateUpdateInput = z.input<typeof CharacterSchema>;
