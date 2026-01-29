import React, { forwardRef, useImperativeHandle } from 'react';
import {
	Item,
	ItemCreateUpdateInput,
	ItemSchema,
	POSSIBLE_RARITIES
} from '@/schema/item';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormSelect } from '@/components/form';
import { POSSIBLE_ITEM_TYPES, POSSIBLE_USE_TYPES } from '@/schema/item';
import { stringArrayToSelectOptions } from '@/lib/utils';
import { Accordion } from '../../accordion';
import { FormTextarea } from '@/components/form/form-textarea';
import { AccordionSection } from '@/components/ui/accordion-section';
import { ARRAY_STRING_SEPARATOR } from '@/schema/string-to-array-schema';
import { FormCheckbox } from '@/components/form/form-checkbox';

export type CreateUpdateItemDialogHandle = {
	submit: () => void;
};

type CreateUpdateItemFormProps = {
	itemToUpdate?: Item;
	onSuccess?: (item: Item) => void;
	onError?: (error: FieldErrors<ItemCreateUpdateInput>) => void;
};

const prepareDataForForm = (
	item: Item | undefined
): ItemCreateUpdateInput | undefined => {
	if (!item) return undefined;

	return {
		...item,
		passiveEffects: Array.isArray(item.passiveEffects)
			? item.passiveEffects.join(ARRAY_STRING_SEPARATOR)
			: item.passiveEffects,
		activeEffectDescription: Array.isArray(item.activeEffectDescription)
			? item.activeEffectDescription.join(ARRAY_STRING_SEPARATOR)
			: item.activeEffectDescription
	} as ItemCreateUpdateInput;
};

export const CreateUpdateItemForm = forwardRef<
	CreateUpdateItemDialogHandle,
	CreateUpdateItemFormProps
>(({ itemToUpdate, onSuccess, onError }, ref) => {
	const form = useForm<ItemCreateUpdateInput, Item>({
		resolver: zodResolver(ItemSchema),
		defaultValues: prepareDataForForm(itemToUpdate) || {
			name: '',
			itemType: 'other',
			useType: 'consumable',
			description: '',
			weight: 0,
			equipped: false,
			cost: 0,
			quantity: 1,
			passiveEffects: '',
			activeEffectDescription: '',
			rarity: 'common',
			armorClassBonus: 0,
			statsBonuses: {
				strength: 0,
				dexterity: 0,
				constitution: 0,
				intelligence: 0,
				wisdom: 0,
				charisma: 0
			}
		}
	});

	const { handleSubmit } = form;

	useImperativeHandle(ref, () => ({
		submit: () => {
			handleSubmit(
				(data: ItemCreateUpdateInput) => {
					onSuccess?.(data as unknown as Item);
				},
				error => {
					onError?.(error);
				}
			)();
		}
	}));

	return (
		<FormProvider {...form}>
			<form id="create-update-item-form" onSubmit={handleSubmit(() => {})}>
				<div className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[65vh] space-y-4 overflow-y-auto px-4 py-2">
					<Accordion
						type="multiple"
						defaultValue={['base-info']}
						className="w-full"
					>
						<AccordionSection title="Base Info">
							<FormInput name="name" label="Item Name" placeholder="Anduril" />
							<FormSelect
								name="itemType"
								label="Item Type"
								options={stringArrayToSelectOptions([...POSSIBLE_ITEM_TYPES])}
							/>
							<FormSelect
								name="rarity"
								label="Rarity"
								options={stringArrayToSelectOptions([...POSSIBLE_RARITIES])}
							/>
							<FormSelect
								name="useType"
								label="Use Type"
								options={stringArrayToSelectOptions([...POSSIBLE_USE_TYPES])}
							/>
							<FormInput
								name="description"
								label="Description"
								type="text"
								placeholder="A legendary sword reforged from the shards of Narsil."
							/>
							<FormInput name="quantity" label="Quantity" type="number" />
							<FormCheckbox name="equipped" label="Equipped" />
						</AccordionSection>

						<AccordionSection title="Properties">
							<FormInput name="weight" label="Weight" type="number" />
							<FormInput name="cost" label="Cost (in gold)" type="number" />
							<FormInput
								name="armorClassBonus"
								label="Armor Class Bonus"
								type="number"
							/>
						</AccordionSection>

						<AccordionSection title="Stats Bonuses">
							<FormInput
								name="statsBonuses.strength"
								label="Strength Bonus"
								type="number"
							/>
							<FormInput
								name="statsBonuses.dexterity"
								label="Dexterity Bonus"
								type="number"
							/>
							<FormInput
								name="statsBonuses.constitution"
								label="Constitution Bonus"
								type="number"
							/>
							<FormInput
								name="statsBonuses.intelligence"
								label="Intelligence Bonus"
								type="number"
							/>
							<FormInput
								name="statsBonuses.wisdom"
								label="Wisdom Bonus"
								type="number"
							/>
							<FormInput
								name="statsBonuses.charisma"
								label="Charisma Bonus"
								type="number"
							/>
						</AccordionSection>

						<AccordionSection title="Active and Passive Effects">
							<FormTextarea
								name="passiveEffects"
								label="Passive Effects - Each on separate line"
								placeholder="Enter passive effects"
							/>
							<FormTextarea
								name="activeEffectDescription"
								label="Active Effects - Each on separate line"
								placeholder="Enter active effects"
							/>
						</AccordionSection>
					</Accordion>
				</div>
			</form>
		</FormProvider>
	);
});

CreateUpdateItemForm.displayName = 'CreateUpdateItemForm';
