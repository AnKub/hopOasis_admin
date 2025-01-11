import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import authProvider from '../../ShieldAuth/authProvider';

const LoginPage = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in both email and password.');
            return;
        }

        setLoading(true);
        setErrorMessage(null);
        try {
            await authProvider.login({ email, password });

            const token = localStorage.getItem("authToken"); 
            if (token) {
                onLoginSuccess?.();
                navigate('/'); 
            } else {
                throw new Error("Token is missing"); 
            }
        } catch (error) {
            console.error('Login failed:', error);

            // Добавляем более информативную ошибку
            if (error instanceof Error) {
                setErrorMessage(error.message); // Отображаем ошибку, которая приходит с бэкенда
            } else {
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } finally {
            setLoading(false); // Завершаем загрузку
        }
    };

    return (
        <div className="login-page">
            <Card className="login-card">
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom className="login-title">
                        Login
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        disabled={loading}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        disabled={loading}
                    />
                    {errorMessage && (
                        <Typography color="error" variant="body2" gutterBottom>
                            {errorMessage}
                        </Typography>
                    )}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
