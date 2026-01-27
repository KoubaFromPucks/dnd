export const POSSIBLE_RACES = [
	'Human',
	'Elf',
	'Dwarf',
	'Halfling',
	'Dragonborn',
	'Gnome',
	'Half-Orc',
	'Half-Elf',
	'Tiefling'
] as const;

export type RaceName = (typeof POSSIBLE_RACES)[number];

export type CharacterRace = {
	name: RaceName;
	speed: number;
	darkvision: number;
	traits: string[];
	languages: string[];
};

export const RACES: Record<RaceName, CharacterRace> = {
	'Dwarf': {
		name: 'Dwarf',
		speed: 25,
		darkvision: 60,
		traits: [
			'Dwarven Resilience',
			'Dwarven Combat Training',
			'Tool Proficiency',
			'Stonecunning'
		],
		languages: ['Common', 'Dwarvish']
	},
	'Elf': {
		name: 'Elf',
		speed: 30,
		darkvision: 60,
		traits: ['Keen Senses', 'Fey Ancestry', 'Trance'],
		languages: ['Common', 'Elvish']
	},
	'Halfling': {
		name: 'Halfling',
		speed: 25,
		darkvision: 60,
		traits: ['Lucky', 'Brave', 'Halfling Nimbleness'],
		languages: ['Common', 'Halfling']
	},
	'Human': {
		name: 'Human',
		speed: 30,
		darkvision: 0,
		traits: [],
		languages: ['Common', 'One extra language of your choice']
	},
	'Dragonborn': {
		name: 'Dragonborn',
		speed: 30,
		darkvision: 0,
		traits: ['Draconic Ancestry', 'Breath Weapon', 'Damage Resistance'],
		languages: ['Common', 'Draconic']
	},
	'Gnome': {
		name: 'Gnome',
		speed: 25,
		darkvision: 60,
		traits: ['Gnome Cunning'],
		languages: ['Common', 'Gnomish']
	},
	'Half-Elf': {
		name: 'Half-Elf',
		speed: 30,
		darkvision: 60,
		traits: ['Fey Ancestry', 'Skill Versatility'],
		languages: ['Common', 'Elvish', 'One extra language of your choice']
	},
	'Half-Orc': {
		name: 'Half-Orc',
		speed: 30,
		darkvision: 60,
		traits: ['Menacing', 'Relentless Endurance', 'Savage Attacks'],
		languages: ['Common', 'Orc']
	},
	'Tiefling': {
		name: 'Tiefling',
		speed: 30,
		darkvision: 60,
		traits: ['Hellish Resistance', 'Infernal Legacy'],
		languages: ['Common', 'Infernal']
	}
};
