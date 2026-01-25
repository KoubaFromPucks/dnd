import { Stats } from './stats';
import { ThrowParams } from './throw-params';

export type Item = {
	name: string;
	itemType:
		| 'melee weapon'
		| 'ranged weapon'
		| 'light armor'
		| 'medium armor'
		| 'heavy armor'
		| 'consumable'
		| 'other'
		| 'shield';
	useType: 'equippable' | 'consumable';

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
