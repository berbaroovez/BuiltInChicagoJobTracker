import { addAppliedJob, getAppliedJobs } from "../../util/firebase";

const findApplyButton = async () => {
	let buttonElement = document.getElementsByClassName("apply-button");
	console.log("Apply button catch me outside,", buttonElement);
	while (!buttonElement) {
		// console.log("Waiting for buttonElement");
		buttonElement = document.getElementsByClassName("apply-button");
		console.log("Apply button inside,", buttonElement);
		//add half second time out
		await new Promise((resolve) => setTimeout(resolve, 300));
	}
	const handleClick = (e) => {
		const url = window.location.href;
		console.log("URL OF PAGE IS,", url);
		const splitURL = url.split("/job/");
		console.log("splitURL", splitURL[1]);
		addAppliedJob(splitURL[1]);
		getAppliedJobs();
	};

	for (let i = 0; i < buttonElement.length; i++) {
		//get the job-details-link buttonElement and return the href

		console.log(`Type of index ${i}`, buttonElement[i].nodeType);
		buttonElement[i].addEventListener("click", handleClick);
		// buttonElement[i].style.backgroundColor("green");
	}
};

const main = async () => {
	//id read-more-description-toggle
	//class ga-event-processed
	await findApplyButton();
	// 	let element = document.getElementById("read-more-description-toggle");
	// 	console.log("see more button,", element);
	// 	while (!element) {
	// 		// console.log("Waiting for element");
	// 		let element = document.getElementById("read-more-description-toggle");
	// 		console.log("see more button button inside,", element);
	// 		//add half second time out
	// 		await new Promise((resolve) => setTimeout(resolve, 300));
	// 	}

	// 	const handleClick = async (e) => {
	// 		console.log("see more clicked");
	// 		await new Promise((resolve) => setTimeout(resolve, 300));
	// 		findApplyButton();
	// 	};

	// 	element.addEventListener("click", handleClick);
	// 	element.style.backgroundColor = "green";
	// 	console.log(element);
};

main();
