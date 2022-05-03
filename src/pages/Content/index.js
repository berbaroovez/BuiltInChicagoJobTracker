// import { printLine } from './modules/print';

import { getAppliedJobs } from "../../util/firebase";

// console.log('Content script works!');
// console.log('Must reload extension for modifications to take effect.');

// printLine("Using the 'printLine' function from the Print Module");

// 1. Send the background a message requesting the user's data
// chrome.runtime.sendMessage(
// 	"get-user-data",
// 	(response) => {
// 		// 3. Got an asynchronous response with the data from the background
// 		console.log("received user data", response);
// 	},
// );

//*[@id="main-content"]/div[1]/div[2]/div/section[1]/div[1]/div[2]/div/div[4]/div[1]/div[2]/a

//job-details-link class name for the smaller jobs under each company
//a.job-details-link more generalized

//Layout Info
//--------------------------------------------------------------------------------
// job-item is a collection of jobs from one company
// job-row is a single job from a comopany
// job-details-link is the link to the job which is an aboslute postion overlay
//--------------------------------------------------------------------------------

const main = async (url = "null") => {
	const jobList = await getAppliedJobs();

	console.log("Job List", jobList);

	var queryURLS = [];

	// const fetchURL = async (url) => {
	// 	const response = await fetch(url);
	// 	const json = await response.json();
	// 	// console.log("json", json);
	// 	return json;
	// };

	console.log("Running main--------------------------------");
	//fetch data from api
	// const response = await fetch(
	// 	"https://api.builtin.com/services/job-retrieval/legacy-collapsed-jobs?categories=149&subcategories=520%2C523&experiences=&industry=&regions=&locations=3%2C1%2C2%2C48%2C56%2C4&remote=2&per_page=10&page=1&search=&sortStrategy=recency&job_locations=1%7C3%2C1%7C1%2C1%7C2%2C1%7C48%2C1%7C56%2C1%7C4%2C1%7C0&company_locations=1%7C3%2C1%7C1%2C1%7C2%2C1%7C48%2C1%7C56%2C1%7C4%2C1%7C0&jobs_board=true&national=false",
	// );

	// const data = await response.json();

	// console.log("response data", data);

	//grab all the job-details-link class names
	// grabAllByClassName("job-details-link");

	let element = document.getElementsByClassName("job-item")[3];
	while (!element) {
		// console.log("Waiting for element");
		element = document.getElementsByClassName("job-item")[3];
		//add half second time out
		await new Promise((resolve) => setTimeout(resolve, 300));
	}

	//once out of while loop grab all job-row class names and turns the respective color
	//we check if url contains legacy collapsed jobs because we only want to add the handleClick listner once
	if (url.includes("legacy-collapsed-jobs")) {
		grabAllByClassName("job-row", jobList);
	}
	// var observer = new MutationObserver(function (mutations) {
	// 	console.log("Mutation detected");
	// 	console.log("mutations", mutations);
	// 	grabAllByClassName("job-row");
	// });

	// observer.observe(element, { subtree: true, childList: true });
};

const grabAllByClassName = async (label, jobList) => {
	console.log("Getting classes");
	const group = document.getElementsByClassName(label);
	// console.log("group", group);

	//turn all the backgrounds to red
	for (let i = 0; i < group.length; i++) {
		//get the job-details-link element and return the href
		let jobLink = group[i].getElementsByClassName("job-details-link")[0];
		//print out the href
		const jobURL = jobLink.href;

		const handleClick = (e) => {
			// e.preventDefault();
			console.log("Job URL", jobURL);
		};

		jobLink.addEventListener("click", handleClick);

		// jobLink.addEventListener(
		// 	"click",
		// 	(e) => {
		// 		e.preventDefault();
		// 		console.log("Job has been clicked!", jobURL);
		// 	},
		// );

		// if (jobLink.getAttribute("listener") !== "true") {
		// 	jobLink.addEventListener(
		// 		"click",
		// 		function (e) {
		// 			const elementClicked = e.target;
		// 			elementClicked.setAttribute("listener", "true");
		// 			console.log("event has been attached");
		// 		},
		// 	);
		// }

		//split job url on /job/
		const splitURL = jobURL.split("/job/");
		console.log("Split URL", splitURL);

		//if jobURL contains "senior"
		// if (
		// 	jobURL.includes("senior") ||
		// 	jobURL.includes("lead") ||
		// 	jobURL.includes("staff") ||
		// 	jobURL.includes("director") ||
		// 	jobURL.includes("manager") ||
		// 	jobURL.includes("Sr")
		// ) {
		// 	group[i].style.backgroundColor = "hsla(0, 100%, 50%, 0.5)";
		// } else {
		//go through joblist and check to see if jobURL matches title
		for (let j = 0; j < jobList.length; j++) {
			console.log(
				`jobList[j] ${jobList[j].title} === ${splitURL[1]} is ${
					jobList[j].title === splitURL[1]
				}`,
			);
			if (splitURL[1] === jobList[j].title) {
				group[i].style.backgroundColor = "hsla(120, 100%, 25%, 0.5)";
			} else if (
				jobURL.includes("senior") ||
				jobURL.includes("lead") ||
				jobURL.includes("staff") ||
				jobURL.includes("director") ||
				jobURL.includes("manager") ||
				jobURL.includes("Sr") ||
				jobURL.includes("Sr.")
			) {
				group[i].style.backgroundColor = "hsla(0, 100%, 50%, 0.5)";
			}
		} //end of checking to see if jobs is in list
		// }
	}
};

chrome.runtime.onMessage.addListener(
	(request, sender, sendResponse) => {
		console.log("New Request", request.url);
		main(request.url);
		sendResponse({ message: "Message received" });
	},
);
// main();

// let lastUrl = window.location.href;
// new MutationObserver(() => {
// 	const url = window.location.href;
// 	if (url !== lastUrl) {
// 		lastUrl = url;
// 		onUrlChange();
// 	}
// }).observe(document, { subtree: true, childList: true });

// function onUrlChange() {
// 	console.log("URL changed!", window.location.href);
// }
