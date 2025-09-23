import { useQuery } from "@tanstack/react-query";
import { fetchFeedData } from "../api/api.feed";

export const useFeed = () => {
	return useQuery({
		queryKey: ["feedData"],
		queryFn: async () => {
			try {
				const data = await fetchFeedData();
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

export const useFeedStatus = () => {
	const { data: feedData, isLoading, error } = useFeed();

	return {
		feedData,
		isLoading,
		error,
	};
};
