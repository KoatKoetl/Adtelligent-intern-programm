import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router";
import Layout from "./Components/Layout";
import { ThemeProvider } from "./providers/ThemeProvider";
import RoutesComponent from "./routes/routes";

const queryClient = new QueryClient();

function App() {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<div className="min-h-screen bg-white dark:bg-dark-theme-500 text-black dark:text-white">
					<Router>
						<Layout>
							<RoutesComponent />
						</Layout>
					</Router>
				</div>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
