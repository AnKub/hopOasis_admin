import { DataProvider } from "react-admin";
import { fetchUtils } from "react-admin";
import { getImagesUrl} from "./utils";
import simpleRestDataProvider from 'ra-data-simple-rest';
import { BeerParams, CiderParams, ProductBundleParams, SnackParams } from "./types";

const API_URL = "https://hopoasis.onrender.com";

const baseDataProvider = simpleRestDataProvider(API_URL);

export type ResourceData = BeerParams | CiderParams | SnackParams | ProductBundleParams;

export const customProvider: DataProvider = {
    ...baseDataProvider,

    getList: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const url = `${API_URL}/${resource}?_page=${page}&_limit=${perPage}&_sort=${field}&_order=${order}`;
        try {
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
        } catch (error) {
            console.error("Error fetching list:", error);
            throw new Error("Error fetching list");
        }
    },

    getOne: async (resource, params) => {
        const url = `${API_URL}/${resource}/${params.id}`;
        try {
            const response = await fetchUtils.fetchJson(url);
            return { data: response.json };
        } catch (error) {
            console.error("Error fetching one:", error);
            throw new Error("Error fetching one");
        }
    },

 
    create: async (resource, params) => {
        console.log(`Creating resource: ${resource}`, params.data);

        // Видаляємо id, щоб сервер сам його створив
        const dataWithoutId = { ...params.data };
        delete dataWithoutId.id;

        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            throw new Error("Authentication token is missing.");
        }

        try {
            const response = await fetchUtils.fetchJson(`${API_URL}/${resource}`, {
                method: "POST",
                body: JSON.stringify(dataWithoutId),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                }),
            });
            console.log("Server full response:", response);
            console.log("Created successfully:", response.json);
            return { data: response.json };
        } catch (error) {
            console.error("Error creating resource:", error);
            throw new Error("Failed to create resource.");
        }
    },

    update: async (resource, params) => {
        const { id, data } = params;
        const url = `${API_URL}/${resource}/${id}`;
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            throw new Error("Authentication token is missing.");
        }

        const headers = new Headers({
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
        });

        try {
            const response = await fetchUtils.fetchJson(url, {
                method: "PUT",
                body: JSON.stringify(data),
                headers,
            });

            return { data: response.json };
        } catch (error) {
            console.error("Error updating resource:", error);
            throw new Error(`Failed to update resource: ${error}`);
        }
    },

    delete: async (resource, params) => {
        const { id } = params;
        const url = `${API_URL}/${resource}/${id}`;
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
            throw new Error("Authentication token is missing.");
        }

        try {
            const response = await fetchUtils.fetchJson(url, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            return { data: response.json || { id } };
        } catch (error) {
            console.error("Error deleting resource:", error);
            throw new Error(`Failed to delete resource: ${error}`);
        }
    },
};

export default customProvider;
