import { lazy, Suspense } from "react";
import Loader from "../Components/Loader";

const NewsDetail = lazy(() => import("../Components/NewsDetail"));

const NewsDetailPage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<NewsDetail />
		</Suspense>
	);
};

export default NewsDetailPage;
