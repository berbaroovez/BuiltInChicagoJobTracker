// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

import { doc, setDoc, Timestamp, getFirestore, updateDoc, arrayUnion, getDoc } from "firebase/firestore";

const docData = {
	stringExample: "Hello world!",
	booleanExample: true,
	numberExample: 3.14159265,
	dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
	arrayExample: [5, true, "hello"],
	nullExample: null,
	objectExample: { a: 5, b: { nested: "foo" } },
};

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCqi0-OiTgvMba6CsI4JF97LMlyo-26Agc",
	authDomain: "builtinchicagotracker.firebaseapp.com",
	projectId: "builtinchicagotracker",
	storageBucket: "builtinchicagotracker.appspot.com",
	messagingSenderId: "31458974629",
	appId: "1:31458974629:web:bffd543add761928f2264c",
	measurementId: "G-KHFFR8S6H3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database

const addAppliedJob = async (jobInfo) => {
	console.log("Test function running");

	const userRef = doc(db, "data", "berb");

	await updateDoc(
		userRef,
		{
			jobs: arrayUnion({
				title: jobInfo,
				dateApplied: Timestamp.fromDate(new Date()),
			}),
		},
	);
};

const getAppliedJobs = async () => {
	const userRef = doc(db, "data", "berb");
	const data = await getDoc(userRef);
	if (data.exists()) {
		console.log("Document data:", data.data());
		return data.data().jobs;
	} else {
		// doc.data() will be undefined in this case
		console.log("No such document!");
	}
};

export { addAppliedJob, getAppliedJobs };
