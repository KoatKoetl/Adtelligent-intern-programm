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

export interface NewsItem {
	author: string;
	description: string;
	feedUrl: string;
	guid: string;
	id: string;
	link: string;
	pubDate: string;
	title: string;
	imageUrl?: string;
}
