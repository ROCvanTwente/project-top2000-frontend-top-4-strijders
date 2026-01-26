import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isLoggedIn, IsAdmin } = useAuth();

    if (isLoggedIn()) {
        return <Navigate to="/" replace />;
    }

    return children;
}