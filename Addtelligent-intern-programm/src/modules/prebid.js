const adUnits = [
	{
		code: "ad-frame-1",
		targetSelector: "header + div",
		bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
		mediaTypes: {
			banner: {
				sizes: [
					[970, 90],
					[728, 90],
				],
			},
		},
	},
	{
		code: "ad-frame-2",
		bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
		targetSelector: ".MuiTypography-root.MuiTypography-body1",
		mediaTypes: {
			banner: {
				sizes: [[728, 90]],
			},
		},
	},
	{
		code: "ad-frame-3",
		bids: [{ bidder: "bidmatic", params: { source: 11111 } }],
		targetSelector: ".MuiStack-root",
		mediaTypes: {
			banner: {
				sizes: [
					[728, 90],
					[970, 250],
					[970, 90],
				],
			},
		},
	},
	{
		code: "ad-frame-4",
		bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
		targetSelector: "p:nth-of-type(2)",
		mediaTypes: {
			banner: {
				sizes: [[728, 90]],
			},
		},
	},
	{
		code: "ad-frame-5",
		bids: [{ bidder: "adtelligent", params: { aid: 350975 } }],
		targetSelector: "header + iframe + div > div:nth-of-type(2)",
		mediaTypes: {
			banner: {
				sizes: [[970, 90]],
			},
		},
	},
	{
		code: "ad-frame-6",
		bids: [{ bidder: "bidmatic", params: { source: 886409 } }],
		targetSelector: "#google-ad-frame-2",
		mediaTypes: {
			banner: {
				sizes: [[300, 250]],
			},
		},
	},
];

function runAdAuction() {
	window.pbjs = window.pbjs || {};
	pbjs.que = pbjs.que || [];

	pbjs.que.push(() => {
		adUnits.forEach((adUnit) => {
			pbjs.addAdUnits(adUnit);
		});

		pbjs.requestBids({
			bidsBackHandler: (_bidResponse) => {
				adUnits.forEach((adUnit) => {
					const bids = pbjs.getHighestCpmBids(adUnit.code);
					console.log(bids);

					if (bids.length > 0) {
						renderAdUnit(adUnit, bids[0]);
					} else {
						console.log(`No bids for ${adUnit.code}`);
					}
				});
			},
		});
	});
}

// Function select the target element if it isn't available right away on page load
function renderAdUnit(adUnit, winningBid, maxAttempts = 10, delay = 200) {
	const targetSelector = adUnit.targetSelector;
	if (!targetSelector) {
		return;
	}
	let attempts = 0;

	const intervalId = setInterval(() => {
		const selectedPlace = document.querySelector(targetSelector);

		if (selectedPlace?.parentNode) {
			clearInterval(intervalId);

			console.log(`Target found for ${adUnit.code}. Rendering now.`);

			const iframe = document.createElement("iframe");
			iframe.id = adUnit.code;
			iframe.frameBorder = 0;
			iframe.scrolling = "no";
			iframe.style.border = "none";

			const [width, height] = winningBid.size.split("x").map(Number);
			iframe.width = width;
			iframe.height = height;
			selectedPlace.parentNode.insertBefore(iframe, selectedPlace);

			try {
				const doc = iframe.contentWindow.document;
				doc.body.style.margin = "0";
				pbjs.renderAd(doc, winningBid.adId);
			} catch (e) {
				console.error(`Final Render failed for ${adUnit.code}:`, e);
			}
		} else if (attempts >= maxAttempts) {
			clearInterval(intervalId);
			console.warn(
				`Element not found after ${maxAttempts} attempts for selector: ${targetSelector}`,
			);
		}

		attempts++;
	}, delay);
}

runAdAuction();
