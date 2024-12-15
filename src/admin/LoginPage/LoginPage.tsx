import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, TextField, Button, Typography } from '@mui/material';
import authProvider from '../../ShieldAuth/authProvider';

const LoginPage = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in both email and password.');
            return;
        }

        setLoading(true);
        try {
            await authProvider.login({ email, password });

            localStorage.setItem("authToken", "dummy-token");
            onLoginSuccess?.();
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        } finally {
            setLoading(false); // Ensure loading stops after login attempt
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
                        disabled={loading} // Disable input during loading
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        disabled={loading} // Disable input during loading
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleLogin}
                        className="login-button"
                        disabled={loading} // Disable button during loading
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;