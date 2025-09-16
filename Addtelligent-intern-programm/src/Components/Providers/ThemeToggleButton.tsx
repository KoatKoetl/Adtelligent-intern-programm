import { useTheme } from "../../providers/useTheme";
import DefaultButton from "../DefaultButton";

export const ThemeToggleButton = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div>
			<DefaultButton onClick={toggleTheme}>
				{theme === "light" ? "🌙 Dark" : "☀️ Light"}
			</DefaultButton>
		</div>
	);
};
