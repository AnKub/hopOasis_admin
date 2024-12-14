import { AppBar, AppBarProps, useResourceContext } from "react-admin";
import { Button, CircularProgress, Toolbar, Typography } from "@mui/material";
import { useState, useCallback } from "react";
import axios from "axios";

// Новый URL для ревалидации
const REVALIDATE_URL = "https://friendly-feynma-1-0.onrender.com/api/revalidate/main";

const labels: { [key: string]: string } = {
    'beers': 'Beers',
    'snacks': 'Snacks',
    'ciders': 'Ciders',
    'special-offers': 'Special Offers'
};

const CustomAppBar = (props: AppBarProps) => {
    const [loadingReval, setLoadingReval] = useState(false);
    const resource = useResourceContext();

    const revalidateData = useCallback(async () => {
        try {
            const response = await axios.get(REVALIDATE_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}` // Токен добавлен
                }
            });

            if (response.status === 200) {
                console.log("Revalidation successful:", response.data);
            } else {
                console.warn("Revalidation returned non-200 status:", response.status);
            }
        } catch (error) {
            console.error("Error during revalidation:", error);
        }
    }, []);

    const handleRevalidateData = async () => {
        setLoadingReval(true);
        await revalidateData();
        setLoadingReval(false);
    };

    const getReadableTitle = useCallback(() => {
        if (!resource) return 'My Admin';
        return labels[resource as keyof typeof labels] || resource.charAt(0).toUpperCase() + resource.slice(1);
    }, [resource]);

    return (
        <AppBar {...props}>
            <Toolbar className="toolbar-container">
                <Typography className="toolbar-title">
                    {getReadableTitle()}
                </Typography>
                <div className="toolbar-actions">
                    <Button 
                        onClick={handleRevalidateData} 
                        disabled={loadingReval} 
                        variant="contained"
                    >
                        {loadingReval ? <CircularProgress size={24} /> : "Reval"}
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;
