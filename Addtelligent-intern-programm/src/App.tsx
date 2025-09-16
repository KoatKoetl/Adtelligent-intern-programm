import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router";
import Header from "./Components/Header";
import { ThemeProvider } from "./providers/ThemeProvider";
import RoutesComponent from "./routes/routes";

const queryClient = new QueryClient();

function App() {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<div className="min-h-screen bg-white dark:bg-dark-theme-500 text-black dark:text-white">
					<Router>
						<Header />
						<div className="max-w-[1440px] mx-auto">
							<RoutesComponent />
						</div>
					</Router>
				</div>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
