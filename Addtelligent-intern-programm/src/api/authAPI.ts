import { API_CONFIG } from "./api.config";
import { mockAuthApi } from "./mockApi";
import { realAuthApi } from "./realAPI";

export const authApi = API_CONFIG.USE_MOCK ? mockAuthApi : realAuthApi;
