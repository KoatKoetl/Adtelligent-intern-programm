import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "../api/authAPI";

export const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApi.login,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			console.log("Login successful!");
			setTimeout(() => navigate("/news"), 0);
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			console.log("Registration successful!");
			setTimeout(() => navigate("/login"), 0);
		},
		onError: (error) => {
			console.error("Registration failed:", error.message);
		},
	});
};
