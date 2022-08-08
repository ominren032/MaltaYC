import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
//import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADTgHso86q-MqQmcOREYZrEPf84_wyncM",
    authDomain: "malta-yc.firebaseapp.com",
    databaseURL: "https://malta-yc-default-rtdb.firebaseio.com",
    projectId: "malta-yc",
    storageBucket: "malta-yc.appspot.com",
    messagingSenderId: "517142156635",
    appId: "1:517142156635:web:608542f894a62b2b48f67e",
    measurementId: "G-BY04P5R9RE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);


//Initialize variables

document.getElementById("signupBTN").addEventListener('click', (e) => {
    e.preventDefault(); //fixed auth network error! ~~not sure what it does tho lol.

    //retrieve inputs:
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let phoneNumber = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let adminStatus = false;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            // ... user.uid
            // save data into real time database
            /*set(ref(database, 'users/' + user.uid), {
                firstName : firstName,
                lastName : lastName,
                email : email,
                phoneNumber : phoneNumber,
                isAdmin : adminStatus

            })*/
            let pathDoc = "users/" + user.uid;
            let docData = {
                firstName : firstName,
                lastName : lastName,
                email : email,
                phoneNumber : phoneNumber,
                isAdmin : adminStatus
            };
            let userSubCollection = doc(db, pathDoc);
            setDoc(userSubCollection, docData)
                .then(() => {
                    // Data saved successfully!
                    alert('user created successfully');
                    location.assign("home.html");
                })
                .catch((error) => {
                    // The write failed...
                    alert(error);
                });
        })
        .catch((error) => {
            //const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage);
        });

});