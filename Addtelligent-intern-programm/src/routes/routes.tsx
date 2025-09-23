import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Loader from "../Components/Loader";
import { HomePage } from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoutes";

const RegistrationPage = lazy(() => import("../pages/RegistrationPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const NewsListPage = lazy(() => import("../pages/NewsListPage"));
const NewsDetailPage = lazy(() => import("../pages/NewsDetailPage"));

const RoutesComponent = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />

			{/* Страницы для НЕ авторизованных */}
			<Route element={<ProtectedRoute authenticate={false} />}>
				<Route
					path="/login"
					element={
						<Suspense fallback={<Loader />}>
							<LoginPage />
						</Suspense>
					}
				/>
				<Route
					path="/register"
					element={
						<Suspense fallback={<Loader />}>
							<RegistrationPage />
						</Suspense>
					}
				/>
			</Route>

			{/* Страницы только для авторизованных */}
			<Route element={<ProtectedRoute authenticate />}>
				<Route
					path="/news"
					element={
						<Suspense fallback={<Loader />}>
							<NewsListPage />
						</Suspense>
					}
				/>
				<Route
					path="/news/:id"
					element={
						<Suspense fallback={<Loader />}>
							<NewsDetailPage />
						</Suspense>
					}
				/>
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
