import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface RegisterUser {
	id: string;
	username: string;
	email: string;
}
interface LoginUser {
	id: string;
	email: string;
}

interface AuthState {
	user: RegisterUser | LoginUser | null;
	isLoggedIn: boolean;
	login: (user: RegisterUser | LoginUser) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isLoggedIn: false,
			login: (user: RegisterUser | LoginUser) =>
				set({ user, isLoggedIn: true }),
			logout: () => set({ user: null, isLoggedIn: false }),
		}),
		{
			name: "auth-storage", // ключ в sessionStorage
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
