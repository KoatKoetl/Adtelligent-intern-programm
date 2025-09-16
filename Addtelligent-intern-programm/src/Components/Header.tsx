import { Link } from "react-router";
import ViteLogo from "../assets/vite.svg?react";
import { useAuthStore } from "../store/authStore";
import DefaultButton from "./DefaultButton";
import { ThemeToggleButton } from "./Providers/ThemeToggleButton";

const Header = () => {
	const { isLoggedIn, logout } = useAuthStore();

	return (
		<header className="sticky top-0 z-1 border-b-1 bg-white border-gray-100 shadow-md dark:bg-dark-theme-800 text-black dark:text-white dark:border-gray-800">
			<div className="wrapper relative z-1 flex items-center justify-between px-8 py-2 max-w-[1440px] mx-auto">
				<div className="flex gap-1">
					<Link to="/">
						<ViteLogo />
					</Link>
				</div>

				{!isLoggedIn ? (
					<div className="flex gap-1">
						<Link to="/login">
							<DefaultButton>Login</DefaultButton>
						</Link>
						<ThemeToggleButton />
					</div>
				) : (
					<>
						<Link to="/news">
							<DefaultButton>News list</DefaultButton>
						</Link>

						<div className="flex gap-1">
							<DefaultButton onClick={logout}>Logout</DefaultButton>
							<ThemeToggleButton />
						</div>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
