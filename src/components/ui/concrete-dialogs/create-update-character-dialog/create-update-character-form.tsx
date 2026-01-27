import React, { useEffect } from 'react';
import {
	arrayToString,
	Character,
	CharacterCreateUpdateInput,
	CharacterCreateUpdateSchema
} from '@/schema/character';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormSelect } from '@/components/form';
import { POSSIBLE_RACES, RACES } from '@/schema/character-race';
import { CLASSES, POSSIBLE_CLASSES } from '@/schema/character-class';
import { stringArrayToSelectOptions } from '@/lib/utils';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '../../accordion';
import { FormTextarea } from '@/components/form/form-textarea';
import { POSSIBLE_STATS } from '@/schema/stats';
import { POSSIBLE_SKILLS } from '@/schema/skill';
import { forwardRef, useImperativeHandle } from 'react';
import { getAC, getMaximalCarryWeight } from '@/utils/character-utils';
import { ARRAY_STRING_SEPARATOR } from '@/schema/character';

export type CreateUpdateCharacterDialogHandle = {
	submit: () => void;
};

type CreateUpdateCharacterFormProps = {
	characterToUpdate?: Character;
	onSuccess?: (character: Character) => void;
	onError?: (error: FieldErrors<CharacterCreateUpdateInput>) => void;
};

const prepareDataForForm = (
	character: Character | undefined
): CharacterCreateUpdateInput | undefined => {
	if (!character) return undefined;

	return {
		...character,
		conditions: character.conditions?.join(ARRAY_STRING_SEPARATOR) ?? '',
		traits: character.traits?.join(ARRAY_STRING_SEPARATOR) ?? '',
		languages: character.languages?.join(ARRAY_STRING_SEPARATOR) ?? '',
		features: character.features?.join(ARRAY_STRING_SEPARATOR) ?? ''
	} as CharacterCreateUpdateInput;
};

// TODO inputy nejsou vidět celý
export const CreateUpdateCharacterForm = forwardRef<
	CreateUpdateCharacterDialogHandle,
	CreateUpdateCharacterFormProps
>(({ characterToUpdate, onSuccess, onError }, ref) => {
	const form = useForm<CharacterCreateUpdateInput>({
		resolver: zodResolver(CharacterCreateUpdateSchema),
		defaultValues: prepareDataForForm(characterToUpdate) || {
			id: crypto.randomUUID(),
			characterName: '',
			pictureUrl: '',
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
			inventory: [],
			hp: { current: 1, max: 1 },
			ac: 0,
			maxCarryWeight: 0,
			currentGold: 0,
			conditions: '',
			proficiencyBonus: 0,
			raceName: 'Human',
			speed: 30,
			darkvision: 0,
			traits: '',
			languages: '',
			className: 'Fighter',
			savingThrows: [],
			features: '',
			proficiencySkills: []
		}
	});

	const { watch, setValue, handleSubmit } = form;
	const selectedRace = watch('raceName');
	const selectedClass = watch('className');
	const isCreateMode = !characterToUpdate;
	const selectedStrength = watch('stats.strength');
	const selectedDexterity = watch('stats.dexterity');

	useImperativeHandle(ref, () => ({
		submit: () => {
			handleSubmit(
				(data: CharacterCreateUpdateInput) => {
					console.log('Form submission data:', data);
					onSuccess?.(data as unknown as Character);
				},
				error => {
					console.log('Form submission error:', error);
					onError?.(error);
				}
			)();
		}
	}));

	if (isCreateMode) {
		useEffect(() => {
			const raceData = RACES[selectedRace];
			if (raceData) {
				setValue('speed', raceData.speed);
				setValue('darkvision', raceData.darkvision);
				setValue('traits', arrayToString(raceData.traits));
				setValue('languages', arrayToString(raceData.languages));
			}
		}, [selectedRace, setValue]);

		useEffect(() => {
			const classData = CLASSES[selectedClass];
			if (classData) {
				setValue('savingThrows', classData.savingThrows);
				setValue('features', arrayToString(classData.featureList[1] || []));
				setValue(
					'proficiencySkills',
					classData.possibleStartingSkills.slice(
						0,
						classData.numberOfStartingSkills
					)
				);
			}
		}, [selectedClass, setValue]);

		useEffect(() => {
			setValue(
				'maxCarryWeight',
				getMaximalCarryWeight({
					stats: { strength: selectedStrength }
				} as Character)
			);
		}, [selectedStrength, setValue]);

		useEffect(() => {
			setValue(
				'ac',
				getAC({
					stats: { dexterity: selectedDexterity },
					inventory: []
				} as unknown as Character)
			);
		}, [selectedDexterity, setValue]);
	}

	return (
		<FormProvider {...form}>
			<form id="create-update-character-form" onSubmit={handleSubmit(() => {})}>
				<div className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[65vh] space-y-4 overflow-y-auto py-2 pr-4">
					<Accordion
						type="multiple"
						defaultValue={['base-info']}
						className="w-full"
					>
						<AccordionSection title="Base Info">
							<FormInput
								name="characterName"
								label="Character Name"
								placeholder="Elessar I"
							/>
							<FormSelect
								name="raceName"
								label="Race Name"
								options={stringArrayToSelectOptions(
									POSSIBLE_RACES.map(race => race)
								)}
							/>

							<FormSelect
								name="className"
								label="Class Name"
								options={stringArrayToSelectOptions(
									POSSIBLE_CLASSES.map(cls => cls)
								)}
							/>
							<FormInput
								name="pictureUrl"
								label="Picture URL"
								type="text"
								placeholder="https://some-image-url.com/image.png"
							/>
							<FormInput
								name="characterBackground"
								label="Character Background"
								placeholder="Noble from Gondor"
							/>

							<FormInput
								name="alignment"
								label="Alignment"
								placeholder="Lawful Good"
							/>
						</AccordionSection>

						<AccordionSection title="Stats">
							<FormInput name="stats.strength" label="Strength" type="number" />
							<FormInput
								name="stats.dexterity"
								label="Dexterity"
								type="number"
							/>
							<FormInput
								name="stats.constitution"
								label="Constitution"
								type="number"
							/>
							<FormInput
								name="stats.intelligence"
								label="Intelligence"
								type="number"
							/>
							<FormInput name="stats.wisdom" label="Wisdom" type="number" />
							<FormInput name="stats.charisma" label="Charisma" type="number" />
						</AccordionSection>

						<AccordionSection title="Current State">
							<FormInput name="level" label="Level" type="number" />
							<FormInput name="hp.max" label="Max HP" type="number" />
							{characterToUpdate && (
								<FormInput name="hp.current" label="Current HP" type="number" />
							)}
							<FormInput
								name="currentGold"
								label="Current Gold"
								type="number"
							/>
							<FormInput
								name="proficiencyBonus"
								label="Proficiency Bonus"
								type="number"
							/>
							<FormInput name="ac" label="Armor Class (AC)" type="number" />
							<FormInput
								name="maxCarryWeight"
								label="Max Carry Weight"
								type="number"
							/>
							<FormTextarea
								name="conditions"
								label="Conditions - Each on separate line"
								placeholder="Enter any conditions affecting the character"
							/>
						</AccordionSection>

						<AccordionSection title="Race Attributes">
							<FormInput name="speed" label="Speed" type="number" />
							<FormInput name="darkvision" label="Darkvision" type="number" />
							<FormTextarea
								name="languages"
								label="Languages - Each on separate line"
								placeholder="Enter known languages"
							/>
							<FormTextarea
								name="traits"
								label="Traits - Each on separate line"
								placeholder="Enter character traits"
							/>
						</AccordionSection>
						<AccordionSection title="Class bonuses">
							<FormSelect
								name="savingThrows"
								label="Saving Throws"
								placeholder="Enter saving throw proficiencies"
								options={stringArrayToSelectOptions(
									POSSIBLE_STATS.map(stat => stat)
								)}
								isMulti
							/>
							<FormSelect
								name="proficiencySkills"
								label="Proficiency Skills"
								placeholder="Enter any proficiency skills"
								options={stringArrayToSelectOptions(
									POSSIBLE_SKILLS.map(skill => skill)
								)}
								isMulti
							/>

							<FormTextarea
								name="features"
								label="Features - Each on separate line"
								placeholder="Enter character features"
							/>
						</AccordionSection>
					</Accordion>
				</div>
			</form>
		</FormProvider>
	);
});

CreateUpdateCharacterForm.displayName = 'CreateUpdateCharacterForm';

const AccordionSection = ({
	title,
	children
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<AccordionItem
		value={title.toLowerCase().replace(/\s+/g, '-')}
		className="border-border"
	>
		<AccordionTrigger className="text-primary font-bold tracking-wider uppercase hover:no-underline">
			{title}
		</AccordionTrigger>
		<AccordionContent className="space-y-4 pt-2">{children}</AccordionContent>
	</AccordionItem>
);
