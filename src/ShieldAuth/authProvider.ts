import { AuthProvider } from "react-admin";

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const request = new Request("https://hopoasis.onrender.com/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: new Headers({ "Content-Type": "application/json" }),
        });

        try {
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error("Failed to login");
            }

            const { access_token } = await response.json();
            localStorage.setItem("authToken", access_token);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem("authToken");
        return Promise.resolve();
    },

    checkAuth: () =>
        localStorage.getItem("authToken") ? Promise.resolve() : Promise.reject(),

    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            console.warn(`Access denied: ${error.status} error from ${error.url}`);
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => Promise.resolve(),
};

export default authProvider;