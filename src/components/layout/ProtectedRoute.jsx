import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { state: { authenticated, profile,eligibleRoles,activeRoles } } = useContext(AuthContext);

    if (!authenticated || (eligibleRoles.length < 1 && activeRoles.length < 1)) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;