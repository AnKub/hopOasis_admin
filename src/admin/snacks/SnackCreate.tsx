import {
    Create,
    ImageField,
    ImageInput,
    TabbedForm,
    TextInput,
    required,
    CreateProps,
} from "react-admin";
import OptionsField from "../OptionsField/OptionFields";
import { SnackParams } from "../../types";

export const SnackCreate = (props: CreateProps) => (
    <Create<SnackParams> {...props} className="list-common">
        <TabbedForm className="list-common">
            <TabbedForm.Tab label="Information" className="list-common">
                <TextInput source="snackName" label="Name" validate={[required()]} className="list-common" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Price and Weight" className="list-common">
                <OptionsField
                    optionsSource="options"
                    fields={[
                        { key: 'price', label: 'Price' },
                        { key: 'weight', label: 'Weight' },
                        { key: 'quantity', label: 'Quantity' },
                    ]}
                />
            </TabbedForm.Tab>
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
            <TabbedForm.Tab label="Images" className="list-common">
                <ImageInput
                    source="snackImageName"
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
export default SnackCreate;