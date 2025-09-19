// import { API_CONFIG } from "./api.config";
import type { AuthResponse, LoginRequest, RegisterRequest } from "./api.types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let mockSessionActive = false;

export const mockAuthApi = {
	login: async (data: LoginRequest): Promise<AuthResponse> => {
		await delay(1500);

		if (!data.login || !data.password) {
			throw new Error("Login and password are required");
		}

		if (data.login === "error@test.com") {
			throw new Error("Invalid credentials");
		}

		return {
			id: crypto.randomUUID(),
			username: "Mock User",
			token: "mock-jwt-token",
		};
	},

	register: async (data: RegisterRequest): Promise<AuthResponse> => {
		await delay(2000);

		if (!data.username || !data.login || !data.password) {
			throw new Error("All fields are required");
		}

		if (data.password !== data.confirmPassword) {
			throw new Error("Passwords do not match");
		}

		if (data.login === "existing@test.com") {
			throw new Error("User already exists");
		}

		return {
			id: crypto.randomUUID(),
			username: data.username,
			token: "mock-jwt-token",
		};
	},

	getCurrentUser: async (): Promise<AuthResponse> => {
		await delay(500);

		if (!mockSessionActive) {
			throw new Error("No authenticated session found");
		}

		return {
			id: "mock-user-123",
			username: "Mock User",
			token: "mock-jwt-token",
		};
	},

	logout: async (): Promise<void> => {
		await delay(500);
		mockSessionActive = false;
		return;
	},
};
