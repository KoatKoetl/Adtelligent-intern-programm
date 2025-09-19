import { lazy, Suspense } from "react";
import Loader from "../Components/Loader";

const LoginForm = lazy(() => import("../Components/Forms/LoginForm"));

const LoginPage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<LoginForm />
		</Suspense>
	);
};

export default LoginPage;
