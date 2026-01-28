import { Item } from '@/schema/item';

export const ragnarInventory: Item[] = [
	{
		name: 'Válečná sekera',
		itemType: 'melee weapon',
		useType: 'equippable',
		description: 'Masivní trpasličí sekera ukovaná v hlubinách hor.',
		weight: 4,
		equipped: true,
		cost: 15,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: ['Seknutí nepřítele.'],
		effectDuration: 0,
		rarity: 'common',
		statsBonuses: {}
	},
	{
		name: 'Kroužková zbroj',
		itemType: 'heavy armor',
		useType: 'equippable',
		description: 'Těžká zbroj z propojených ocelových kroužků.',
		weight: 55,
		equipped: true,
		cost: 75,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: [],
		effectDuration: 0,
		rarity: 'common',
		armorClassBonus: 6,
		statsBonuses: {}
	},
	{
		name: 'Velký štít',
		itemType: 'shield',
		useType: 'equippable',
		description: 'Dubový štít okovaný železem.',
		weight: 6,
		equipped: true,
		cost: 10,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: ['Zvyšuje obranu.'],
		effectDuration: 0,
		rarity: 'common',
		armorClassBonus: 2,
		statsBonuses: {}
	},
	{
		name: 'Malý štít',
		itemType: 'shield',
		useType: 'equippable',
		description: 'Dubový štít okovaný železem.',
		weight: 3,
		equipped: false,
		cost: 10,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: ['Zvyšuje obranu.'],
		effectDuration: 0,
		rarity: 'common',
		armorClassBonus: 1,
		statsBonuses: {}
	}
];

export const elaraInventory: Item[] = [
	{
		name: 'Kord (Rapier)',
		itemType: 'melee weapon',
		useType: 'equippable',
		description: 'Elegantní elfská čepel pro přesné výpady.',
		weight: 2,
		equipped: true,
		cost: 25,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: ['Bodnutí slabého místa.'],
		effectDuration: 0,
		rarity: 'common',
		statsBonuses: {}
	},
	{
		name: 'Krátký luk',
		itemType: 'ranged weapon',
		useType: 'equippable',
		description: 'Lehký luk z pružného dřeva.',
		weight: 2,
		equipped: false,
		cost: 25,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: ['Střelba z dálky.'],
		effectDuration: 0,
		rarity: 'common',
		statsBonuses: {}
	},
	{
		name: 'Kožená zbroj',
		itemType: 'medium armor',
		useType: 'equippable',
		description: 'Tvrzená kůže, která neomezuje v pohybu.',
		weight: 10,
		equipped: true,
		cost: 10,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: [''],
		effectDuration: 0,
		rarity: 'common',
		armorClassBonus: 1,
		statsBonuses: {}
	},
	{
		name: 'Zlodějské náčiní',
		itemType: 'other',
		useType: 'equippable',
		description: 'Sada planžet a nástrojů pro páčení zámků.',
		weight: 1,
		equipped: false,
		cost: 25,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: ['Páčení zámků nebo zneškodňování pastí.'],
		effectDuration: 0,
		rarity: 'common',
		statsBonuses: { dexterity: 1 }
	}
];

export const zephyrInventory: Item[] = [
	{
		name: 'Magická hůl',
		itemType: 'ranged weapon',
		useType: 'equippable',
		description:
			'Hůl z jasanového dřeva sloužící jako zbraň i magické ohnisko.',
		weight: 4,
		equipped: true,
		cost: 5,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: ['Úder holí.'],
		effectDuration: 0,
		rarity: 'common',
		statsBonuses: {}
	},
	{
		name: 'Kniha kouzel',
		itemType: 'other',
		useType: 'equippable',
		description: 'Vázaná kniha plná arkánních formulí a poznámek.',
		weight: 3,
		equipped: true,
		cost: 50,
		quantity: 1,
		passiveEffects: [],
		activeEffectDescription: ['Studium kouzel'],
		effectDuration: 0,
		rarity: 'uncommon',
		statsBonuses: { intelligence: 1 }
	},
	{
		name: 'Lektvar léčení',
		itemType: 'consumable',
		useType: 'consumable',
		description: 'Jasně červená tekutina v malé skleněné lahvičce.',
		weight: 0.5,
		equipped: false,
		cost: 50,
		quantity: 2,
		passiveEffects: [],
		activeEffectDescription: ['Okamžitě vyléčí 2d4 + 2 životů.'],
		effectDuration: 1,
		rarity: 'common',
		statsBonuses: {}
	}
];
