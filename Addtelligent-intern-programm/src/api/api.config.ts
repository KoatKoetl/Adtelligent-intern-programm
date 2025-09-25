export const API_CONFIG = {
	USE_MOCK: false,
	BASE_URL: import.meta.env.VITE_API_BASE_URL,
	ENDPOINTS: {
		LOGIN: "/auth/login",
		REGISTER: "/auth/register",
		CURRENT_USER: "/auth/me",
		LOGOUT: "/auth/logout",
		FEED: "/feed",
		ARTICLE: "/feed/article",
	},
};
