import { lazy } from "react";

const NewsList = lazy(() => import("../Components/NewsList"));

const NewsListPage = () => {
	return <NewsList />;
};

export default NewsListPage;
