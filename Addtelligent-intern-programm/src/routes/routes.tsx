// src/RoutesComponent.tsx
import { Route, Routes } from "react-router";

const RoutesComponent = () => {
	return (
		<Routes>
			<Route path="/news" element={<h1>News</h1>} />
			<Route path="/news/:id" element={<h1>News detail</h1>} />
		</Routes>
	);
};

export default RoutesComponent;
