import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyAdmin from "./admin/index";
import LoginPage from "./admin/LoginPage/LoginPage";
import { useState } from "react";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route
                    path="/login"
                    element={<LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />}
                />
                <Route
                    path="/*"
                    element={isAuthenticated ? <MyAdmin /> : <Navigate to="/login" replace />}
                />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;

