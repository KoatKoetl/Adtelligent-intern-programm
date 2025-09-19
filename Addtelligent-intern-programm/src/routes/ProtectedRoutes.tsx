import { Navigate, Outlet } from "react-router";
import Loader from "../Components/Loader";
import { useUser } from "../hooks/useUser";

interface ProtectedRouteProps {
	authenticate?: boolean;
}

const ProtectedRoute = ({ authenticate = true }: ProtectedRouteProps) => {
	const { data: user, isLoading } = useUser();

	if (isLoading) {
		return <Loader />;
	}

	const isLoggedIn = !!user;

	if (authenticate && !isLoggedIn) {
		return <Navigate to="/login" replace />;
	}

	if (!authenticate && isLoggedIn) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
