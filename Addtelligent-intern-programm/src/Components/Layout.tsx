import AdSlot from "./AdSlot";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen bg-white dark:bg-dark-theme-500 text-black dark:text-white">
			<Header />
			<AdSlot slotId="after-header" className="my-4" />
			<div className="max-w-[1440px] mx-auto">{children}</div>
			<AdSlot slotId="before-footer" className="my-4" />
			<Footer />
		</div>
	);
};

export default Layout;
