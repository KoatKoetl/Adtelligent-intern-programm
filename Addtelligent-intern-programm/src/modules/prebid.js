const PREBID_TIMEOUT = 1000;
const PLACEMENT_METHOD = "afterend";

const initializePrebid = () => {
	window.pbjs = window.pbjs || {};
	window.pbjs.que = window.pbjs.que || [];

	const adUnits = [
		{
			code: "ad-frame-1",
			targetSelector: "#after-header",
			mediaTypes: { banner: { sizes: [[970, 90]] } },
			bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
		},
		{
			code: "ad-frame-2",
			targetSelector: "#before-footer",
			mediaTypes: { banner: { sizes: [[728, 90]] } },
			bids: [{ bidder: "bidmatic", params: { source: 886409 } }],
		},
	];

	/**
	 * Finds a target element and inserts a new container element relative to it.
	 * @param {string} adUnitCode The ad unit code (used for the container ID).
	 * @param {string} targetSelector The selector for the element to place the ad inside/around.
	 * @returns {HTMLElement|null} The created DIV element, or null if placement fails.
	 */
	function createAdContainer(adUnitCode, targetSelector) {
		const targetElement = document.querySelector(targetSelector);
		if (!targetElement) {
			console.error(
				`Target element for ad unit ${adUnitCode} not found: ${targetSelector}`,
			);
			return null;
		}

		if (document.getElementById(adUnitCode)) {
			console.warn(
				`Ad container ${adUnitCode} already exists. Skipping creation.`,
			);
			return document.getElementById(adUnitCode);
		}

		const newDiv = document.createElement("div");
		newDiv.id = adUnitCode;
		newDiv.className = "ad-container-dynamic";

		try {
			targetElement.insertAdjacentElement(PLACEMENT_METHOD, newDiv);
			return newDiv;
		} catch (e) {
			console.error(
				`Failed to insert element using method ${PLACEMENT_METHOD}:`,
				e,
			);
			return null;
		}
	}

	function initPrebid() {
		window.pbjs.addAdUnits(adUnits);

		window.pbjs.requestBids({
			timeout: PREBID_TIMEOUT,
			bidsBackHandler: (_bidResponse) => {
				adUnits.forEach((unit) => {
					const adUnitCode = unit.code;
					const targetSelector = unit.targetSelector;

					const bids = window.pbjs.getHighestCpmBids(adUnitCode);

					if (bids.length > 0) {
						const winningBid = bids[0];

						const containerDiv = createAdContainer(adUnitCode, targetSelector);

						if (containerDiv) {
							containerDiv.style.display = "flex";
							containerDiv.style.justifyContent = "center";
							containerDiv.innerHTML = "";

							const iframe = document.createElement("iframe");
							iframe.id = `pbjs-iframe-${adUnitCode}`;
							iframe.width = winningBid.width
								? String(winningBid.width)
								: "auto";
							iframe.height = winningBid.height
								? String(winningBid.height)
								: "auto";
							iframe.setAttribute("frameborder", "0");
							iframe.setAttribute("scrolling", "no");
							iframe.style.border = "none";

							containerDiv.appendChild(iframe);

							const doc = iframe.contentWindow
								? iframe.contentWindow.document
								: null;

							if (doc) {
								window.pbjs.renderAd(doc, winningBid.adId);
								console.log(`Ad rendered dynamically for ${adUnitCode}.`);
							}
						}
					} else {
						console.log(
							`No bids received for ${adUnitCode}. No ad container created.`,
						);
					}
				});
			},
		});
	}

	function clearAdContainerContent(adUnitCode) {
		const container = document.getElementById(adUnitCode);
		if (container) {
			container.innerHTML = "";
			console.log(`Cleared content of ad container: ${adUnitCode}`);
		}
	}

	function refreshAds() {
		console.log("Starting ad refresh process (No container destruction)...");

		adUnits.forEach((unit) => {
			const adUnitCode = unit.code;
			clearAdContainerContent(adUnitCode);
			window.pbjs.removeAdUnit(adUnitCode);
		});

		window.pbjs.addAdUnits(adUnits);

		window.pbjs.requestBids({
			timeout: PREBID_TIMEOUT,
			bidsBackHandler: (bidResponse) => {
				console.log("Bids received:", bidResponse);

				adUnits.forEach((unit) => {
					const adUnitCode = unit.code;
					const bids = window.pbjs.getHighestCpmBids(adUnitCode);

					if (bids.length > 0) {
						const winningBid = bids[0];

						const containerDiv = document.getElementById(adUnitCode);

						if (containerDiv) {
							const iframe = document.createElement("iframe");
							iframe.id = `pbjs-iframe-${adUnitCode}`;
							iframe.width = winningBid.width
								? String(winningBid.width)
								: "728";
							iframe.height = winningBid.height
								? String(winningBid.height)
								: "90";
							iframe.setAttribute("frameborder", "0");
							iframe.setAttribute("scrolling", "no");
							iframe.style.border = "none";

							containerDiv.appendChild(iframe);

							const doc = iframe.contentWindow
								? iframe.contentWindow.document
								: null;

							if (doc) {
								window.pbjs.renderAd(doc, winningBid.adId);
								console.log(`Ad rendered dynamically for ${adUnitCode}.`);
							}
						} else {
							console.error(
								`Container div ${adUnitCode} not found for refresh.`,
							);
						}
					} else {
						console.log(`No bids received for ${adUnitCode}.`);
					}
				});
			},
		});
	}

	window.refreshAds = refreshAds;
	window.pbjs.que.push(initPrebid);
};

document.addEventListener("DOMContentLoaded", initializePrebid);
