import {
	Datagrid,
	EditButton,
	ImageField,
	List,
	NumberField,
	TextField,
	ListProps
} from "react-admin";
import { CiderParams } from "../../types";
import '../StylesAdmin.css';

export const CiderList = (props: ListProps) => (
	<List<CiderParams> {...props} title="Ciders" className="list-common">
			<Datagrid rowClick="show" className="list-common">
					<TextField source="id" className="list-common" />
					<TextField source="ciderName" label="Name" className="list-common" />
					<NumberField source="averageRating" label="Average Rating" className="list-common" />
					<NumberField source="ratingCount" label="Rating Count" className="list-common" />
	
					<NumberField
							source="options[0]?.volume"
							label="Volume Option 1"
							className="list-common"
					/>
					<NumberField
							source="options[0]?.price"
							label="Price Option 1"
							className="list-common"
					/>
					<NumberField
							source="options[1]?.volume"
							label="Volume Option 2"
							className="list-common"
					/>
					<NumberField
							source="options[1]?.price"
							label="Price Option 2"
							className="list-common"
					/>
							<ImageField source="ciderImageName[0]" label="Image" className="list-common-image" />
					<EditButton className="list-common-edit-button" />
			</Datagrid>
	</List>
);
export default CiderList;
