import { Admin, Resource, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { customProvider } from "../api";
import { lazy } from 'react';

// Ленивые импорты компонентов
const BeerList = lazy(() => import('./Beer/BeerList').then(module => ({ default: module.BeerList })));
const BeerCreate = lazy(() => import('./Beer/BeerCreate').then(module => ({ default: module.BeerCreate })));
const BeerEdit = lazy(() => import('./Beer/BeerEdit').then(module => ({ default: module.BeerEdit })));
const BeerShow = lazy(() => import('./Beer/BeerShow').then(module => ({ default: module.BeerShow })));

const SnackList = lazy(() => import('./Snacks/SnackList').then(module => ({ default: module.SnackList })));
const SnackCreate = lazy(() => import('./Snacks/SnackCreate').then(module => ({ default: module.SnackCreate })));
const SnackEdit = lazy(() => import('./Snacks/SnackEdit').then(module => ({ default: module.SnackEdit })));
const SnackShow = lazy(() => import('./Snacks/SnackShow').then(module => ({ default: module.SnackShow })));

const CiderList = lazy(() => import('./Ciders/CiderList').then(module => ({ default: module.CiderList })));
const CiderCreate = lazy(() => import('./Ciders/CiderCreate').then(module => ({ default: module.CiderCreate })));
const CiderEdit = lazy(() => import('./Ciders/CiderEdit').then(module => ({ default: module.CiderEdit })));
const CiderShow = lazy(() => import('./Ciders/CiderShow').then(module => ({ default: module.CiderShow })));

const OfferList = lazy(() => import('./Offers/OfferList').then(module => ({ default: module.OfferList })));
const OfferCreate = lazy(() => import('./Offers/OfferCreate').then(module => ({ default: module.OfferCreate })));
const OfferEdit = lazy(() => import('./Offers/OfferEdit').then(module => ({ default: module.OfferEdit })));
const OfferShow = lazy(() => import('./Offers/OfferShow').then(module => ({ default: module.OfferShow })));

const BundleList = lazy(() => import('./Bundles/BundleList').then(module => ({ default: module.BundleList })));
const BundleCreate = lazy(() => import('./Bundles/BundleCreate').then(module => ({ default: module.BundleCreate })));
const BundleEdit = lazy(() => import('./Bundles/BundleEdit').then(module => ({ default: module.BundleEdit })));
const BundleShow = lazy(() => import('./Bundles/BundleShow').then(module => ({ default: module.BundleShow })));

const ButtonGroup = lazy(() => import('../components/Button').then(module => ({ default: module.ButtonGroup })));

import CustomLayout from "../components/CustomLayout"; 
import './StylesAdmin.css';

const MyAdmin = () => (
    <Admin dataProvider={customProvider} layout={CustomLayout}>
        <Resource
            name="beers"
            list={BeerList}
            show={BeerShow}
            edit={BeerEdit}
            create={BeerCreate}
            options={{ label: 'Beers' }}
        />
        <Resource
            name="snacks"
            list={SnackList}
            show={SnackShow}
            edit={SnackEdit}
            create={SnackCreate}
            options={{ label: 'Snacks' }}
        />
        <Resource
            name="ciders"
            list={CiderList}
            show={CiderShow}
            edit={CiderEdit}
            create={CiderCreate}
            options={{ label: 'Ciders' }}
        />
        <Resource
            name="special-offers"
            list={OfferList}
            show={OfferShow}
            edit={OfferEdit}
            create={OfferCreate}
            options={{ label: 'Special Offers' }}
        />
        <Resource
            name="products-bundle"
            list={BundleList}
            show={BundleShow}
            edit={BundleEdit}
            create={BundleCreate}
            options={{ label: 'Products Bundle' }}
        />
        <CustomRoutes>
            <Route path="buttons" element={<ButtonGroup />} />
        </CustomRoutes>
    </Admin>
);

export default MyAdmin;
