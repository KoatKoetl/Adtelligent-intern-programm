import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "../api/authAPI";

export const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApi.login,
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data);
			console.log("Login successful!");
			setTimeout(() => {
				navigate("/news");
			}, 0);
		},
		onError: (error) => {
			console.error("Login failed:", error.message);
		},
	});
};

export const useRegister = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApi.register,
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data);
			console.log("Registration successful!");
			setTimeout(() => {
				navigate("/news");
			}, 0);
		},
		onError: (error) => {
			console.error("Registration failed:", error.message);
		},
	});
};
