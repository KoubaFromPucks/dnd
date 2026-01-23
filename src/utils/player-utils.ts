export const carryWeightMultiplier = 15;

export const getMaximalCarryWeight = (strength: number): number => {
    return strength * carryWeightMultiplier;
};