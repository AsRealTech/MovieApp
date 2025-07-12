import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";


const DashboardLayout = () => {
    const [logUserToken, setLogUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userToken = sessionStorage.getItem('token');
        setLogUserToken(userToken);
        setIsLoading(false); // done checking
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Or a spinner/loading component
    }

    if (!logUserToken) {
        return <Navigate to="/login" />;
    }
    
    return <Outlet logUserToken />;
}
 
export default DashboardLayout;