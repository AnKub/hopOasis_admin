import axios from "axios";
import { fetchUtils } from "react-admin";

const authInterceptor = async (url: string, options: fetchUtils.Options = {}) => {
    const { method = "GET" } = options;
    const token = localStorage.getItem("authToken");
    console.log(token);
    const useAuth = ["POST", "PUT", "DELETE"].includes(method);

    const headers = new Headers({
        ...options.headers,
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(useAuth && token ? { Authorization: `Bearer ${token}` } : {}),
    });

    try {
        const response = await axios({
            url,
            method,
            headers: Object.fromEntries(headers.entries()),
            data: options.body || null,
        });

        return {
            status: response.status,
            headers: new Headers(Object.entries(response.headers || {}).map(([key, value]) => [key, String(value)])),
            body: JSON.stringify(response.data),
            json: response.data,
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Interceptor error:", error.message);
            throw new Error(error.message);
        } else if (typeof error === "object" && error !== null && "response" in error) {
            const responseError = error as { response: { data: { message: string } } };
            console.error("Interceptor error:", responseError.response.data);
            throw new Error(responseError.response.data.message || "Request failed");
        } else {
            console.error("Unknown error:", error);
            throw new Error("Request failed");
        }
    }
};

export default authInterceptor;
