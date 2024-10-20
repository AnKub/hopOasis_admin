import type { CreateParams, UpdateParams, RaRecord, Identifier } from "react-admin";
import type { OfferParams, SnackParams, CustomImage } from "./types";

export const getImagesUrl = (
  imagesName: string[],
  url: string,
  resource: string,
): string[] => {
  if (!Array.isArray(imagesName)) {
    console.error("Expected an array of image names, but received:", imagesName);
    return [];
  }
  return imagesName.map((image) => {
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }
    return `${url}/${resource}/images/${image}`;
  });
};

export const createOfferFormData = (params: CreateParams<OfferParams>): FormData => {
  const formData = new FormData();
  
  if (params.data.name) formData.append("name", params.data.name);
  if (params.data.active !== undefined) formData.append("active", String(params.data.active));
  
  if (params.data.specialOfferBeers) {
    formData.append("specialOfferBeers", JSON.stringify(params.data.specialOfferBeers));
  }
  
  if (params.data.specialOfferCiders) {
    formData.append("specialOfferCiders", JSON.stringify(params.data.specialOfferCiders));
  }
  
  if (params.data.specialOfferSnacks) {
    formData.append("specialOfferSnacks", JSON.stringify(params.data.specialOfferSnacks));
  }
  
  if (params.data.specialOfferProductBundles) {
    formData.append("specialOfferProductBundles", JSON.stringify(params.data.specialOfferProductBundles));
  }
  
  return formData;
};

export const createSnackFormData = (params: CreateParams<SnackParams>): FormData => {
  const formData = new FormData();
  
  if (params.data.snackName) formData.append("snackName", params.data.snackName);
  if (params.data.description) formData.append("description", params.data.description);
  if (params.data.averageRating !== undefined) formData.append("averageRating", String(params.data.averageRating));
  if (params.data.ratingCount !== undefined) formData.append("ratingCount", String(params.data.ratingCount));

  if (params.data.options && Array.isArray(params.data.options)) {
    params.data.options.forEach((option) => {
      if (option.weight !== undefined) formData.append("weight", String(option.weight));
      if (option.price !== undefined) formData.append("price", String(option.price));
      if (option.quantity !== undefined) formData.append("quantity", String(option.quantity));
    });
  }

  if (params.data.snackImageName && Array.isArray(params.data.snackImageName)) {
    params.data.snackImageName.forEach((image: CustomImage) => {
      formData.append("image[]", image);
    });
  }

  return formData;
};

export const fetchResource = async <T extends RaRecord<Identifier>>(
  API_URL: string,
  resource: string,
  method: 'POST' | 'PUT',
  params?: UpdateParams<T> | CreateParams<T>
): Promise<T> => {
  const url = `${API_URL}/${resource}${params && 'id' in params ? `/${params.id}` : ''}`;
  
  const body = params
    ? resource === "special-offers"
      ? createOfferFormData(params as CreateParams<OfferParams>)
      : createSnackFormData(params as CreateParams<SnackParams>)
    : undefined;

  const response = await fetch(url, {
    method,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to ${method.toLowerCase()} ${resource}. Response:`, errorText);
    throw new Error(`Failed to ${method.toLowerCase()} ${resource}`);
  }

  return await response.json() as T;
};

export const processPaginatedResponse = <T extends RaRecord<Identifier>>(
  response: { json: { content: T[]; totalElements: number } }
) => {
  return {
    data: response.json.content,
    total: response.json.totalElements,
  };
};
