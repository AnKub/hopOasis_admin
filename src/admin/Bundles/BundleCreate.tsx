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
import { ProductBundleParams } from "../../types";

export const BundleCreate = (props: CreateProps) => (
	<Create<ProductBundleParams> {...props} className="list-common">
			<TabbedForm className="list-common">
					<TabbedForm.Tab label="Information" className="list-common">
							<TextInput source="name" label="Name" validate={[required()]} className="list-common" />
					</TabbedForm.Tab>
					<TabbedForm.Tab label="Price and Volume" className="list-common">
							<OptionsField
									optionsSource="options"
									fields={[
										{ key: 'id', label: 'ID' },
											{ key: 'price', label: 'Price' },
											{ key: 'volume', label: 'Volume' },
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
									source="productImageName"
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
export default BundleCreate;