import {
    ImageField,
    NumberField,
    Show,
    TabbedShowLayout,
    TextField,
    ShowProps,
} from "react-admin";
import { SnackParams } from "../../types";
import '../StylesAdmin.css';

export const SnackShow = (props: ShowProps) => (
    <Show<SnackParams> {...props} className="list-common">
        <TabbedShowLayout className="list-common">
            <TabbedShowLayout.Tab label="Information" className="list-common">
                <TextField source="id" className="list-common" />
                <TextField source="snackName" label="Name" className="list-common" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Price and Weight" className="list-common">
                <NumberField source="options[0]?.price" label="Price Option 1" className="list-common" />
                <NumberField source="options[0]?.weight" label="Weight Option 1" className="list-common" />
                <NumberField source="options[1]?.price" label="Price Option 2" className="list-common" />
                <NumberField source="options[1]?.weight" label="Weight Option 2" className="list-common" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Description" className="list-common">
                <TextField source="description" className="list-common" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Images" className="list-common">
				<ImageField source="snackImageName[0]" label="Image Option 1" className="list-common-image" />
			</TabbedShowLayout.Tab>
		</TabbedShowLayout>
	</Show>
);
