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
		rarity: 'common',
		statsBonuses: {
			strength: 1,
			charisma: -1,
			constitution: 1,
			dexterity: -1,
			intelligence: -1,
			wisdom: 0
		}
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
		rarity: 'common',
		armorClassBonus: 6,
		statsBonuses: {
			strength: -1,
			constitution: 1,
			dexterity: -1,
			charisma: -1,
			intelligence: 0,
			wisdom: 0
		}
	},
	{
		name: 'Dragqueen',
		itemType: 'shield',
		useType: 'equippable',
		description: 'Štít z dračí kůže',
		weight: 6,
		equipped: true,
		cost: 10,
		quantity: 1,
		passiveEffects: ['Imunita proti ohni'],
		activeEffectDescription: [],
		rarity: 'common',
		armorClassBonus: 2,
		statsBonuses: {
			strength: -1,
			dexterity: -1,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0
		}
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
		rarity: 'common',
		armorClassBonus: 1,
		statsBonuses: {
			strength: 0,
			dexterity: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0
		}
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
		rarity: 'common',
		statsBonuses: {
			strength: 0,
			dexterity: 1,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0
		}
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
		rarity: 'common',
		statsBonuses: {
			strength: 0,
			dexterity: 1,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0
		}
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
		activeEffectDescription: [],
		rarity: 'common',
		armorClassBonus: 1,
		statsBonuses: {
			dexterity: 1,
			strength: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0
		}
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
		activeEffectDescription: ['Usnadňuje otevírání zámků'],
		rarity: 'common',
		statsBonuses: {
			dexterity: 1,
			strength: 0,
			constitution: 0,
			intelligence: 0,
			wisdom: 0,
			charisma: 0
		}
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
		rarity: 'common',
		statsBonuses: {
			intelligence: 1,
			strength: 0,
			dexterity: 0,
			constitution: 0,
			wisdom: 0,
			charisma: 0
		}
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
		rarity: 'uncommon',
		statsBonuses: {
			intelligence: 1,
			strength: 0,
			dexterity: 0,
			constitution: 0,
			wisdom: 0,
			charisma: 0
		}
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
		rarity: 'common',
		statsBonuses: {
			intelligence: 0,
			strength: 0,
			dexterity: 0,
			constitution: 0,
			wisdom: 0,
			charisma: 0
		}
	}
];
