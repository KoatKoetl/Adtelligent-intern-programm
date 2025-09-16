import { createContext } from "react";

type Theme = "light" | "dark";

export interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { type Theme, ThemeContext };
