import { useQuery } from "@tanstack/react-query";
import { fetchArticleDetails } from "../api/api.fetchHtml";

export const useFeed = (url: string) => {
	return useQuery({
		queryKey: ["feedData", url],
		queryFn: async () => {
			try {
				const data = await fetchArticleDetails(url);
				return data;
			} catch (error) {
				if (error) {
					return null;
				}
				throw error;
			}
		},
	});
};

export const useFeedArticle = (url: string) => {
	const { data: articleData, isLoading, error } = useFeed(url);
	return {
		articleData,
		isLoading,
		error,
	};
};
