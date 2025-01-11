import {
    Create,
    TabbedForm,
    TextInput,
    NumberInput,
    ImageInput,
    ImageField,
    required,
    CreateProps,
} from 'react-admin';
import OptionsField from '../OptionsField/OptionFields';
import { BeerParams } from '../../types';

/**
 * BeerCreate Component
 * Form for creating a new beer entry
 */
export const BeerCreate = (props: CreateProps) => (
    <Create<BeerParams> {...props} className="list-common">
        <TabbedForm className="list-common">
            {/* Information Tab */}
            <TabbedForm.Tab label="Information" className="list-common">
                <TextInput source="beerName" label="Name" validate={[required()]} className="list-common" />
                <NumberInput source="abv" label="ABV (%)" validate={[required()]} step={0.1} className="list-common" />
            </TabbedForm.Tab>

            {/* Price and Volume Tab */}
            <TabbedForm.Tab label="Price and Volume" className="list-common">
                <OptionsField
                    optionsSource="options"
                    fields={[
                        { key: 'id', label: 'ID' },
                        { key: 'price', label: 'Price' },
                        { key: 'volume', label: 'Volume (ml)' },
                        { key: 'quantity', label: 'Quantity' },
                    ]}
                />
            </TabbedForm.Tab>

            {/* Description Tab */}
            <TabbedForm.Tab label="Description" className="list-common">
                <TextInput
                    source="description"
                    variant="outlined"
                    multiline
                    fullWidth
                    validate={[required()]}
                    className="list-common"
                />
            </TabbedForm.Tab>

            {/* Images Tab */}
            <TabbedForm.Tab label="Images" className="list-common">
                <ImageInput
                    source="beerImageName"
                    accept="image/*"
                    validate={[required()]}
                    multiple
                    className="list-common"
                >
                    <ImageField source="src" title="name" className="list-common" />
                </ImageInput>
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
);

export default BeerCreate;