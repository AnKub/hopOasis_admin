import {
	Edit,
	NumberInput,
	TabbedForm,
	TextInput,
	EditProps,
} from "react-admin";

export const BundleEdit = (props: EditProps) => (
	<Edit {...props} className="list-common">
			<TabbedForm className="list-common">
					<TabbedForm.Tab label="Information" className="list-common">
							<TextInput source="name" label="Name" variant="outlined" size="medium" className="list-common" />
					</TabbedForm.Tab>
					<TabbedForm.Tab label="Options" className="list-common">
							<NumberInput source="options[0]?.price" label="Price Option 1" variant="outlined" size="medium" className="list-common" />
							<NumberInput source="options[0]?.quantity" label="Quantity Option 1" variant="outlined" size="medium" className="list-common" />
							<NumberInput source="options[1]?.price" label="Price Option 2" variant="outlined" size="medium" className="list-common" />
							<NumberInput source="options[1]?.quantity" label="Quantity Option 2" variant="outlined" size="medium" className="list-common" />
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
export default BundleEdit;