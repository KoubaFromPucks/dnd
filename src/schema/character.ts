import { POSSIBLE_STATS, statsSchema, type Stats } from './stats';
import { type Item } from './item';
import { POSSIBLE_CLASSES } from './character-class';

import { z } from 'zod';
import { POSSIBLE_RACES, RaceName } from './character-race';
import { POSSIBLE_SKILLS } from './skill';

export const CharacterCreateUpdateSchema = z.object({
	pictureUrl: z.string().url().optional(),
	characterBackground: z.string().min(1),
	characterName: z.string().min(1),
	level: z.number().min(1).max(20),
	stats: statsSchema,
	hp: z.object({ current: z.number().min(0), max: z.number().min(1) }),
	currentGold: z.number().min(0),
	alignment: z.string().optional(),
	conditions: z.preprocess(
		val => (typeof val === 'string' ? val.split('\n').map(s => s.trim()) : val),
		z.array(z.string())
	),
	proficiencyBonus: z.number().min(0),

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

	// speed
	className: z.enum(POSSIBLE_CLASSES),
	savingThrows: z.array(z.enum(POSSIBLE_STATS)),
	features: z.preprocess(
		val => (typeof val === 'string' ? val.split('\n').map(s => s.trim()) : val),
		z.array(z.string())
	),
	proficiencySkills: z.array(z.enum(POSSIBLE_SKILLS))
});

export type Character = {
	pictureUrl?: string;
	characterBackground: string;
	characterName: string;
	level: number;
	stats: Required<Stats>;
	hp: { current: number; max: number };
	inventory: Item[];
	currentGold: number;
	alignment?: string; // "Lawful Good", and so on... (can help AI's roleplaying)
	conditions: string[]; // e.g., ["Poisoned", "Stunned"]
	proficiencyBonus: number;

	// race attributes
	raceName: RaceName;
	speed: number;
	darkvision: number;
	traits: string[];
	languages: string[];

	// class bonuses
	className: (typeof POSSIBLE_CLASSES)[number];
	savingThrows: (keyof Stats)[];
	features: string[];
	proficiencySkills: (typeof POSSIBLE_SKILLS)[number][];
};
