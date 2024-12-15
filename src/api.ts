import { BeerParams, CiderParams, SnackParams, ProductBundleParams } from './types'; // Додайте правильний шлях до файлу типів
import simpleRestDataProvider from "ra-data-simple-rest";
import { DataProvider, fetchUtils } from "react-admin";
import authInterceptor from "./ShieldAuth/authInterceptor";
import { getImagesUrl, fetchResource } from "./utils";

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
    const isFormData = ["special-offers", "snacks", "beers", "ciders"].includes(resource);
    return fetchResource(API_URL, resource, 'POST', params, isFormData);
  },

  update: async (resource, params) => {
    const updatedData = {
      ...params.data,
      options: Array.isArray(params.data.options)
        ? params.data.options.map((opt) => ({
            price: parseFloat(opt.price),
            volume: parseFloat(opt.volume),
          }))
        : params.data.options,
    };

    const url = `${API_URL}/${resource}/${params.id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    };

    const response = await fetchUtils.fetchJson(url, options);
    return { data: response.json };
  },

  delete: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const options = {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json', 
      }),
    };
  
    const response = await fetchUtils.fetchJson(url, options);
    return { data: response.json };
  },
};

export default customProvider;
