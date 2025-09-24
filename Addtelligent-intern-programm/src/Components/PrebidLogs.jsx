import { useEffect, useState } from "react";
import AdSlot from "./AdSlot";

const PrebidLogs = () => {
	const [logs, setLogs] = useState([]);
	const [prebidStatus, setPrebidStatus] = useState("checking");

	useEffect(() => {
		const checkPrebid = () => {
			if (window?.pbjs) {
				setPrebidStatus("loaded");
				return true;
			} else {
				setPrebidStatus("not_loaded");
				return false;
			}
		};

		if (!checkPrebid()) {
			const timeout = setTimeout(() => {
				if (!checkPrebid()) {
					console.warn("Prebid.js не загружен после ожидания");
				}
			}, 2000);

			return () => clearTimeout(timeout);
		}

		const logEvent = (eventName, data) => {
			// console.log(`[Prebid Event] ${eventName}:`, data);
			setLogs((prevLogs) => {
				const newLog = {
					eventName,
					data,
					timestamp: new Date().toLocaleTimeString(),
				};
				return [...prevLogs, newLog];
			});
		};

		const events = [
			"bidRequested",
			"bidResponse",
			"bidWon",
			"auctionEnd",
			"noBid",
			"auctionInit",
			"bidAdjustment",
		];

		const eventHandlers = {};
		events.forEach((event) => {
			const handler = (data) => logEvent(event, data);
			eventHandlers[event] = handler;
			window.pbjs.onEvent(event, handler);
		});

		logEvent("component_initialized", {
			message: "PrebidLogs component initialized",
			prebidVersion: window.pbjs?.version || "unknown",
		});

		return () => {
			events.forEach((event) => {
				if (eventHandlers[event]) {
					window.pbjs.offEvent(event, eventHandlers[event]);
				}
			});
		};
	}, []);

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<div className="mb-6">
				<h2 className="text-2xl font-bold mb-4">Prebid Logs Monitor</h2>
				<AdSlot slotId="test-1" />
			</div>

			<AdSlot slotId="test-2" />

			<div className="bg-gray-50 rounded-lg p-4 m-2">
				<h3 className="text-lg font-semibold mb-3">
					Event Logs ({logs.length})
				</h3>

				{logs.length === 0 ? (
					<div className="text-gray-500 italic">
						No logs yet.{" "}
						{prebidStatus === "loaded"
							? "Waiting for Prebid events..."
							: "Make sure Prebid.js is properly loaded."}
					</div>
				) : (
					<div className="space-y-2 max-h-[70svh] overflow-y-auto">
						{logs.map((log, index) => (
							<div
								key={index++}
								className="bg-white p-3 rounded border-l-4 border-blue-400"
							>
								<div className="flex justify-between items-start mb-1">
									<strong className="text-blue-600">{log.eventName}</strong>
									<span className="text-xs text-gray-500">{log.timestamp}</span>
								</div>
								<pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap">
									{JSON.stringify(log.data, null, 2)}
								</pre>
							</div>
						))}
					</div>
				)}
			</div>

			<AdSlot slotId="test-3" />
		</div>
	);
};

export default PrebidLogs;
