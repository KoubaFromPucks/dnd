import { Character } from '@/schema/character';
import { CLASSES } from '@/schema/character-class';
import { RACES } from '@/schema/character-race';
import {
	zephyrInventory,
	ragnarInventory,
	elaraInventory
} from '@/test-data/inventory-data';

export const defaultCharacters: Character[] = [
	{
		id: '9a168237-2bbd-4163-8a08-2b7e6344aecd',
		characterName: 'Ragnar Železný',
		characterBackground:
			'Veterán z hlubokých dolů, který hledá ztracenou slávu svého klanu.',
		pictureUrl:
			'https://i.pinimg.com/originals/61/c7/a4/61c7a4c96b677f718ec058585b8d6217.png',
		level: 1,
		proficiencyBonus: 2,
		ac: 16,
		maxCarryWeight: 150,
		currentGold: 10,
		alignment: 'Lawful Neutral',

		raceName: 'Dwarf',
		speed: RACES.Dwarf.speed,
		darkvision: RACES.Dwarf.darkvision,
		traits: RACES.Dwarf.traits,
		languages: RACES.Dwarf.languages,

		className: 'Fighter',
		savingThrows: CLASSES.Fighter.savingThrows,
		features: CLASSES.Fighter.featureList[1],
		stats: {
			strength: 15,
			dexterity: 13,
			constitution: 16,
			intelligence: 8,
			wisdom: 12,
			charisma: 10
		},
		hp: { current: 13, max: 13 },
		inventory: ragnarInventory,
		proficiencySkills: ['Athletics', 'Intimidation'],
		conditions: []
	},
	{
		id: '9159fb43-a69c-4f8f-8ccc-77e0fa33357d',
		characterName: 'Elara Stínová',
		characterBackground:
			'Uprchlá šlechtična, která se naučila přežít v temných uličkách města.',
		pictureUrl:
			'https://cdnb.artstation.com/p/assets/images/images/005/363/037/large/joseph-gai-rogue-elf.jpg?1490513259',
		level: 1,
		proficiencyBonus: 2,
		ac: 14,
		maxCarryWeight: 120,
		currentGold: 15,
		alignment: 'Chaotic Good',
		raceName: 'Elf',
		speed: RACES.Elf.speed,
		darkvision: RACES.Elf.darkvision,
		traits: RACES.Elf.traits,
		languages: RACES.Elf.languages,
		className: 'Rogue',
		savingThrows: CLASSES.Rogue.savingThrows,
		features: CLASSES.Rogue.featureList[1],
		stats: {
			strength: 10,
			dexterity: 17,
			constitution: 13,
			intelligence: 14,
			wisdom: 12,
			charisma: 8
		},
		hp: { current: 9, max: 9 },
		inventory: elaraInventory,
		proficiencySkills: ['Stealth', 'Acrobatics', 'Sleight of Hand'],
		conditions: []
	},
	{
		id: '4a29b441-09b5-4b7f-89ff-f668f2488df9',
		characterName: 'Zephyr Moudrý',
		characterBackground:
			'Učenec z daleké věže, který věří, že vědění je mocnější než meč.',
		pictureUrl:
			'https://i.etsystatic.com/35690042/r/il/421c43/5680294056/il_570xN.5680294056_235e.jpg',
		level: 1,
		proficiencyBonus: 2,
		ac: 12,
		maxCarryWeight: 100,
		currentGold: 5,
		alignment: 'Neutral Good',
		raceName: 'Human',
		speed: RACES.Human.speed,
		darkvision: RACES.Human.darkvision,
		traits: RACES.Human.traits,
		languages: RACES.Human.languages,
		className: 'Wizard',
		savingThrows: CLASSES.Wizard.savingThrows,
		features: CLASSES.Wizard.featureList[1],
		stats: {
			strength: 9,
			dexterity: 14,
			constitution: 13,
			intelligence: 16,
			wisdom: 15,
			charisma: 11
		},
		hp: { current: 7, max: 7 },
		inventory: zephyrInventory,
		proficiencySkills: ['Arcana', 'History'],
		conditions: []
	}
];
