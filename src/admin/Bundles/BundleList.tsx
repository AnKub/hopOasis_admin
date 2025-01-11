import {
	Datagrid,
	EditButton,
	List,
	NumberField,
	TextField,
	ListProps
} from "react-admin";
import { ProductBundleParams } from "../../types";
import '../StylesAdmin.css';

export const BundleList = (props: ListProps) => (
	<List<ProductBundleParams> {...props} title="Product Bundles" className="list-common">
			<Datagrid rowClick="show" className="list-common">
					<TextField source="id" className="list-common" />
					<TextField source="name" label="Name" className="list-common" />
					<NumberField source="averageRating" label="Average Rating" className="list-common" />
					<NumberField source="ratingCount" label="Rating Count" className="list-common" />
					{/*с массивом options */}
					<NumberField
							source="options[0]?.quantity"
							label="Quantity Option 1"
							className="list-common"
					/>
					<NumberField
							source="options[0]?.price"
							label="Price Option 1"
							className="list-common"
					/>
					<NumberField
							source="options[1]?.quantity"
							label="Quantity Option 2"
							className="list-common"
					/>
					<NumberField
							source="options[1]?.price"
							label="Price Option 2"
							className="list-common"
					/>
					<EditButton className="list-common-edit-button" />
			</Datagrid>
	</List>
);
export default BundleList;
