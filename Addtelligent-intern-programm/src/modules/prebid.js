const PREBID_TIMEOUT = 1000;
const PLACEMENT_METHOD = "beforeend";
const MAX_WAIT_TIME = 500;
const POLL_INTERVAL = 100;

class AdManager {
	constructor() {
		this.initialized = false;
		this.currentPath = window.location.pathname;
		this.adUnits = [
			{
				code: "ad-frame-1",
				targetSelector: "header + div",
				mediaTypes: { banner: { sizes: [[970, 90]] } },
				bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
			},
			{
				code: "ad-frame-2",
				targetSelector: "p > span",
				mediaTypes: { banner: { sizes: [[728, 90]] } },
				bids: [{ bidder: "bidmatic", params: { source: 886409 } }],
			},
			{
				code: "ad-frame-3",
				targetSelector: "p > li:nth-of-type(3)",
				mediaTypes: { banner: { sizes: [[728, 90]] } },
				bids: [{ bidder: "bidmatic", params: { source: 886409 } }],
			},
			{
				code: "ad-frame-4",
				targetSelector: "#google-ad-frame-2",
				mediaTypes: { banner: { sizes: [[728, 90]] } },
				bids: [{ bidder: "bidmatic", params: { source: 886409 } }],
			},
			{
				code: "ad-frame-5",
				targetSelector: "h1:not(.MuiPaper-root h1)",
				mediaTypes: { banner: { sizes: [[728, 90]] } },
				bids: [{ bidder: "bidmatic", params: { source: 886409 } }],
			},
		];

		this.init();
	}

	init() {
		this.setupNavigationListener();
		this.initializePrebid();
		this.initialized = true;
		console.log("AdManager initialized");
	}

	setupNavigationListener() {
		window.addEventListener("popstate", () => {
			this.handleRouteChange();
		});

		const originalPushState = history.pushState;
		const originalReplaceState = history.replaceState;

		history.pushState = (...args) => {
			originalPushState.apply(history, args);
			this.handleRouteChange();
		};

		history.replaceState = (...args) => {
			originalReplaceState.apply(history, args);
			this.handleRouteChange();
		};
	}

	async handleRouteChange() {
		const newPath = window.location.pathname;

		if (newPath !== this.currentPath) {
			console.log(`Route changed from ${this.currentPath} to ${newPath}`);
			this.currentPath = newPath;

			await this.waitForAllAdTargets();
			this.refreshAds();
		}
	}

	async initializePrebid() {
		window.pbjs = window.pbjs || {};
		window.pbjs.que = window.pbjs.que || [];

		await this.waitForAllAdTargets();
		this.loadInitialAds();
	}

	async waitForElement(selector, timeout = MAX_WAIT_TIME) {
		return new Promise((resolve) => {
			const startTime = Date.now();

			const checkElement = () => {
				const element = document.querySelector(selector);

				if (element) {
					resolve(element);
					return;
				}

				if (Date.now() - startTime >= timeout) {
					console.warn(`Timeout waiting for element: ${selector}`);
					resolve(null);
					return;
				}

				setTimeout(checkElement, POLL_INTERVAL);
			};

			checkElement();
		});
	}

	async createAdContainer(adUnitCode, targetSelector) {
		const targetElement = await this.waitForElement(targetSelector);

		if (!targetElement) {
			console.error(
				`Target element for ad unit ${adUnitCode} not found: ${targetSelector}`,
			);
			return null;
		}

		const existing = document.getElementById(adUnitCode);
		if (existing) {
			console.log(`Ad container ${adUnitCode} already exists. Reusing.`);
			return existing;
		}

		const newDiv = document.createElement("div");
		newDiv.id = adUnitCode;
		newDiv.className = "ad-container-dynamic";
		newDiv.style.display = "flex";
		newDiv.style.justifyContent = "center";

		try {
			targetElement.insertAdjacentElement(PLACEMENT_METHOD, newDiv);
			console.log(`Created ad container: ${adUnitCode}`);
			return newDiv;
		} catch (e) {
			console.error(`Failed to insert ad container ${adUnitCode}:`, e);
			return null;
		}
	}

	clearAdContainerContent(adUnitCode) {
		const container = document.getElementById(adUnitCode);
		if (container) {
			container.innerHTML = "";
			console.log(`Cleared content of ad container: ${adUnitCode}`);
		}
	}

	async renderAd(adUnitCode, targetSelector, winningBid) {
		const containerDiv = await this.createAdContainer(
			adUnitCode,
			targetSelector,
		);

		if (!containerDiv) {
			console.error(`Failed to create/find container for ${adUnitCode}`);
			return false;
		}

		containerDiv.innerHTML = "";

		const iframe = document.createElement("iframe");
		iframe.id = `pbjs-iframe-${adUnitCode}`;
		iframe.width = String(winningBid.width || "auto");
		iframe.height = String(winningBid.height || "auto");
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("scrolling", "no");
		iframe.style.border = "none";

		containerDiv.appendChild(iframe);

		const doc = iframe.contentDocument || iframe.contentWindow?.document;

		if (doc) {
			try {
				window.pbjs.renderAd(doc, winningBid.adId);
				console.log(`Ad rendered successfully for ${adUnitCode}`);
			} catch (error) {
				console.error(`Error rendering ad for ${adUnitCode}:`, error);
			}
		}

		return true;
	}

	loadInitialAds() {
		console.log("Loading initial ads...");

		window.pbjs.addAdUnits(this.adUnits);

		window.pbjs.requestBids({
			timeout: PREBID_TIMEOUT,
			adUnitCodes: this.adUnits.map((unit) => unit.code),
			bidsBackHandler: async (_bidResponse) => {
				for (const unit of this.adUnits) {
					const bids = window.pbjs.getHighestCpmBids(unit.code);
					console.log(`Highest CPM bids for ${unit.code}:`, bids);

					if (bids.length > 0) {
						const winningBid = bids[0];
						await this.renderAd(unit.code, unit.targetSelector, winningBid);
					} else {
						console.log(`No highest CPM bids received for ${unit.code}`);
					}
				}
			},
		});
	}

	refreshAds() {
		if (!this.initialized) return;

		console.log("Refreshing ads for route:", this.currentPath);

		window.pbjs?.que?.push(() => {
			this.adUnits.forEach((unit) => {
				this.clearAdContainerContent(unit.code);
				window.pbjs.removeAdUnit(unit.code);
			});

			window.pbjs.addAdUnits(this.adUnits);

			window.pbjs.requestBids({
				timeout: PREBID_TIMEOUT,
				adUnitCodes: this.adUnits.map((unit) => unit.code),
				bidsBackHandler: async (_bidResponse) => {
					for (const unit of this.adUnits) {
						const bids = window.pbjs.getHighestCpmBids(unit.code);

						if (bids.length > 0) {
							const winningBid = bids[0];
							await this.renderAd(unit.code, unit.targetSelector, winningBid);
						} else {
							console.log(`No refresh bids received for ${unit.code}`);
						}
					}
				},
			});
		});
	}

	async waitForAllAdTargets() {
		console.log("Waiting for all ad target elements...");
		const promises = this.adUnits.map((unit) =>
			this.waitForElement(unit.targetSelector),
		);
		await Promise.all(promises);
		console.log("All ad targets checked.");
	}
}

function initializeAdManager() {
	const checkDOMReady = () => {
		const hasBasicStructure =
			document.querySelector("header") && document.querySelector("body");

		if (hasBasicStructure) {
			window.adManager = new AdManager();
		} else {
			console.log("Waiting for basic DOM structure...");
			setTimeout(checkDOMReady, 100);
		}
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", checkDOMReady);
	} else {
		checkDOMReady();
	}
}

initializeAdManager();
