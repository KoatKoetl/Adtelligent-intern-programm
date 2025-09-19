import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authAPI";

export const useUser = () => {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			try {
				const user = await authApi.getCurrentUser();
				return user;
			} catch (error) {
				console.error("Failed to fetch user:", error);
				queryClient.setQueryData(["user"], null);
				return null;
			}
		},
		// The user data becomes stale after 5 minutes, triggering a background re-fetch
		staleTime: 1000 * 60 * 5,
	});
};
