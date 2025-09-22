import { lazy } from "react";

const NewsDetail = lazy(() => import("../Components/NewsDetail"));

const NewsDetailPage = () => {
	return <NewsDetail />;
};

export default NewsDetailPage;
