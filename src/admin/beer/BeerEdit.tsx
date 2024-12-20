import {
	Edit,
	TabbedForm,
	TextInput,
	EditProps,
} from "react-admin";
import OptionsField from "../OptionsField/OptionFields";

export const BeerEdit = (props: EditProps) => (
	<Edit {...props} className="list-common">
			<TabbedForm className="list-common">
					<TabbedForm.Tab label="Information" className="list-common">
							<TextInput source="beerName" label="Name" variant="outlined" size="medium" className="list-common" />
					</TabbedForm.Tab>
					<TabbedForm.Tab label="Price and Volume" className="list-common">
							<OptionsField
									optionsSource="options"
									fields={[
											{ key: 'price', label: 'Price' },
											{ key: 'volume', label: 'Volume' },
											{ key: 'quantity', label: 'Quantity' },
									]}
							/>
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
); export default BeerEdit;
