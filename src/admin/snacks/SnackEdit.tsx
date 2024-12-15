import {
    Edit,
    NumberInput,
    TabbedForm,
    TextInput,
    EditProps,
} from "react-admin";

export const SnackEdit = (props: EditProps) => (
    <Edit {...props} className="list-common">
        <TabbedForm className="list-common">
            <TabbedForm.Tab label="Information" className="list-common">
                <TextInput source="snackName" label="Name" variant="outlined" size="medium" className="list-common" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Price and Weight" className="list-common">
                <NumberInput source="options[0]?.price" label="Price Option 1" variant="outlined" size="medium" className="list-common" />
                <NumberInput source="options[0]?.weight" label="Weight Option 1" variant="outlined" size="medium" className="list-common" />
                <NumberInput source="options[1]?.price" label="Price Option 2" variant="outlined" size="medium" className="list-common" />
                <NumberInput source="options[1]?.weight" label="Weight Option 2" variant="outlined" size="medium" className="list-common" />
            </TabbedForm.Tab>
            <TabbedForm.Tab label="Description" className="list-common">
                <TextInput
                    variant="outlined"
                    source="description"
                    multiline
                    fullWidth
                    className="list-common"
                />
            </TabbedForm.Tab>
        </TabbedForm>
    </Edit>
);
export default SnackEdit;