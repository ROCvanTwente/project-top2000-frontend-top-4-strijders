import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
    const { isLoggedIn, IsAdmin } = useAuth();

    switch (role) {
        case "notuser":
            if (!isLoggedIn()) return children;
            return <Navigate to="/" replace></Navigate>
        case "user":
            if (isLoggedIn()) return children;
            return <Navigate to="/login" replace></Navigate>
        case "admin":
            if (IsAdmin()) return children;
            return <Navigate to="/" replace></Navigate>
        default:
            return children;
    }
}