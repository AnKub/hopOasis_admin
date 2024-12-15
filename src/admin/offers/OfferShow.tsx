import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
    ReferenceArrayField,
    SingleFieldList,
    ChipField,
    ShowProps,
  } from "react-admin";
  
  export const OfferShow = (props: ShowProps) => (
    <Show {...props} className="list-common">
      <SimpleShowLayout className="list-common">
        <TextField source="id" label="ID" className="list-common" />
        <TextField source="name" label="Offer Name" className="list-common" />
        <BooleanField source="active" label="Is Active?" className="list-common" />
        <ReferenceArrayField
          label="Beers"
          reference="beers"
          source="specialOfferBeers"
          className="list-common"
        >
          <SingleFieldList>
            <ChipField source="beerName" className="list-common-chip" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceArrayField
          label="Ciders"
          reference="ciders"
          source="specialOfferCiders"
          className="list-common"
        >
          <SingleFieldList>
            <ChipField source="ciderName" className="list-common-chip" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceArrayField
          label="Snacks"
          reference="snacks"
          source="specialOfferSnacks"
          className="list-common"
        >
          <SingleFieldList>
            <ChipField source="snackName" className="list-common-chip" />
          </SingleFieldList>
        </ReferenceArrayField>
        <ReferenceArrayField
          label="Product Bundles"
          reference="productBundles"
          source="specialOfferProductBundles"
          className="list-common"
        >
          <SingleFieldList>
            <ChipField source="name" className="list-common-chip" />
          </SingleFieldList>
        </ReferenceArrayField>
      </SimpleShowLayout>
    </Show>
  );
  export default OfferShow;