import {
	Edit,
	NumberInput,
	TabbedForm,
	TextInput,
	EditProps,
} from "react-admin";

export const BeerEdit = (props: EditProps) => (
	<Edit {...props} className="list-common">
			<TabbedForm className="list-common">
					<TabbedForm.Tab label="Information" className="list-common">
							<TextInput source="beerName" label="Name" variant="outlined" size="medium" className="list-common" />
					</TabbedForm.Tab>
					<TabbedForm.Tab label="Price and Volume" className="list-common">
							<NumberInput source="options[0]?.price" label="Price Option 1" variant="outlined" size="medium" className="list-common" />
							<NumberInput source="options[0]?.volume" label="Volume Option 1" variant="outlined" size="medium" className="list-common" />
							<NumberInput source="options[1]?.price" label="Price Option 2" variant="outlined" size="medium" className="list-common" />
							<NumberInput source="options[1]?.volume" label="Volume Option 2" variant="outlined" size="medium" className="list-common" />
					</TabbedForm.Tab>
					<TabbedForm.Tab label="Description" className="list-common">
							<TextInput
									variant="outlined"
									source="description"
									multiline
									fullWidth
									className="list-common"
									id="beer-name-input"
							/>
					</TabbedForm.Tab>
			</TabbedForm>
	</Edit>
);
