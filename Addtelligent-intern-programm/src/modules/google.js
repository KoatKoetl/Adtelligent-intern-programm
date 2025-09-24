const GOOGLE_TIMEOUT = 1000;
const PLACEMENT_METHOD = "afterend";

const GOOGLE_PUBLISHER_ID = "/6355419/Travel";

const IS_LOCALHOST =
	window.location.hostname === "localhost" ||
	window.location.hostname === "127.0.0.1" ||
	window.location.hostname.includes("localhost");

const DEBUG_MODE = false;

const initializeGoogle = () => {
	window.googletag = window.googletag || {};
	window.googletag.cmd = window.googletag.cmd || [];
	window.pbjs = window.pbjs || {};
	window.pbjs.que = window.pbjs.que || [];

	const googleAdUnits = [
		{
			code: "google-ad-frame-2",
			targetSelector: "#before-footer",
			slotName: "/6355419/Travel/Europe/France",
			mediaTypes: { banner: { sizes: [[728, 90]] } },
			bids: [{ bidder: "bidmatic", params: { source: 886409 } }],
		},
	];

	const googleSlots = new Map();
	const initializationStatus = {
		gptLoaded: false,
		slotsCreated: false,
		prebidAdded: false,
		servicesEnabled: false,
		localhostDetected: IS_LOCALHOST,
	};

	/**
	 * Debug function
	 */
	function debugLog(message, data = null) {
		if (DEBUG_MODE) {
			console.log(` [GOOGLE DEBUG] ${message}`, data || "");
		}
	}

	function handleLocalhostIssues() {
		if (IS_LOCALHOST) {
			console.warn(` Localhost detected (${window.location.hostname})`);
			console.warn("🔧 Google Ads have limitations on localhost. Consider:");
			console.warn("   1. Use ngrok or live server with real domain");
			console.warn("   2. Add localhost exceptions to browser");
			console.warn("   3. Test on staging/production environment");

			window.googletag.cmd.push(() => {
				window.googletag.pubads().set("page_url", "https://example.com/test");
				window.googletag.pubads().setForceSafeFrame(true);
			});
		}
	}

	/**
	 * Generate a container for missing selectors
	 */
	function createAdContainer(adUnitCode, targetSelector) {
		debugLog(
			`Creating container for ${adUnitCode} with selector ${targetSelector}`,
		);

		let targetElement = document.querySelector(targetSelector);

		if (!targetElement) {
			console.warn(` Target element not found: ${targetSelector}`);

			const alternatives = [
				"body",
				"main",
				"#content",
				".content",
				"header",
				"footer",
			];
			for (const alt of alternatives) {
				targetElement = document.querySelector(alt);
				if (targetElement) {
					console.warn(`🔧 Using fallback selector: ${alt}`);
					break;
				}
			}

			if (!targetElement) {
				targetElement = document.body;
				console.warn("🔧 Using document.body as last resort");
			}
		}

		if (document.getElementById(adUnitCode)) {
			debugLog(`Container ${adUnitCode} already exists`);
			return document.getElementById(adUnitCode);
		}

		const newDiv = document.createElement("div");
		newDiv.id = adUnitCode;
		newDiv.className = "google-ad-container-dynamic";
		newDiv.setAttribute("data-ad-type", "google");
		newDiv.setAttribute("data-created", new Date().toISOString());

		if (DEBUG_MODE) {
			newDiv.style.border = "2px dashed #0984e3";
			newDiv.style.minHeight = "100px";
			newDiv.style.backgroundColor = "#f1f2f6";
			newDiv.style.display = "flex";
			newDiv.style.alignItems = "center";
			newDiv.style.justifyContent = "center";
			newDiv.style.margin = "10px 0";
			newDiv.innerHTML = `
				<div style="text-align: center; padding: 20px;">
					<strong>Google Ad: ${adUnitCode}</strong><br>
					<small style="color: #666;">
						${IS_LOCALHOST ? " Localhost mode" : " Production mode"}<br>
						Slot: ${googleAdUnits.find((u) => u.code === adUnitCode)?.slotName || "Unknown"}
					</small>
				</div>`;
		}

		try {
			targetElement.insertAdjacentElement(PLACEMENT_METHOD, newDiv);
			debugLog(` Container created and inserted:`, newDiv);
			return newDiv;
		} catch (_e) {
			try {
				targetElement.appendChild(newDiv);
				debugLog(` Container created with appendChild:`, newDiv);
				return newDiv;
			} catch (e2) {
				console.error(`Failed to insert container:`, e2);
				return null;
			}
		}
	}

	function loadGooglePublisherTag() {
		return new Promise((resolve) => {
			if (window.googletag.apiReady) {
				debugLog("GPT already loaded");
				initializationStatus.gptLoaded = true;
				resolve();
				return;
			}

			const existingScript = document.querySelector('script[src*="gpt.js"]');
			if (existingScript) {
				debugLog("GPT script exists, waiting for ready...");
				const checkReady = setInterval(() => {
					if (window.googletag.apiReady) {
						clearInterval(checkReady);
						debugLog("GPT became ready");
						initializationStatus.gptLoaded = true;
						resolve();
					}
				}, 100);

				setTimeout(() => {
					clearInterval(checkReady);
					console.warn(" GPT timeout, but continuing...");
					resolve();
				}, 5000);
				return;
			}

			const script = document.createElement("script");
			script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
			script.async = true;

			script.onload = () => {
				debugLog("GPT script loaded");
				initializationStatus.gptLoaded = true;
				resolve();
			};

			script.onerror = () => {
				console.error("Failed to load GPT, using fallback...");
				resolve();
			};

			document.head.appendChild(script);
			debugLog("GPT script added to head");
		});
	}

	function createGoogleSlots() {
		return new Promise((resolve) => {
			debugLog("Creating Google slots...");

			window.googletag.cmd.push(() => {
				let slotsCreated = 0;

				googleAdUnits.forEach((unit, index) => {
					try {
						debugLog(
							`Creating slot ${index + 1}/${googleAdUnits.length}: ${unit.code}`,
						);

						const containerDiv = createAdContainer(
							unit.code,
							unit.targetSelector,
						);
						if (!containerDiv) {
							debugLog(`Failed to create container for ${unit.code}`);
							return;
						}

						const sizes = unit.mediaTypes.banner.sizes;
						const slot = window.googletag.defineSlot(
							unit.slotName,
							sizes,
							unit.code,
						);

						if (slot) {
							slot.addService(window.googletag.pubads());
							googleSlots.set(unit.code, slot);
							slotsCreated++;

							debugLog(` Slot created:`, {
								code: unit.code,
								slotName: unit.slotName,
								sizes: sizes,
							});
						} else {
							console.error(`Failed to define slot: ${unit.code}`);
						}
					} catch (error) {
						console.error(`Error creating slot ${unit.code}:`, error);
					}
				});

				debugLog(
					`Slots creation result: ${slotsCreated}/${googleAdUnits.length}`,
				);
				initializationStatus.slotsCreated = slotsCreated > 0;
				resolve();
			});
		});
	}

	function setupGoogleServices() {
		return new Promise((resolve) => {
			window.googletag.cmd.push(() => {
				try {
					debugLog("Setting up Google services...");

					window.googletag.pubads().enableSingleRequest();
					window.googletag.pubads().collapseEmptyDivs();
					window.googletag.pubads().disableInitialLoad();

					if (IS_LOCALHOST) {
						window.googletag.pubads().setForceSafeFrame(true);
						window.googletag.pubads().setCentering(true);
					}

					window.googletag
						.pubads()
						.addEventListener("slotRenderEnded", (event) => {
							const slotId = event.slot.getSlotElementId();
							debugLog("Slot render ended:", {
								slot: slotId,
								isEmpty: event.isEmpty,
								size: event.size,
								creativeId: event.creativeId,
								lineItemId: event.lineItemId,
								advertiserId: event.advertiserId,
							});

							const container = document.getElementById(slotId);
							if (container) {
								if (event.isEmpty) {
									console.warn(` Empty ad slot: ${slotId}`);
									if (DEBUG_MODE) {
										container.innerHTML = `
										<div style="padding: 20px; background: #fff3cd; border: 1px solid #ffc107; text-align: center; border-radius: 4px;">
											<strong> No Ad Available</strong><br>
											<small>Slot: ${slotId}<br>
											${IS_LOCALHOST ? "Localhost limitations may apply" : "Check ad configuration"}</small>
										</div>`;
									}
								} else {
									debugLog(` Ad rendered in ${slotId}`);
									if (DEBUG_MODE) {
										container.style.border = "2px solid #00b894";
									}
								}
							}
						});

					window.googletag.enableServices();
					debugLog(" Google services enabled");
					initializationStatus.servicesEnabled = true;
				} catch (error) {
					console.error("Error setting up Google services:", error);
				}

				resolve();
			});
		});
	}

	function initializePrebidIntegration() {
		return new Promise((resolve) => {
			window.pbjs.que.push(() => {
				try {
					debugLog("Adding Prebid ad units...");

					window.pbjs.addAdUnits(googleAdUnits);
					debugLog(" Prebid ad units added");
					initializationStatus.prebidAdded = true;
				} catch (error) {
					console.error("Error adding Prebid ad units:", error);
				}

				resolve();
			});
		});
	}

	function runPrebidAuction() {
		debugLog("Starting Prebid auction...");

		window.pbjs.que.push(() => {
			window.pbjs.requestBids({
				timeout: GOOGLE_TIMEOUT,
				bidsBackHandler: (_bidResponses) => {
					debugLog("Auction completed, processing bids...");

					const allBids = window.pbjs.getBidResponses();
					debugLog("All bid responses:", allBids);

					googleAdUnits.forEach((unit) => {
						const bids = window.pbjs.getHighestCpmBids(unit.code);

						if (bids.length > 0) {
							const winningBid = bids[0];
							debugLog(`💰 Winning bid for ${unit.code}:`, {
								bidder: winningBid.bidder,
								cpm: winningBid.cpm,
								adId: winningBid.adId,
								size: `${winningBid.width}x${winningBid.height}`,
							});

							setGoogleTargeting(unit.code, winningBid);
						} else {
							debugLog(`No bids for ${unit.code}`);
						}
					});

					setTimeout(() => {
						displayAllGoogleSlots();
					}, 100);
				},
			});
		});
	}

	function setGoogleTargeting(adUnitCode, winningBid) {
		window.googletag.cmd.push(() => {
			const slot = googleSlots.get(adUnitCode);
			if (slot) {
				const targeting = {
					hb_pb: winningBid.pbMg || "0.00",
					hb_adid: winningBid.adId || "",
					hb_bidder: winningBid.bidder || "",
					hb_size: `${winningBid.width}x${winningBid.height}`,
					hb_cpm: winningBid.cpm.toString(),
				};

				Object.entries(targeting).forEach(([key, value]) => {
					if (value) {
						slot.setTargeting(key, value);
					}
				});

				debugLog(` Targeting set for ${adUnitCode}:`, targeting);
			}
		});
	}

	function displayAllGoogleSlots() {
		debugLog("Displaying Google slots...");

		window.googletag.cmd.push(() => {
			const slotsToRefresh = [];

			googleAdUnits.forEach((unit) => {
				const slot = googleSlots.get(unit.code);
				if (slot) {
					debugLog(` Preparing to display: ${unit.code}`);

					const container = document.getElementById(unit.code);
					if (container && DEBUG_MODE) {
						container.innerHTML =
							'<div style="padding: 10px; text-align: center; color: #666;">Loading Google Ad...</div>';
					}

					window.googletag.display(unit.code);
					slotsToRefresh.push(slot);
				}
			});

			if (slotsToRefresh.length > 0) {
				setTimeout(() => {
					window.googletag.pubads().refresh(slotsToRefresh);
					debugLog(`Refreshed ${slotsToRefresh.length} slots`);
				}, 200);
			}
		});
	}

	function refreshGoogleAds() {
		debugLog("Refreshing Google ads...");

		googleAdUnits.forEach((unit) => {
			const container = document.getElementById(unit.code);
			if (container && DEBUG_MODE) {
				container.innerHTML =
					'<div style="padding: 10px; text-align: center; color: #666;">Refreshing...</div>';
			}
		});

		window.pbjs.que.push(() => {
			googleAdUnits.forEach((unit) => {
				window.pbjs.removeAdUnit(unit.code);
			});
			window.pbjs.addAdUnits(googleAdUnits);
			runPrebidAuction();
		});
	}

	function getGoogleDebugInfo() {
		const info = {
			environment: {
				isLocalhost: IS_LOCALHOST,
				hostname: window.location.hostname,
				protocol: window.location.protocol,
				publisherId: GOOGLE_PUBLISHER_ID,
			},
			initialization: initializationStatus,
			slots: Array.from(googleSlots.entries()).map(([code, slot]) => ({
				code,
				elementId: slot.getSlotElementId(),
				adUnitPath: slot.getAdUnitPath(),
				sizes: slot.getSizes(),
				hasContainer: !!document.getElementById(code),
			})),
			prebid: {
				version: window.pbjs?.version || "Unknown",
				adUnits: window.pbjs?.getAdUnits?.()?.length || 0,
				installedModules: window.pbjs?.installedModules?.slice(0, 10) || [],
			},
			containers: googleAdUnits.map((unit) => ({
				code: unit.code,
				targetSelector: unit.targetSelector,
				targetExists: !!document.querySelector(unit.targetSelector),
				hasContainer: !!document.getElementById(unit.code),
				slotName: unit.slotName,
			})),
		};

		console.group(" Google Ad Manager Debug Info");
		console.table(info.containers);
		console.log("Full info:", info);
		console.groupEnd();

		return info;
	}

	/**
	 * Main initialization
	 */
	async function startGoogleInitialization() {
		try {
			debugLog(" Starting Google initialization...");

			handleLocalhostIssues();

			await loadGooglePublisherTag();
			await createGoogleSlots();
			await setupGoogleServices();
			await initializePrebidIntegration();

			runPrebidAuction();

			debugLog(" Google initialization completed");
		} catch (error) {
			console.error("Google initialization error:", error);
		}
	}

	window.refreshGoogleAds = refreshGoogleAds;
	window.getGoogleDebugInfo = getGoogleDebugInfo;

	startGoogleInitialization();
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initializeGoogle);
} else {
	setTimeout(initializeGoogle, 100);
}
