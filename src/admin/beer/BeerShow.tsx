import {
	ImageField,
	NumberField,
	Show,
	TabbedShowLayout,
	TextField,
	ShowProps,
} from "react-admin";
import { BeerParams } from "../../types";
import '../StylesAdmin.css';

export const BeerShow = (props: ShowProps) => (
	<Show<BeerParams> {...props} className="list-common">
		<TabbedShowLayout className="list-common">
			<TabbedShowLayout.Tab label="Information" className="list-common">
				<TextField source="id" className="list-common" />
				<TextField source="beerName" label="Name" className="list-common" />
			</TabbedShowLayout.Tab>
			<TabbedShowLayout.Tab label="Price and Volume" className="list-common">
				<NumberField source="options[0]?.price" label="Price Option 1" className="list-common" />
				<NumberField source="options[0]?.volume" label="Volume Option 1" className="list-common" />
				<NumberField source="options[1]?.price" label="Price Option 2" className="list-common" />
				<NumberField source="options[1]?.volume" label="Volume Option 2" className="list-common" />
			</TabbedShowLayout.Tab>
			<TabbedShowLayout.Tab label="Description" className="list-common">
				<TextField source="description" className="list-common" />
			</TabbedShowLayout.Tab>
			<TabbedShowLayout.Tab label="Images" className="list-common">
				{/* Работа с массивом изображений */}
				<ImageField source="imageName[0]" label="Image Option 1" className="list-common-image" />
			</TabbedShowLayout.Tab>
		</TabbedShowLayout>
	</Show>
);
