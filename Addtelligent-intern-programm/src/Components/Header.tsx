// import { Link } from "react-router";

import { Link } from "react-router";
import { Button } from "./Button/Button";
import { ThemeToggleButton } from "./Providers/ThemeToggleButton";

const Header = () => {
	return (
		<header className="sticky top-0 z-1 border-b-1 bg-white border-gray-100 shadow-md dark:bg-dark-theme-800 text-black dark:text-white dark:border-gray-800">
			<div className="wrapper relative z-1 flex items-center justify-between px-8 py-2 max-w-[1440px] mx-auto">
				<div className="flex gap-1">
					<Link to="/">
						<img src="vite.svg" alt="" />
					</Link>
				</div>
				<div className="flex gap-1">
					<Link to="/news">
						<Button variant="secondary" size="md">
							News list
						</Button>
					</Link>
				</div>
				<div className="flex gap-1">
					<Link to="/login">
						<Button variant="secondary" size="md">
							Login
						</Button>
					</Link>
					<ThemeToggleButton />
				</div>
			</div>
		</header>
	);
};

export default Header;
