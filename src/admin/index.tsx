
import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import authProvider from "../ShieldAuth/authProvider";
import customProvider from "../api";
import LoginPage from "./LoginPage/LoginPage";

import BeerList from './Beer/BeerList';
import BeerCreate from './Beer/BeerCreate';
import BeerEdit from './Beer/BeerEdit';
import BeerShow from './Beer/BeerShow';

import SnackList from './Snacks/SnackList';
import SnackCreate from './Snacks/SnackCreate';
import SnackEdit from './Snacks/SnackEdit';
import SnackShow from './Snacks/SnackShow';

import CiderList from './Ciders/CiderList';
import CiderCreate from './Ciders/CiderCreate';
import CiderEdit from './Ciders/CiderEdit';
import CiderShow from './Ciders/CiderShow';

import OfferList from './Offers/OfferList';
import OfferCreate from './Offers/OfferCreate';
import OfferEdit from './Offers/OfferEdit';
import OfferShow from './Offers/OfferShow';

import BundleList from './Bundles/BundleList';
import BundleCreate from './Bundles/BundleCreate';
import BundleEdit from './Bundles/BundleEdit';
import BundleShow from './Bundles/BundleShow';

// import ButtonGroup from '../components/Button';

import './StylesAdmin.css';

const MyAdmin = () => (
    <Admin
        authProvider={authProvider}
        dataProvider={customProvider}
        loginPage={(props) => <LoginPage {...props} onLoginSuccess={() => console.log('Login success!')} />}>
        <Resource name="beers" list={BeerList} show={BeerShow} edit={BeerEdit} create={BeerCreate} options={{ label: 'Beers' }} />
        <Resource name="snacks" list={SnackList} show={SnackShow} edit={SnackEdit} create={SnackCreate} options={{ label: 'Snacks' }} />
        <Resource name="ciders" list={CiderList} show={CiderShow} edit={CiderEdit} create={CiderCreate} options={{ label: 'Ciders' }} />
        <Resource name="special-offers" list={OfferList} show={OfferShow} edit={OfferEdit} create={OfferCreate} options={{ label: 'Special Offers' }} />
        <Resource name="products-bundle" list={BundleList} show={BundleShow} edit={BundleEdit} create={BundleCreate} options={{ label: 'Products Bundle' }} />
        
        <CustomRoutes>
            <Route path="/login" element={<LoginPage onLoginSuccess={() => console.log('Login success!')} />} />
        </CustomRoutes>
    </Admin>
);

export default MyAdmin;
