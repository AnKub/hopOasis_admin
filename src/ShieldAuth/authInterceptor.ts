import { fetchUtils } from "react-admin";

const authInterceptor = async (url: string, options: fetchUtils.Options = {}) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("No auth token found. Please log in.");
    }

    if (options.method !== 'GET') {
        const headers = new Headers(options.headers || {});
        headers.append("Authorization", `Bearer ${token}`);
        headers.append("Accept", "application/json");
        headers.append("Content-Type", "application/json");

        options.headers = headers;
    }

    try {
        const response = await fetchUtils.fetchJson(url, options);
        return response;
    } catch (error) {
        console.error("Error in authInterceptor:", error);
        throw new Error("Network or server error occurred.");
    }
};

export default authInterceptor;
