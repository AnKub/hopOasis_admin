import { AuthProvider } from "react-admin";
import { fetchUtils } from "react-admin";

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const requestBody = JSON.stringify({ email, password });

        try {
            const headers = new Headers({
                "Content-Type": "application/json",
            });

            const response = await fetchUtils.fetchJson(
                "https://hopoasis.onrender.com/auth/login",
                {
                    method: "POST",
                    body: requestBody,
                    headers: headers,  
                }
            );

        const { access_token } = await response.json();

            if (access_token) {
                localStorage.setItem("authToken", access_token);
                return { access_token };
            } else {
                throw new Error("Token is missing");
            }
        } catch (error: unknown) {
            console.error("Login failed:", error);

       if (error instanceof Error) {
                throw new Error(`Login failed: ${error.message}`);
            } else {
                throw new Error("Login failed: Unknown error");
            }
        }
    },

    logout: () => {
        localStorage.removeItem("authToken");
        return Promise.resolve();
    },

    checkAuth: () =>
        localStorage.getItem("authToken")
            ? Promise.resolve()
            : Promise.reject(new Error("Not authenticated")),

            checkError: (error) => {
                const status = error.response?.status;
                if ([401, 403].includes(status)) {
                    localStorage.removeItem("authToken");
                    return Promise.reject();
                } else if (status === 500) {
                    console.error("Server error: ", error.message);
                    return Promise.reject(new Error("Internal Server Error"));
                }
                return Promise.resolve();
            },

    getPermissions: () => Promise.resolve(),
};

export default authProvider;
