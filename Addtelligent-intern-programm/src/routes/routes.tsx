import { Route, Routes } from "react-router";
import { HomePage } from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NewsDetailPage from "../pages/NewsDetailPage";
import NewsListPage from "../pages/NewsListPage";
import RegistrationPage from "../pages/RegistrationPage";
import ProtectedRoute from "./ProtectedRoutes";

const RoutesComponent = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />

			{/* Страницы для НЕ авторизованных */}
			<Route element={<ProtectedRoute authenticate={false} />}>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegistrationPage />} />
			</Route>

			{/* Страницы только для авторизованных */}
			<Route element={<ProtectedRoute authenticate />}>
				<Route path="/news" element={<NewsListPage />} />
				<Route path="/news/:id" element={<NewsDetailPage />} />
			</Route>

			<Route
				path="*"
				element={
					<h1 className="min-h-[calc(100vh-56px-70px)] text-7xl flex flex-col items-center justify-center">
						<span>404</span>
						<span>Not Found</span>
					</h1>
				}
			/>
		</Routes>
	);
};

export default RoutesComponent;
