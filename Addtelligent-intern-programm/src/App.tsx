import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router";
import { ThemeProvider } from "./providers/ThemeProvider";
import RoutesComponent from "./routes/routes";

const queryClient = new QueryClient();

function App() {
	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<Router>
					<div className="max-w-[1440px] mx-auto">
						<RoutesComponent />
					</div>
				</Router>
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
