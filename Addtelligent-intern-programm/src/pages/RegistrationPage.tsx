import { lazy, Suspense } from "react";
import Loader from "../Components/Loader";

const RegisterForm = lazy(() => import("../Components/RegistrationForm"));

const RegistrationPage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<RegisterForm />
		</Suspense>
	);
};

export default RegistrationPage;
