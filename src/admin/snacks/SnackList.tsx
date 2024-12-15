import {
    Datagrid,
    EditButton,
    ImageField,
    List,
    NumberField,
    TextField,
    ListProps
} from "react-admin";
import { SnackParams } from "../../types";

export const SnackList = (props: ListProps) => (
    <List<SnackParams> {...props} title="Snacks" className="list-common">
        <Datagrid rowClick="show" className="list-common">
            <TextField source="id" className="list-common" />
            <TextField source="snackName" label="Name" className="list-common" />
            <TextField source="description" className="list-common" />
          
            <NumberField
                source="options[0].weight"
                label="Weight Large"
                className="list-common"
            />
            <NumberField
                source="options[0].price"
                label="Price Large"
                className="list-common"
            />
            <NumberField
                source="options[1]?.weight"
                label="Weight Small"
                className="list-common"
            />
            <NumberField
                source="options[1]?.price"
                label="Price Small"
                className="list-common"
            />
              <ImageField source="snackImageName[0]" label="Image" className="list-common-image" />
            <EditButton className="list-common-edit-button" />
        </Datagrid>
    </List>
);
export default SnackList;
