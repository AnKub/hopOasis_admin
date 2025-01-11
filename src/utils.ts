import { fetchUtils } from "react-admin";
import { CreateParams, UpdateParams, RaRecord, Identifier } from "react-admin";
import { CustomImage } from './types';

export const getImagesUrl = (imageNames: CustomImage[], baseUrl: string, resource: string) => {
    return imageNames.map(imageName => `${baseUrl}/${resource}/images/${imageName}`);
};

export const fetchResource = async <T extends RaRecord<Identifier>>(
    API_URL: string,
    resource: string,
    method: "POST" | "PUT",
    params?: UpdateParams<T> | CreateParams<T>
): Promise<T> => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("Missing token");
    }

    const url = `${API_URL}/${resource}${params && "id" in params ? `/${params.id}` : ""}`;
    
    const options: fetchUtils.Options = {
        method,
        body: JSON.stringify(params?.data || {}),
        headers: new Headers({
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }),
    };

    try {
        const response = await fetchUtils.fetchJson(url, options);
        return response.json;
    } catch (error) {
        console.error(`Error in fetchResource: ${error}`);
        throw new Error(`Failed to ${method} resource`);
    }
};
