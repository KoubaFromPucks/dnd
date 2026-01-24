import { Item } from "@/schema/item";

export const ragnarInventory : Item[] = [
	{
		name: 'Válečná sekera',
		itemType: 'weapon',
		useType: 'equippable',
		range: 'melee',
		description: 'Masivní trpasličí sekera ukovaná v hlubinách hor.',
		weight: 4,
		equipped: true,
		cost: 15,
		quantity: 1,
		passiveEffects: {},
		activeEffectDescription: 'Seknutí nepřítele.',
		effectDuration: 0,
		rarity: 'common',
		damage: { throwsCount: 1, diceSides: 8, scalingStat: 'strength' }
	},
	{
		name: 'Kroužková zbroj',
		itemType: 'armor',
		useType: 'equippable',
		description: 'Těžká zbroj z propojených ocelových kroužků.',
		weight: 55,
		equipped: true,
		cost: 75,
		quantity: 1,
		passiveEffects: {},
		activeEffectDescription: '',
		effectDuration: 0,
		rarity: 'common',
		armorClassBonus: 6 // Celkové AC 16 (Base 10 + 6)
	},
	{
		name: 'Velký štít',
		itemType: 'armor',
		useType: 'equippable',
		description: 'Dubový štít okovaný železem.',
		weight: 6,
		equipped: true,
		cost: 10,
		quantity: 1,
		passiveEffects: {},
		activeEffectDescription: 'Zvyšuje obranu.',
		effectDuration: 0,
		rarity: 'common',
		armorClassBonus: 2
	}
];

export const elaraInventory: Item[] = [
	{
		name: 'Kord (Rapier)',
		itemType: 'weapon',
		useType: 'equippable',
		range: 'melee',
		description: 'Elegantní elfská čepel pro přesné výpady.',
		weight: 2,
		equipped: true,
		cost: 25,
		quantity: 1,
		passiveEffects: {},
		activeEffectDescription: 'Bodnutí slabého místa.',
		effectDuration: 0,
		rarity: 'common',
		damage: { throwsCount: 1, diceSides: 8, scalingStat: 'dexterity' }
	},
	{
		name: 'Krátký luk',
		itemType: 'weapon',
		useType: 'equippable',
		range: 'ranged',
		description: 'Lehký luk z pružného dřeva.',
		weight: 2,
		equipped: false,
		cost: 25,
		quantity: 1,
		passiveEffects: {},
		activeEffectDescription: 'Střelba z dálky.',
		effectDuration: 0,
		rarity: 'common',
		damage: { throwsCount: 1, diceSides: 6, scalingStat: 'dexterity' }
	},
	{
		name: 'Kožená zbroj',
		itemType: 'armor',
		useType: 'equippable',
		description: 'Tvrzená kůže, která neomezuje v pohybu.',
		weight: 10,
		equipped: true,
		cost: 10,
		quantity: 1,
		passiveEffects: {},
		activeEffectDescription: '',
		effectDuration: 0,
		rarity: 'common',
		armorClassBonus: 1
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
		passiveEffects: { dexterity: 1 },
		activeEffectDescription: 'Páčení zámků nebo zneškodňování pastí.',
		effectDuration: 0,
		rarity: 'common'
	}
];

export const zephyrInventory: Item[] = [
	{
		name: 'Magická hůl',
		itemType: 'weapon',
		useType: 'equippable',
		range: 'melee',
		description: 'Hůl z jasanového dřeva sloužící jako zbraň i magické ohnisko.',
		weight: 4,
		equipped: true,
		cost: 5,
		quantity: 1,
		passiveEffects: {},
		activeEffectDescription: 'Úder holí.',
		effectDuration: 0,
		rarity: 'common',
		damage: { throwsCount: 1, diceSides: 6, scalingStat: 'strength' }
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
		passiveEffects: { intelligence: 1 },
		activeEffectDescription: 'Studium kouzel.',
		effectDuration: 0,
		rarity: 'uncommon'
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
		passiveEffects: {},
		activeEffectDescription: 'Okamžitě vyléčí 2d4 + 2 životů.',
		effectDuration: 1,
		rarity: 'common'
	}
];