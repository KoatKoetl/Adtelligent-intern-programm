import { API_CONFIG } from "./api.config";
import type { AuthResponse, LoginRequest, RegisterRequest } from "./api.types";

export const realAuthApi = {
	login: async (data: LoginRequest): Promise<AuthResponse> => {
		const response = await fetch(
			`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Login failed");
		}

		return response.json();
	},

	register: async (data: RegisterRequest): Promise<AuthResponse> => {
		const response = await fetch(
			`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		);

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || "Registration failed");
		}

		return response.json();
	},

	getCurrentUser: async (): Promise<AuthResponse> => {
		const response = await fetch(
			`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CURRENT_USER}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		if (!response.ok) {
			throw new Error("Failed to fetch current user");
		}

		return response.json();
	},

	logout: async (): Promise<void> => {
		const response = await fetch(
			`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGOUT}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		if (!response.ok) {
			throw new Error("Logout failed");
		}

		return;
	},
};
