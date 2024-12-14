import type { CreateParams, UpdateParams, RaRecord, Identifier } from "react-admin";
import type { OfferParams, SnackParams } from "./types";

// // Функція для отримання токену
// const getAuthToken = (): string | null => {
//     return localStorage.getItem("authToken");
// };

// Функція для формування URL для зображень
export const getImagesUrl = (
    imagesName: string[],
    url: string,
    resource: string
): string[] => {
    if (!Array.isArray(imagesName)) {
        console.error("Expected an array of image names, but received:", imagesName);
        return [];
    }
    return imagesName.map((image) => {
        return image.startsWith("http://") || image.startsWith("https://") 
            ? image 
            : `${url}/${resource}/images/${image}`;
    });
};

// Створення FormData для пропозиції
export const createOfferFormData = (params: CreateParams<OfferParams>): FormData => {
    const formData = new FormData();
    Object.entries(params.data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, JSON.stringify(value));
    });
    return formData;
};

// Створення FormData для перекусів
export const createSnackFormData = (params: CreateParams<SnackParams>): FormData => {
    const formData = new FormData();
    Object.entries(params.data).forEach(([key, value]) => {
        if (value !== undefined) formData.append(key, String(value));
    });
    return formData;
};

// Функція для виконання запитів до ресурсів
export const fetchResource = async <T extends RaRecord<Identifier>>(
    API_URL: string,
    resource: string,
    method: 'POST' | 'PUT',
    params?: UpdateParams<T> | CreateParams<T>,
    isFormData: boolean = false
): Promise<T> => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
        throw new Error("Authentication token is missing.");
    }

    const url = `${API_URL}/${resource}${params && 'id' in params ? `/${params.id}` : ''}`;
    const body = params ? (isFormData ? params.data : JSON.stringify(params.data)) : undefined;

    const headers: Record<string, string> = {
        'Authorization': `Bearer ${authToken}`,
    };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
        method,
        headers,
        body: isFormData ? (body as unknown as FormData) : (body as string),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to ${method.toLowerCase()} ${resource}: ${errorText}`);
    }

    return await response.json() as T;
};


export const deleteResource = async <T extends RaRecord>(
    API_URL: string,
    resource: string,
    id: number
  ): Promise<{ data: T }> => {
    const authToken = localStorage.getItem("authToken");
  
    if (!authToken) {
      throw new Error("Authentication token is missing.");
    }
  
    const url = `${API_URL}/${resource}/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete ${resource}: ${errorText}`);
    }
  
    return { data: (await response.json()) as T };
  };

// Обробка пагінованого відповіді
export const processPaginatedResponse = <T extends RaRecord<Identifier>>(
    response: { json: { content: T[]; totalElements: number } }
) => ({
    data: response.json.content,
    total: response.json.totalElements,
});
