import { lazy } from "react";

const RegisterForm = lazy(() => import("../Components/Forms/RegistrationForm"));

const RegistrationPage = () => {
	return <RegisterForm />;
};

export default RegistrationPage;
