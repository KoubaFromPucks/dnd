import { Stats } from './stats';
import { POSSIBLE_SKILLS } from './skill';

export const POSSIBLE_CLASSES = [
	'Barbarian',
	'Bard',
	'Cleric',
	'Druid',
	'Fighter',
	'Monk',
	'Paladin',
	'Ranger',
	'Rogue',
	'Sorcerer',
	'Warlock',
	'Wizard'
] as const;
export type className = (typeof POSSIBLE_CLASSES)[number];

export type CharacterClass = {
	name: className;
	savingThrows: (keyof Stats)[];
	featureList: Record<number, string[]>;
	possibleStartingSkills: (typeof POSSIBLE_SKILLS)[number][];
	numberOfStartingSkills: number;
};

export const CLASSES: Record<className, CharacterClass> = {
	Barbarian: {
		name: 'Barbarian',
		savingThrows: ['strength', 'constitution'],
		featureList: {
			1: ['Rage', 'Unarmored Defense'],
			2: ['Reckless Attack', 'Danger Sense'],
			3: ['Primal Path'],
			4: ['Ability Score Improvement'],
			5: ['Extra Attack', 'Fast Movement'],
			6: ['Path feature'],
			7: ['Feral Instinct'],
			8: ['Ability Score Improvement'],
			9: ['Brutal Critical (1 die)'],
			10: ['Path feature'],
			11: ['Relentless Rage'],
			12: ['Ability Score Improvement'],
			13: ['Brutal Critical (2 dice)'],
			14: ['Path feature'],
			15: ['Persistent Rage'],
			16: ['Ability Score Improvement'],
			17: ['Brutal Critical (3 dice)'],
			18: ['Indomitable Might'],
			19: ['Ability Score Improvement'],
			20: ['Primal Champion']
		},
		possibleStartingSkills: [
			'Animal Handling',
			'Athletics',
			'Intimidation',
			'Nature',
			'Perception',
			'Survival'
		],
		numberOfStartingSkills: 2
	},
	Bard: {
		name: 'Bard',
		savingThrows: ['dexterity', 'charisma'],
		featureList: {
			1: ['Spellcasting', 'Bardic Inspiration (d6)'],
			2: ['Jack of All Trades. Song of Rest (d6)'],
			3: ['Bard College', 'Expertise'],
			4: ['Ability Score Improvement'],
			5: ['Bardic Inspiration (d8)', 'Font of Inspiration'],
			6: ['Countercharm', 'Bard College feature'],
			8: ['Ability Score Improvement'],
			9: ['Song of Rest (d8)'],
			10: ['Bardic Inspiration (d10)', 'Expertise', 'Magical Secrets'],
			12: ['Ability Score Improvement'],
			13: ['Song of Rest (d10)'],
			14: ['Magical Secrets', 'Bard College feature'],
			15: ['Bardic Inspiration (d12)'],
			16: ['Ability Score Improvement'],
			17: ['Song of Rest (d12)'],
			18: ['Magical Secrets'],
			19: ['Ability Score Improvement'],
			20: ['Superior Inspiration']
		},
		possibleStartingSkills: [...POSSIBLE_SKILLS],
		numberOfStartingSkills: 3
	},
	Cleric: {
		name: 'Cleric',
		savingThrows: ['wisdom', 'charisma'],
		featureList: {
			1: ['Divine Domain', 'Spellcasting'],
			2: ['Channel Divinity (1/rest)', 'Divine Domain feature'],
			4: ['Ability Score Improvement'],
			5: ['Destroy Undead (CR 1/2)'],
			6: ['Divine Domain feature', 'Channel Divinity (2/rest)'],
			8: [
				'Destroy Undead (CR 1)',
				'Divine Domain feature',
				'Ability Score Improvement'
			],
			10: ['Divine Intervention'],
			11: ['Destroy Undead (CR 2)'],
			12: ['Ability Score Improvement'],
			14: ['Destroy Undead (CR 3)'],
			16: ['Ability Score Improvement'],
			17: ['Destroy Undead (CR 4)', 'Divine Domain feature'],
			18: ['Channel Divinity (3/rest)'],
			19: ['Ability Score Improvement'],
			20: ['Divine Intervention Improvement']
		},
		possibleStartingSkills: [
			'History',
			'Insight',
			'Medicine',
			'Persuasion',
			'Religion'
		],
		numberOfStartingSkills: 2
	},
	Druid: {
		name: 'Druid',
		savingThrows: ['intelligence', 'wisdom'],
		featureList: {
			1: ['Druidic', 'Spellcasting'],
			2: ['Wild Shape (2/rest)', 'Druid Circle'],
			4: ['Wild Shape Improvement', 'Ability Score Improvement'],
			6: ['Druid Circle feature'],
			8: ['Wild Shape Improvement', 'Ability Score Improvement'],
			10: ['Druid Circle feature'],
			12: ['Ability Score Improvement'],
			14: ['Druid Circle feature'],
			16: ['Ability Score Improvement'],
			18: ['Timeless Body', 'Beast Spells'],
			19: ['Ability Score Improvement'],
			20: ['Archdruid']
		},
		possibleStartingSkills: [
			'Arcana',
			'Animal Handling',
			'Insight',
			'Medicine',
			'Nature',
			'Perception',
			'Religion',
			'Survival'
		],
		numberOfStartingSkills: 2
	},
	Fighter: {
		name: 'Fighter',
		savingThrows: ['strength', 'constitution'],
		featureList: {
			1: ['Fighting Style', 'Second Wind'],
			2: ['Action Surge (1/rest)'],
			3: ['Martial Archetype'],
			4: ['Ability Score Improvement'],
			5: ['Extra Attack'],
			6: ['Ability Score Improvement'],
			7: ['Martial Archetype feature'],
			8: ['Ability Score Improvement'],
			9: ['Indomitable (one use)'],
			10: ['Martial Archetype feature'],
			11: ['Extra Attack (2)'],
			12: ['Ability Score Improvement'],
			13: ['Indomitable (two uses)'],
			14: ['Ability Score Improvement'],
			15: ['Martial Archetype feature'],
			16: ['Ability Score Improvement'],
			17: ['Indomitable (three uses)', 'Action Surge (two uses)'],
			18: ['Martial Archetype feature'],
			19: ['Ability Score Improvement'],
			20: ['Extra Attack (3)']
		},
		possibleStartingSkills: [
			'Acrobatics',
			'Animal Handling',
			'Athletics',
			'History',
			'Insight',
			'Intimidation',
			'Perception',
			'Survival'
		],
		numberOfStartingSkills: 2
	},
	Monk: {
		name: 'Monk',
		savingThrows: ['strength', 'dexterity'],
		featureList: {
			1: ['Unarmored Defense', 'Martial Arts'],
			2: ['Ki', 'Unarmored Movement'],
			3: ['Monastic Tradition', 'Deflect Missiles'],
			4: ['Ability Score Improvement', 'Slow Fall'],
			5: ['Extra Attack', 'Stunning Strike'],
			6: ['Ki-Empowered Strikes', 'Monastic Tradition feature'],
			7: ['Evasion', 'Stillness of Mind'],
			8: ['Ability Score Improvement'],
			9: ['Unarmored Movement Improvement'],
			10: ['Purity of Body'],
			11: ['Monastic Tradition feature'],
			12: ['Ability Score Improvement'],
			13: ['Tongue of the Sun and Moon'],
			14: ['Diamond Soul'],
			15: ['Timeless Body'],
			16: ['Ability Score Improvement'],
			17: ['Monastic Tradition feature'],
			18: ['Empty Body'],
			19: ['Ability Score Improvement'],
			20: ['Perfect Self']
		},
		possibleStartingSkills: [
			'Acrobatics',
			'Athletics',
			'History',
			'Insight',
			'Religion',
			'Stealth'
		],
		numberOfStartingSkills: 2
	},
	Paladin: {
		name: 'Paladin',
		savingThrows: ['wisdom', 'charisma'],
		featureList: {
			1: ['Divine Sense', 'Lay on Hands'],
			2: ['Fighting Style', 'Spellcasting', 'Divine Smite'],
			3: ['Sacred Oath', 'Divine Health'],
			4: ['Ability Score Improvement'],
			5: ['Extra Attack'],
			6: ['Aura of Protection'],
			7: ['Sacred Oath feature'],
			8: ['Ability Score Improvement'],
			10: ['Aura of Courage'],
			11: ['Improved Divine Smite'],
			12: ['Ability Score Improvement'],
			14: ['Cleansing Touch'],
			15: ['Sacred Oath feature'],
			16: ['Ability Score Improvement'],
			18: ['Aura Improvements'],
			19: ['Ability Score Improvement'],
			20: ['Sacred Oath feature']
		},
		possibleStartingSkills: [
			'Athletics',
			'Insight',
			'Intimidation',
			'Medicine',
			'Persuasion',
			'Religion'
		],
		numberOfStartingSkills: 2
	},
	Ranger: {
		name: 'Ranger',
		savingThrows: ['strength', 'dexterity'],
		featureList: {
			1: ['Favored Enemy', 'Natural Explorer'],
			2: ['Fighting Style', 'Spellcasting'],
			3: ['Ranger Archetype', 'Primeval Awareness'],
			4: ['Ability Score Improvement'],
			5: ['Extra Attack'],
			6: ['Favored Enemy Improvement', 'Natural Explorer Improvement'],
			7: ['Ranger Archetype feature'],
			8: ['Ability Score Improvement', "Land's Stride"],
			10: ['Natural Explorer Improvement', 'Hide in Plain Sight'],
			11: ['Ranger Archetype feature'],
			12: ['Ability Score Improvement'],
			14: ['Favored Enemy Improvement', 'Vanish'],
			15: ['Ranger Archetype feature'],
			16: ['Ability Score Improvement'],
			18: ['Feral Senses'],
			19: ['Ability Score Improvement'],
			20: ['Foe Slayer']
		},
		possibleStartingSkills: [
			'Animal Handling',
			'Athletics',
			'Insight',
			'Investigation',
			'Nature',
			'Perception',
			'Stealth',
			'Survival'
		],
		numberOfStartingSkills: 3
	},
	Rogue: {
		name: 'Rogue',
		savingThrows: ['dexterity', 'intelligence'],
		featureList: {
			1: ['Expertise', 'Sneak Attack (1d6)', "Thieves' Cant"],
			2: ['Cunning Action'],
			3: ['Roguish Archetype'],
			4: ['Ability Score Improvement'],
			5: ['Uncanny Dodge'],
			6: ['Expertise'],
			7: ['Evasion'],
			8: ['Ability Score Improvement'],
			9: ['Roguish Archetype feature'],
			10: ['Ability Score Improvement'],
			11: ['Reliable Talent'],
			12: ['Ability Score Improvement'],
			13: ['Roguish Archetype feature'],
			14: ['Blindsense'],
			15: ['Slippery Mind'],
			16: ['Ability Score Improvement'],
			17: ['Roguish Archetype feature'],
			18: ['Elusive'],
			19: ['Ability Score Improvement'],
			20: ['Stroke of Luck']
		},
		possibleStartingSkills: [
			'Acrobatics',
			'Athletics',
			'Deception',
			'Insight',
			'Intimidation',
			'Investigation',
			'Perception',
			'Performance',
			'Persuasion',
			'Sleight of Hand',
			'Stealth'
		],
		numberOfStartingSkills: 4
	},
	Sorcerer: {
		name: 'Sorcerer',
		savingThrows: ['constitution', 'charisma'],
		featureList: {
			1: ['Spellcasting', 'Sorcerous Origin'],
			2: ['Font of Magic'],
			3: ['Metamagic'],
			4: ['Ability Score Improvement'],
			6: ['Sorcerous Origin feature'],
			8: ['Ability Score Improvement'],
			10: ['Metamagic Improvement'],
			12: ['Ability Score Improvement'],
			14: ['Sorcerous Origin feature'],
			16: ['Ability Score Improvement'],
			17: ['Metamagic Improvement'],
			18: ['Sorcerous Origin feature'],
			19: ['Ability Score Improvement'],
			20: ['Sorcerous Restoration']
		},
		possibleStartingSkills: [
			'Arcana',
			'Deception',
			'Insight',
			'Intimidation',
			'Persuasion',
			'Religion'
		],
		numberOfStartingSkills: 2
	},
	Warlock: {
		name: 'Warlock',
		savingThrows: ['wisdom', 'charisma'],
		featureList: {
			1: ['Otherworldly Patron', 'Pact Magic'],
			2: ['Eldritch Invocations'],
			3: ['Pact Boon'],
			4: ['Ability Score Improvement'],
			6: ['Otherworldly Patron feature'],
			8: ['Ability Score Improvement'],
			10: ['Otherworldly Patron feature'],
			11: ['Mystic Arcanum (6th level)'],
			12: ['Ability Score Improvement'],
			14: ['Mystic Arcanum (7th level)'],
			15: ['Mystic Arcanum (8th level)'],
			16: ['Ability Score Improvement'],
			17: ['Mystic Arcanum (9th level)'],
			19: ['Ability Score Improvement'],
			20: ['Eldritch Master']
		},
		possibleStartingSkills: [
			'Arcana',
			'Deception',
			'History',
			'Intimidation',
			'Investigation',
			'Nature',
			'Religion'
		],
		numberOfStartingSkills: 2
	},
	Wizard: {
		name: 'Wizard',
		savingThrows: ['intelligence', 'wisdom'],
		featureList: {
			1: ['Spellcasting', 'Arcane Recovery'],
			2: ['Arcane Tradition'],
			4: ['Ability Score Improvement'],
			6: ['Arcane Tradition feature'],
			8: ['Ability Score Improvement'],
			10: ['Arcane Tradition feature'],
			12: ['Ability Score Improvement'],
			14: ['Arcane Tradition feature'],
			16: ['Ability Score Improvement'],
			18: ['Spell Mastery'],
			19: ['Ability Score Improvement'],
			20: ['Signature Spells']
		},
		possibleStartingSkills: [
			'Arcana',
			'History',
			'Insight',
			'Investigation',
			'Medicine',
			'Religion'
		],
		numberOfStartingSkills: 2
	}
};
