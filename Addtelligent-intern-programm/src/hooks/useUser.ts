import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authAPI";

export const useUser = () => {
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			try {
				const user = await authApi.getCurrentUser();
				return user;
			} catch (error) {
				if (error) {
					return null;
				}
				throw error;
			}
		},
		retry: (failureCount, error) => {
			if (error) return false;
			return failureCount < 3;
		},
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 30,
	});
};

export const useAuthStatus = () => {
	const { data: user, isLoading, error } = useUser();

	return {
		user,
		isAuthenticated: !!user,
		isLoading,
		isError: !!error,
	};
};
