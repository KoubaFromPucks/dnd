import { Stats } from "./stats";

export type RaceEnum = 'Human' | 'Elf' | 'Dwarf' | 'Halfling';

export type Race = {
    name: RaceEnum;
    abilityScoreBonuses: Stats;
    speed: number;
    darkvision: number;
    features: string[];
};

export type DwarfRace = Race & {
    name: 'Dwarf';
    abilityScoreBonuses: {constitution: 2};
    speed: 25;
    darkvision: 60;
    features: ['Dwarven Resilience', 'Stonecunning', 'Dwarven Combat Training'];
};

export type ElfRace = Race & {
    name: 'Elf';
    abilityScoreBonuses: { dexterity: 2 };
    speed: 30;
    darkvision: 60;
    features: ['Keen Senses', 'Fey Ancestry', 'Trance'];
};

export type HalflingRace = Race & {
    name: 'Halfling';
    abilityScoreBonuses: { dexterity: 2 };
    speed: 25;
    darkvision: 0;
    features: ['Lucky', 'Brave', 'Halfling Nimbleness'];
};

export type HumanRace = Race & {
    name: 'Human';
    abilityScoreBonuses: { strength: 1; dexterity: 1; constitution: 1; intelligence: 1; wisdom: 1; charisma: 1 };
    speed: 30;
    darkvision: 0;
    features: ['Extra Language'];
};