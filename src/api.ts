import simpleRestDataProvider from "ra-data-simple-rest";
import { DataProvider, fetchUtils } from "react-admin";
import type { RaRecord, Identifier, CreateParams, UpdateParams } from "react-admin";
import type { SnackParams, BeerParams, CiderParams, ProductBundleParams } from "./types";
import { getImagesUrl, fetchResource } from "./utils";

const API_URL = "https://giou6fh6yg2ogdsh7uzcaobhte0wtwha.lambda-url.eu-central-1.on.aws";
const baseDataProvider = simpleRestDataProvider(API_URL);

export const customProvider: DataProvider = {
  ...baseDataProvider,

  getList: async (resource, params) => {
    try {
      let url = `${API_URL}/${resource}`;
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      url += `?_page=${page}&_limit=${perPage}&_sort=${field}&_order=${order}`;
      const response = await fetchUtils.fetchJson(url);

      switch (resource) {
        case "special-offers": {
          return {
            data: response.json,
            total: response.json.length,
          };
        }
        case "snacks": {
          const snacksData = response.json.content.map((item: SnackParams) => ({
            ...item,
            snackImageName: Array.isArray(item.snackImageName)
              ? getImagesUrl(item.snackImageName, API_URL, resource)
              : [],
          }));
          return {
            data: snacksData,
            total: response.json.totalElements,
          };
        }
        case "beers": {
          const beersData = response.json.content.map((item: BeerParams) => ({
            ...item,
            imageName: Array.isArray(item.imageName)
              ? getImagesUrl(item.imageName, API_URL, resource)
              : [],
          }));
          return {
            data: beersData,
            total: response.json.totalElements,
          };
        }
        case "ciders": {
          const cidersData = response.json.content.map((item: CiderParams) => ({
            ...item,
            ciderImageName: Array.isArray(item.ciderImageName)
              ? getImagesUrl(item.ciderImageName, API_URL, resource)
              : [],
          }));
          return {
            data: cidersData,
            total: response.json.totalElements,
          };
        }
        case "products-bundle": {
          const productsBundleData = response.json.content.map((item: ProductBundleParams) => ({
            ...item,
            productImageName: Array.isArray(item.productImageName)
              ? getImagesUrl(item.productImageName, API_URL, resource)
              : [],
          }));
          return {
            data: productsBundleData,
            total: response.json.totalElements,
          };
        }
        default:
          return baseDataProvider.getList(resource, params);
      }
    } catch (error) {
      console.error(`Error fetching list for resource ${resource}:`, error);
      throw error;
    }
  },

  getOne: async (resource, params) => {
    try {
      const response = await fetchUtils.fetchJson(`${API_URL}/${resource}/${params.id}`);
      switch (resource) {
        case "special-offers":
          return { data: response.json };
        case "snacks": {
          const snackData: SnackParams = {
            ...response.json,
            snackImageName: Array.isArray(response.json.snackImageName)
              ? getImagesUrl(response.json.snackImageName, API_URL, resource)
              : [],
          };
          return { data: snackData };
        }
        case "beers": {
          const beerData: BeerParams = {
            ...response.json,
            imageName: Array.isArray(response.json.imageName)
              ? getImagesUrl(response.json.imageName, API_URL, resource)
              : [],
          };
          return { data: beerData };
        }
        case "ciders": {
          const ciderData: CiderParams = {
            ...response.json,
            ciderImageName: Array.isArray(response.json.ciderImageName)
              ? getImagesUrl(response.json.ciderImageName, API_URL, resource)
              : [],
          };
          return { data: ciderData };
        }
        case "products-bundle": {
          const productsBundleData: ProductBundleParams = {
            ...response.json,
            productImageName: Array.isArray(response.json.productImageName)
              ? getImagesUrl(response.json.productImageName, API_URL, resource)
              : [],
          };
          return { data: productsBundleData };
        }
        default:
          return baseDataProvider.getOne(resource, params);
      }
    } catch (error) {
      console.error(`Error fetching one item for resource ${resource}:`, error);
      throw error;
    }
  },

  update: async <T extends RaRecord<Identifier>>(resource: string, params: UpdateParams<T>) => {
    try {
      const data = await fetchResource<T>(
        API_URL,
        resource,
        "PUT",
        params
      );
      return { data };
    } catch (error) {
      console.error(`Error updating ${resource} with id ${params.id}:`, error);
      throw error;
    }
  },

  create: async <T extends RaRecord<Identifier>>(resource: string, params: CreateParams<T>) => {
    try {
      const data = await fetchResource<T>(
        API_URL,
        resource,
        "POST",
        params
      );
      return { data };
    } catch (error) {
      console.error(`Error creating ${resource}:`, error);
      throw error;
    }
  },

  delete: async (resource, params) => {
    try {
      const response = await fetchUtils.fetchJson(
        `${API_URL}/${resource}/${params.id}`,
        {
          method: "DELETE",
        }
      );
      return { data: response.json };
    } catch (error) {
      console.error(`Error deleting ${resource} with id ${params.id}:`, error);
      throw error;
    }
  },
};

export default customProvider;
