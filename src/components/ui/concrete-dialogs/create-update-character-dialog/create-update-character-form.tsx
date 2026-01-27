import React from "react";
import { Character, CharacterCreateUpdateSchema } from "@/schema/character";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, FormSelect } from "@/components/form";
import { POSSIBLE_RACES, RACES } from "@/schema/character-race";
import { POSSIBLE_CLASSES } from "@/schema/character-class";
type CreateUpdateCharacterFormProps = {
    characterToUpdate?: Character;
};

// TODO edit
export const CreateUpdateCharacterForm = ({ characterToUpdate }: CreateUpdateCharacterFormProps) => {
    const form = useForm<Character>({
        resolver: zodResolver(CharacterCreateUpdateSchema),
        defaultValues: characterToUpdate || {
            characterName: '',
            characterBackground: '',
            level: 1,
            stats: {
                strength: 1,
                dexterity: 1,
                constitution: 1,
                intelligence: 1,
                wisdom: 1,
                charisma: 1
            },
            hp: { current: 1, max: 1 },
            inventory: [],
            currentGold: 0,
            conditions: [],
            proficiencyBonus: 0,
            raceName: 'Human',
            speed: 30,
            darkvision: 0,
            traits: [],
            languages: [],
            className: 'Fighter',
            savingThrows: [],
            features: [],
            proficiencySkills: []
        }
    });

    return (
    <FormProvider {...form}>
        <form id="create-update-character-form" onSubmit={form.handleSubmit((data) => {
            console.log('Form submitted:', data);
        })}>
            <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-4 py-2 scrollbar-thin scrollbar-thumb-amber-600/50">
            <FormInput name="characterName" label="Character Name" placeholder="Elessar I" />
            <FormInput name="characterBackground" label="Character Background" placeholder="Noble from Gondor" />
            <FormInput name="level" label="Level" type="number" />
            <FormInput name="hp.max" label="Max HP" type="number" />
            <FormInput name="currentGold" label="Current Gold" type="number" />
            <FormInput name="proficiencyBonus" label="Proficiency Bonus" type="number" />
            <FormSelect name="raceName" label="Race Name">
                <SelectOptions options={POSSIBLE_RACES.map(race => race)} />
            </FormSelect>

            <FormSelect name="className" label="Class Name">
                <SelectOptions options={POSSIBLE_CLASSES.map(cls => cls)} />
            </FormSelect>

            {/* TODO LABEL - stats*/}
            <FormInput name="stats.strength" label="Strength" type="number" />
            <FormInput name="stats.dexterity" label="Dexterity" type="number" />
            <FormInput name="stats.constitution" label="Constitution" type="number" />
            <FormInput name="stats.intelligence" label="Intelligence" type="number" />
            <FormInput name="stats.wisdom" label="Wisdom" type="number" />
            <FormInput name="stats.charisma" label="Charisma" type="number" />
            <FormInput name="currentGold" label="Current Gold" type="number" />
            
            
            </div>
        </form>
    </FormProvider>
        );
};

const SelectOptions = ({ options }: { options: string[] }) => {
    return options.map((option) => (
        <option key={option} value={option}>{option}</option>
    ));
}