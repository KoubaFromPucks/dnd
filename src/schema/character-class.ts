import { ThrowParams } from "./throw-params";
import { Stats } from "./stats";

export type className = 'Fighter' | 'Rogue' | 'Cleric' | 'Wizard';

export type CharacterClass = {
    name: className;
    hitDie: ThrowParams;
    savingThrows: (keyof Stats)[];
    featureList: string[];
};

export type FighterClass = CharacterClass & {
    name: 'Fighter';
    hitDie: { throwsCount: 1; diceSides: 10 };
    savingThrows: ['strength', 'constitution'];
    featureList: ['Second Wind', 'Action Surge', 'Martial Archetype'];
};

export type RogueClass = CharacterClass & {
    name: 'Rogue';
    hitDie: { throwsCount: 1; diceSides: 8 };
    savingThrows: ['dexterity', 'intelligence'];
    featureList: ['Sneak Attack', 'Cunning Action'];
};

export type ClericClass = CharacterClass & {
    name: 'Cleric';
    hitDie: { throwsCount: 1; diceSides: 8 };
    savingThrows: ['wisdom', 'charisma'];
    featureList: ['Divine Domain', 'Channel Divinity', 'Spellcasting', 'Disciple of Life'];
};

export type WizardClass = CharacterClass & {
    name: 'Wizard';
    hitDie: { throwsCount: 1; diceSides: 6 };
    savingThrows: ['intelligence', 'wisdom'];
    featureList: ['Arcane Recovery', 'Spellcasting', 'Arcane Tradition', 'Spell book'];
};