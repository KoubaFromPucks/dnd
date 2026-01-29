import { z } from 'zod';
import { stringToArraySchema } from './string-to-array-schema';
import { statsSchema } from './stats';

export const POSSIBLE_ITEM_TYPES = [
	'melee weapon',
	'ranged weapon',
	'light armor',
	'medium armor',
	'heavy armor',
	'consumable',
	'other',
	'shield'
] as const;

export const POSSIBLE_USE_TYPES = ['equippable', 'consumable'] as const;

export const POSSIBLE_RARITIES = [
	'common',
	'uncommon',
	'rare',
	'very rare',
	'legendary'
] as const;

export const ItemSchema = z.object({
	name: z.string().min(1),
	itemType: z.enum(POSSIBLE_ITEM_TYPES),
	useType: z.enum(POSSIBLE_USE_TYPES),
	rarity: z.enum(POSSIBLE_RARITIES),
	description: z.string().optional().default(''),
	quantity: z.number().min(1),
	equipped: z.boolean().default(false),

	weight: z.number().min(0),
	cost: z.number().min(0),
	armorClassBonus: z.number().default(0),

	statsBonuses: statsSchema,

	passiveEffects: stringToArraySchema,
	activeEffectDescription: stringToArraySchema
});

export type Item = z.infer<typeof ItemSchema>;

export type ItemCreateUpdateInput = z.input<typeof ItemSchema>;
