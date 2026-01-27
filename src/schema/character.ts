import { POSSIBLE_STATS, statsSchema, type Stats } from './stats';
import { ItemSchema, type Item } from './item';
import { POSSIBLE_CLASSES } from './character-class';

import { z } from 'zod';
import { POSSIBLE_RACES, RaceName } from './character-race';
import { POSSIBLE_SKILLS } from './skill';

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
	conditions: z.preprocess(
		val => (typeof val === 'string' ? val.split('\n').map(s => s.trim()) : val),
		z.array(z.string())
	),
	proficiencyBonus: z.number().min(0),
	ac: z.number().min(0),
	maxCarryWeight: z.number().min(0),

	// race
	raceName: z.enum(POSSIBLE_RACES),
	speed: z.number().min(0),
	darkvision: z.number().min(0),
	traits: z.preprocess(
		val => (typeof val === 'string' ? val.split('\n').map(s => s.trim()) : val),
		z.array(z.string())
	),
	languages: z.preprocess(
		val => (typeof val === 'string' ? val.split('\n').map(s => s.trim()) : val),
		z.array(z.string())
	),

	// class
	className: z.enum(POSSIBLE_CLASSES),
	savingThrows: z.array(z.enum(POSSIBLE_STATS)),
	features: z.preprocess(
		val => (typeof val === 'string' ? val.split('\n').map(s => s.trim()) : val),
		z.array(z.string())
	),
	proficiencySkills: z.array(z.enum(POSSIBLE_SKILLS))
});

export type Character = z.infer<typeof CharacterCreateUpdateSchema>;