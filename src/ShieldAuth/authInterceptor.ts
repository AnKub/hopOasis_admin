import axios from "axios";
import { fetchUtils } from "react-admin";

const authInterceptor = async (url: string, options: fetchUtils.Options = {}) => {
  const { method = "GET" } = options;
  const token = localStorage.getItem("authToken");
  const useAuth = ["POST", "PUT", "DELETE"].includes(method);

  const headers = new Headers({
    ...options.headers,
    Accept: "application/json",
    ...(useAuth && token ? { Authorization: `Bearer ${token}` } : {}),
  });

  const axiosHeaders = Object.fromEntries(headers.entries());

  const response = await axios(url, {
    method,
    headers: axiosHeaders,
    data: options.body || null,
  });

  const responseHeaders = new Headers();
  Object.entries(response.headers).forEach(([key, value]) => {
    if (typeof value === "string") {
      responseHeaders.append(key, value);
    }
  });

  return {
    status: response.status,
    headers: responseHeaders,
    body: JSON.stringify(response.data),
    json: response.data,
  };
};

export default authInterceptor;
