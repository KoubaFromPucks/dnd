import { Character } from '@/schema/character';

export const carryWeightMultiplier = 15;

export const getMaximalCarryWeight = (character?: Character): number => {
	if (!character) {
		return 0;
	}

	return character.stats.strength * carryWeightMultiplier;
};

export const getCurrentCarryWeight = (character?: Character): number => {
	if (!character) {
		return 0;
	}

	return character.inventory.reduce(
		(total, item) => total + item.weight * item.quantity,
		0
	);
};

export const getAC = (character?: Character): number => {
	if (!character) {
		return -1;
	}

	const armor = character.inventory.find(
		item => item.itemType.includes('armor') && item.equipped
	);
	const shield = character.inventory.find(
		item => item.itemType === 'shield' && item.equipped
	);
	const shieldBonus = shield ? (shield.armorClassBonus ?? 0) : 0;
	const dexModifier = Math.floor((character.stats.dexterity - 10) / 2);
	const baseAC = 10;

	if (!armor && !shield) {
		return baseAC + dexModifier;
	}

	if (!armor && shield) {
		return baseAC + dexModifier + shieldBonus;
	}

	if (armor && armor.itemType === 'heavy armor') {
		return baseAC + (armor.armorClassBonus ?? 0) + shieldBonus;
	}

	if (armor && armor.itemType === 'light armor') {
		return baseAC + dexModifier + (armor.armorClassBonus ?? 0) + shieldBonus;
	}

	if (armor && armor.itemType === 'medium armor') {
		return (
			baseAC +
			Math.min(dexModifier, 2) +
			(armor.armorClassBonus ?? 0) +
			shieldBonus
		);
	}

	return -1;
};
