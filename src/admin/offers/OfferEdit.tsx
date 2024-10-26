import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceArrayInput,
  SelectArrayInput,
  required,
  EditProps,
  useGetList
} from "react-admin";
import { Typography } from '@mui/material';

export const OfferEdit = (props: EditProps) => {
const { data: beers, isLoading: loadingBeers } = useGetList('beers');
const { data: ciders, isLoading: loadingCiders } = useGetList('ciders');
const { data: snacks, isLoading: loadingSnacks } = useGetList('snacks');
const { data: productBundles, isLoading: loadingBundles } = useGetList('productBundles');

return (
  <Edit {...props}>
    <SimpleForm className="list-common">
      <TextInput
        source="name"
        label="Offer Name"
        validate={[required()]}
        className="list-common"
      />
      <BooleanInput
        source="active"
        label="Is Active?"
        className="list-common"
      />

      {!loadingBeers && beers?.length === 0 ? (
        <Typography color="error">No beers available</Typography>
      ) : (
        <ReferenceArrayInput
          source="specialOfferBeers"
          reference="beers"
          className="list-common"
        >
          <SelectArrayInput optionText="beerName" className="list-common" />
        </ReferenceArrayInput>
      )}

      {!loadingCiders && ciders?.length === 0 ? (
        <Typography color="error">No ciders available</Typography>
      ) : (
        <ReferenceArrayInput
          source="specialOfferCiders"
          reference="ciders"
          className="list-common"
        >
          <SelectArrayInput optionText="ciderName" className="list-common" />
        </ReferenceArrayInput>
      )}

      {!loadingSnacks && snacks?.length === 0 ? (
        <Typography color="error">No snacks available</Typography>
      ) : (
        <ReferenceArrayInput
          source="specialOfferSnacks"
          reference="snacks"
          className="list-common"
        >
          <SelectArrayInput optionText="snackName" className="list-common" />
        </ReferenceArrayInput>
      )}
       {!loadingBundles && productBundles?.length === 0 ? (
        <Typography color="error">No bundles available</Typography>
      ) : (
        <ReferenceArrayInput
          source="specialOfferProductBundles"
          reference="productBundles"
          className="list-common"
        >
          <SelectArrayInput optionText="name" className="list-common" />
        </ReferenceArrayInput>
      )}
    </SimpleForm>
  </Edit>
);
};
