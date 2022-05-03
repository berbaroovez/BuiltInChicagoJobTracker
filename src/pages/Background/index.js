console.log("Background pages bitches");

chrome.webRequest.onHeadersReceived.addListener(
	(result) => {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			(tabs) => {
				console.log("Tabs", tabs);
				// send a message to current tab
				chrome.tabs.sendMessage(tabs[0].id, { url: result.url });
			},
		);
		return true;
	},
	{
		types: ["xmlhttprequest"],

		//these are the urls that we look sniff for from the request tab
		urls: [
			"https://api.builtin.com/services/job-retrieval/legacy-*",
			"http://api.builtin.com/services/job-retrieval/legacy-*",
		],
	},
	[],
);
