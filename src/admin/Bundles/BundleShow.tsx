import {
	ImageField,
	NumberField,
	Show,
	TabbedShowLayout,
	TextField,
	ShowProps,
} from "react-admin";
import { ProductBundleParams } from "../../types";
import '../StylesAdmin.css';

export const BundleShow = (props: ShowProps) => (
	<Show<ProductBundleParams> {...props} className="list-common">
			<TabbedShowLayout className="list-common">
					<TabbedShowLayout.Tab label="Information" className="list-common">
							<TextField source="id" className="list-common" />
							<TextField source="name" label="Name" className="list-common" />
					</TabbedShowLayout.Tab>
					<TabbedShowLayout.Tab label="Options" className="list-common">
							<NumberField source="options[0]?.price" label="Price Option 1" className="list-common" />
							<NumberField source="options[0]?.quantity" label="Quantity Option 1" className="list-common" />
							<NumberField source="options[1]?.price" label="Price Option 2" className="list-common" />
							<NumberField source="options[1]?.quantity" label="Quantity Option 2" className="list-common" />
					</TabbedShowLayout.Tab>
					<TabbedShowLayout.Tab label="Description" className="list-common">
							<TextField source="description" className="list-common" />
					</TabbedShowLayout.Tab>
					<TabbedShowLayout.Tab label="Images" className="list-common">
							<ImageField source="productImageName" label="Image" className="list-common-image" />
					</TabbedShowLayout.Tab>
			</TabbedShowLayout>
	</Show>
);
export default BundleShow;