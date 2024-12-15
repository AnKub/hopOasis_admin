import {
  Datagrid,
  EditButton,
  List,
  TextField,
  BooleanField,
  ListProps
} from "react-admin";

export const OfferList = (props: ListProps) => (
  <List {...props} title="Special Offers" className="list-common">
    <Datagrid rowClick="edit" className="list-common">
      <TextField source="id" className="list-common" />
      <TextField source="name" label="Offer Name" className="list-common" />
      <BooleanField source="active" label="Is Active?" className="list-common" />
      <EditButton className="list-common-edit-button" />
    </Datagrid>
  </List>
);export default OfferList;
