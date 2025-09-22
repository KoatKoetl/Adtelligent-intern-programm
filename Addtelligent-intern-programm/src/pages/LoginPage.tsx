import { lazy } from "react";

const LoginForm = lazy(() => import("../Components/Forms/LoginForm"));

const LoginPage = () => {
	return <LoginForm />;
};

export default LoginPage;
