import { API_CONFIG } from "./api.config";

export const fetchFeedData = async () => {
	const response = await fetch(
		`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FEED}`,
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};
