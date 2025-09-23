import { API_CONFIG } from "./api.config";

export const fetchArticleDetails = async (url: string) => {
	const response = await fetch(
		`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ARTICLE}?url=${encodeURIComponent(url)}`,
	);
	if (!response.ok) {
		throw new Error("Failed to fetch article details");
	}
	return response.json();
};
