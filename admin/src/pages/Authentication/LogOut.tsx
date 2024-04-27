import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";

const Logout: React.FC = () => {
    const { setUser } = useAuthStore();
    const [isUserLogout, setIsUserLogout] = React.useState<boolean>(false);
    React.useEffect(() => {
        setUser(null);
        setIsUserLogout(true);
    }
    , [setUser]);
    
    
    return isUserLogout ? <Navigate to="/login" /> : null;
}

export default Logout;
