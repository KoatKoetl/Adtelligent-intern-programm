import { lazy, Suspense } from "react";
import Loader from "../Components/Loader";

const NewsList = lazy(() => import("../Components/NewsList"));

const NewsListPage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<NewsList />
		</Suspense>
	);
};

export default NewsListPage;
