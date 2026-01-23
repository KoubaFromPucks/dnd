import { Stats } from "./stats";
import { ThrowParams } from "./throw-params";

export type Item = {
    name: string;
    itemType: 'weapon' | 'armor' | 'consumable' | 'other';
    useType: 'equippable' | 'consumable';
    range?: 'melee' | 'ranged';

    description: string;
    weight: number;
    equipped: boolean;
    cost: number;
    quantity: number;
    passiveEffects: Stats;
    activeEffectDescription: string;
    effectDuration: number;

    rarity: 'common' | 'uncommon' | 'rare' | 'very rare' | 'legendary';
    damage?: ThrowParams;
    armorClassBonus?: number;
};