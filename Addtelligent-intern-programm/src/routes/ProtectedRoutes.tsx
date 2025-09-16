import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
	authenticate?: boolean;
}

const ProtectedRoute = ({ authenticate = true }: ProtectedRouteProps) => {
	const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

	if (authenticate && !isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	if (!authenticate && isLoggedIn) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
