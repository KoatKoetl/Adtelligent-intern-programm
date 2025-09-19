import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "../api/authAPI";

export const useLogout = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApi.logout,
		onSuccess: () => {
			queryClient.setQueryData(["user"], null);
			navigate("/");
		},
	});
};
