import { Character } from '@/schema/character';

export const defaultCharactes: Character[] = [
	{
		pictureUrl:
			'https://i.pinimg.com/originals/61/c7/a4/61c7a4c96b677f718ec058585b8d6217.png',
		characterName: 'Ragnar Železný',
		playerName: 'Honza',
		level: 1,
		xp: 0,
		proficiencyBonus: 2,
		currentGold: 10,
		alignment: 'Lawful Neutral',
		race: {
			name: 'Dwarf',
			abilityScoreBonuses: { constitution: 2 },
			speed: 25,
			darkvision: 60,
			features: [
				'Dwarven Resilience',
				'Stonecunning',
				'Dwarven Combat Training'
			]
		},
		class: {
			name: 'Fighter',
			hitDie: { throwsCount: 1, diceSides: 10, bonusMode: 0 },
			savingThrows: ['strength', 'constitution'],
			featureList: ['Second Wind', 'Action Surge', 'Martial Archetype']
		},
		stats: {
			strength: 15,
			dexterity: 13,
			constitution: 16, // 14 základ + 2 rasový bonus
			intelligence: 8,
			wisdom: 12,
			charisma: 10
		},
		hp: { current: 13, max: 13 }, // 10 (base) + 3 (con mod)
		inventory: [],
		skills: ['Athletics', 'Intimidation'],
		features: ['Dwarven Resilience', 'Second Wind'],
		conditions: []
	},
	{
		pictureUrl:
			'https://cdnb.artstation.com/p/assets/images/images/005/363/037/large/joseph-gai-rogue-elf.jpg?1490513259',
		characterName: 'Elara Stínová',
		playerName: 'Lucka',
		level: 1,
		xp: 0,
		proficiencyBonus: 2,
		currentGold: 15,
		alignment: 'Chaotic Good',
		race: {
			name: 'Elf',
			abilityScoreBonuses: { dexterity: 2 },
			speed: 30,
			darkvision: 60,
			features: ['Keen Senses', 'Fey Ancestry', 'Trance']
		},
		class: {
			name: 'Rogue',
			hitDie: { throwsCount: 1, diceSides: 8, bonusMode: 0 },
			savingThrows: ['dexterity', 'intelligence'],
			featureList: ['Sneak Attack', 'Cunning Action']
		},
		stats: {
			strength: 10,
			dexterity: 17, // 15 základ + 2 rasový bonus
			constitution: 13,
			intelligence: 14,
			wisdom: 12,
			charisma: 8
		},
		hp: { current: 9, max: 9 }, // 8 (base) + 1 (con mod)
		inventory: [],
		skills: ['Stealth', 'Acrobatics', 'Sleight of Hand'],
		features: ['Keen Senses', 'Sneak Attack (1d6)'],
		conditions: []
	},
	{
		pictureUrl:
			'https://i.etsystatic.com/35690042/r/il/421c43/5680294056/il_570xN.5680294056_235e.jpg',
		characterName: 'Zephyr Moudrý',
		playerName: 'Petr',
		level: 1,
		xp: 0,
		proficiencyBonus: 2,
		currentGold: 5,
		alignment: 'Neutral Good',
		race: {
			name: 'Human',
			abilityScoreBonuses: {
				strength: 1,
				dexterity: 1,
				constitution: 1,
				intelligence: 1,
				wisdom: 1,
				charisma: 1
			},
			speed: 30,
			darkvision: 0,
			features: ['Extra Language']
		},
		class: {
			name: 'Wizard',
			hitDie: { throwsCount: 1, diceSides: 6, bonusMode: 0 },
			savingThrows: ['intelligence', 'wisdom'],
			featureList: [
				'Arcane Recovery',
				'Spellcasting',
				'Arcane Tradition',
				'Spell book'
			]
		},
		stats: {
			strength: 9, // 8 + 1
			dexterity: 14, // 13 + 1
			constitution: 13, // 12 + 1
			intelligence: 16, // 15 + 1
			wisdom: 15, // 14 + 1
			charisma: 11 // 10 + 1
		},
		hp: { current: 7, max: 7 }, // 6 (base) + 1 (con mod)
		inventory: [],
		skills: ['Arcana', 'History'],
		features: ['Arcane Recovery'],
		conditions: []
	}
];