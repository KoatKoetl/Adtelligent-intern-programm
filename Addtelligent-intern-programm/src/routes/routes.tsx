// src/RoutesComponent.tsx
import { Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";

const RoutesComponent = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<h1>Login</h1>} />
			<Route path="/register" element={<RegistrationPage />} />
			<Route path="/news" element={<h1>News</h1>} />
			<Route path="/news/:id" element={<h1>News detail</h1>} />
		</Routes>
	);
};

export default RoutesComponent;
