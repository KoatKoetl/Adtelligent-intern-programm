import { useEffect } from "react";
import { useLocation } from "react-router";

declare global {
	interface Window {
		pbjs?: {
			que?: Array<() => void>;
			// biome-ignore lint/suspicious/noExplicitAny: <Can't specify exact Prebid type here>
			[key: string]: any;
		};
		refreshAds?: () => void;
	}
}

/**
 * Custom hook to trigger Prebid ad refresh on route change.
 * It assumes a global 'refreshAds' function exists on the window object.
 */
const useAdRefresh = () => {
	const location = useLocation();

	useEffect(() => {
		const globalRefresh = window.refreshAds;

		if (typeof globalRefresh === "function") {
			console.log(
				`Route changed to: ${location.pathname}. Triggering ad refresh.`,
			);

			const timeout = setTimeout(() => {
				if (window.pbjs?.que) {
					window.pbjs.que.push(globalRefresh);
				} else {
					globalRefresh();
				}
			}, 50);

			return () => clearTimeout(timeout);
		} else {
			console.warn(
				"Global 'refreshAds' function not found. Prebid not initialized?",
			);
		}
	}, [location.pathname]);
};

export default useAdRefresh;
