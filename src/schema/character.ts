import { type Stats } from './stats';
import {type Item} from './item';
import { Race } from './race';
import { CharacterClass } from './character-class';

export type Character = {
    characterName: string;
    playerName: string;
    race: Race;
    class: CharacterClass;
    level: number;
    stats: Required<Stats>;
    hp: {current: number; max: number};
    inventory: Item[];
    currentGold: number;
    skills: string[]; // for example: ["Stealth", "Athletics"]
    features: string[]; // for example: ["Action Surge", "Darkvision"]
    alignment?: string;    // "Lawful Good", and so on... (can help AI's roleplaying)
    xp: number; // experience points
    conditions: string[]; // e.g., ["Poisoned", "Stunned"]
    proficiencyBonus: number;
};