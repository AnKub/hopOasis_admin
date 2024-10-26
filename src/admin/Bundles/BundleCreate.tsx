import {
	Create,
	ImageField,
	ImageInput,
	TabbedForm,
	TextInput,
	required,
	CreateProps,
	NumberInput,
} from "react-admin";
import { ProductBundleParams } from "../../types";

export const BundleCreate = (props: CreateProps) => (
	<Create<ProductBundleParams> {...props} className="list-common">
			<TabbedForm className="list-common">
					<TabbedForm.Tab label="Information" className="list-common">
							<TextInput source="name" label="Name" validate={[required()]} className="list-common" />
					</TabbedForm.Tab>
					<TabbedForm.Tab label="Options" className="list-common">
					<NumberInput source="options[0].price" label="Price Option 1" validate={[required()]} className="list-common" />
					<NumberInput source="options[0].quantity" label="Quantity Option 1" validate={[required()]} className="list-common" />
					<NumberInput source="options[1].price" label="Price Option 2" validate={[required()]} className="list-common" />
					<NumberInput source="options[1].quantity" label="Quantity Option 2" validate={[required()]} className="list-common" />

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
