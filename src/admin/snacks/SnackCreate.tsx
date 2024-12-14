import {
    Create,
    ImageField,
    ImageInput,
    TabbedForm,
    NumberInput,
    TextInput,
    required,
    CreateProps,
} from "react-admin";
import { SnackParams } from "../../types";

export const SnackCreate = (props: CreateProps) => (
    <Create<SnackParams> {...props} className="list-common">
        <TabbedForm className="list-common">
            <TabbedForm.Tab label="Information" className="list-common">
                <TextInput source="snackName" label="Name" validate={[required()]} className="list-common" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Price and Weight" className="list-common">
                <NumberInput source="options[0]?.price" label="Price Option 1" validate={[required()]} className="list-common" />
                <NumberInput source="options[0]?.weight" label="Weight Option 1" validate={[required()]} className="list-common" />
                <NumberInput source="options[1]?.price" label="Price Option 2" validate={[required()]} className="list-common" />
                <NumberInput source="options[1]?.weight" label="Weight Option 2" validate={[required()]} className="list-common" />
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
