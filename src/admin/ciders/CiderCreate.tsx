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
import { CiderParams } from "../../types";

export const CiderCreate = (props: CreateProps) => (
	<Create<CiderParams> {...props} className="list-common">
			<TabbedForm className="list-common">
					<TabbedForm.Tab label="Information" className="list-common">
							<TextInput source="ciderName" label="Name" validate={[required()]} className="list-common" />
					</TabbedForm.Tab>
					<TabbedForm.Tab label="Price and Volume" className="list-common">
					<NumberInput source="options[0]?.price" label="Price Option 1" validate={[required()]} className="list-common" />
							<NumberInput source="options[0]?.volume" label="Volume Option 1" validate={[required()]} className="list-common" />
							<NumberInput source="options[1]?.price" label="Price Option 2" validate={[required()]} className="list-common" />
							<NumberInput source="options[1]?.volume" label="Volume Option 2" validate={[required()]} className="list-common" />
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
									source="ciderImageName"
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
); export default CiderCreate;
