import { AuthProvider } from "react-admin";

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        const request = new Request("https://hopoasis.onrender.com/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
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
            throw new Error("Authentication failed");
        }
    },

    logout: () => {
        localStorage.removeItem("authToken");
        return Promise.resolve();
    },

    checkAuth: () =>
        localStorage.getItem("authToken") ? Promise.resolve() : Promise.reject(new Error("Not authenticated")),

    checkError: (error) => {
        if ([401, 403].includes(error.status)) {
            localStorage.removeItem("authToken"); // Забезпечуємо видалення токена після помилок доступу
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => Promise.resolve(),
};

export default authProvider;
