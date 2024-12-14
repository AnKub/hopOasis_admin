import { BeerParams, CiderParams, SnackParams, ProductBundleParams} from './types'; // Добавь путь к твоему файлу с типами
import simpleRestDataProvider from "ra-data-simple-rest";
import { DataProvider, fetchUtils } from "react-admin";
import authInterceptor from "./ShieldAuth/authInterceptor";
import { getImagesUrl, fetchResource} from "./utils";

const API_URL = "https://friendly-feynma-1-0.onrender.com";
const baseDataProvider = simpleRestDataProvider(API_URL, authInterceptor);

export type ResourceData = BeerParams | CiderParams | SnackParams | ProductBundleParams;

export const customProvider: DataProvider = {
  ...baseDataProvider,

    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const url = `${API_URL}/${resource}?_page=${page}&_limit=${perPage}&_sort=${field}&_order=${order}`;
        const response = await fetchUtils.fetchJson(url);

        const processedData =
            ["snacks", "beers", "ciders", "products-bundle"].includes(resource) &&
            Array.isArray(response.json.content)
                ? response.json.content.map((item: ResourceData) => ({
                    ...item,
                    imageName: getImagesUrl(item.imageName || [], API_URL, resource),
                }))
                : response.json;

        return {
            data: processedData,
            total: response.json.totalElements || processedData.length,
        };
    },

    getOne: async (resource, params) => {
        const url = `${API_URL}/${resource}/${params.id}`;
        const response = await fetchUtils.fetchJson(url);
        return { data: response.json };
    },

    create: async (resource, params) => {
        const isFormData = resource === 'special-offers' || resource === 'snacks' || resource === 'beers' || resource === 'ciders';
        return fetchResource(API_URL, resource, 'POST', params, isFormData);
    },

    update: async (resource, params) => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            throw new Error("Authentication token is missing.");
        }
    
        const url = `${API_URL}/${resource}/${params.id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(params.data),
        };
    
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to update resource: ${response.statusText}`);
        }
    
        const data = await response.json();
        return { data };
    },
    

    delete: async (resource, params) => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            throw new Error("Authentication token is missing.");
        }

        const url = `${API_URL}/${resource}/${params.id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete resource: ${response.statusText}`);
        }

        const data = await response.json();
        return { data };
    },
};

export default customProvider;
