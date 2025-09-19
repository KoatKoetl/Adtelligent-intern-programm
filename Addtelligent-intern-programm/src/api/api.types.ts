export interface LoginRequest {
	login: string;
	password: string;
}

export interface RegisterRequest {
	username: string;
	login: string;
	password: string;
	confirmPassword: string;
}

export interface AuthResponse {
	id: string;
	username: string;
	token?: string;
}

export interface ApiError {
	message: string;
	status: number;
}
