import {
    Datagrid,
    EditButton,
    ImageField,
    List,
    NumberField,
    TextField,
    ListProps
} from "react-admin";
import { BeerParams } from "../../types";

export const BeerList = (props: ListProps) => (
    <List<BeerParams> {...props} title="Beers" className="list-common">
        <Datagrid rowClick="show" className="list-common">
            <TextField source="id" className="list-common" />
            <TextField source="beerName" label="Name" className="list-common" />
            <NumberField source="averageRating" label="Average Rating" className="list-common" />
            <TextField source="beerColor" className="list-common" />
            <TextField source="description" className="list-common" />
            
            {/* Задание размеров изображения через sx */}
            <ImageField 
                source="imageName[0]" 
                label="Image" 
                className="list-common-image" 
               />
            {/* Работа с массивом options */}
            <NumberField
                source="options[0].volume"
                label="Volume Large"
                className="list-common"
            />
            <NumberField
                source="options[0].price"
                label="Price Large"
                className="list-common"
            />
            {/* Проверка наличия второго элемента в options */}
            <TextField
                source="options[1]?.volume"
                label="Volume Small"
                className="list-common"
            />
            <NumberField
                source="options[1]?.price"
                label="Price Small"
                className="list-common"
            />
            <EditButton className="list-common-edit-button" />
        </Datagrid>
    </List>
);
