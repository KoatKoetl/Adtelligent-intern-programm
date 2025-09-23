import { Navigate, Outlet } from "react-router";
import Loader from "../Components/Loader";
import { useAuthStatus } from "../hooks/useUser";

interface ProtectedRouteProps {
	authenticate?: boolean;
}

const ProtectedRoute = ({ authenticate = true }: ProtectedRouteProps) => {
	const { isAuthenticated, isLoading } = useAuthStatus();

	if (isLoading) {
		return <Loader />;
	}

	if (authenticate && !isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	if (!authenticate && isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
