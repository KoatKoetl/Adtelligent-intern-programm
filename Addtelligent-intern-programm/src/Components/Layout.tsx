import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen bg-white dark:bg-dark-theme-500 text-black dark:text-white">
			<Header />
			<div className="max-w-[1440px] mx-auto">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
