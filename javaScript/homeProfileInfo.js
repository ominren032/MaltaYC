// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyADTgHso86q-MqQmcOREYZrEPf84_wyncM",
    authDomain: "malta-yc.firebaseapp.com",
    projectId: "malta-yc",
    storageBucket: "malta-yc.appspot.com",
    messagingSenderId: "517142156635",
    appId: "1:517142156635:web:608542f894a62b2b48f67e",
    measurementId: "G-BY04P5R9RE",
    databaseURL: "https://malta-yc-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth();

const db = getFirestore(app);

onAuthStateChanged(auth,(user) => {
    if(user){

        correctProfileValues(user.uid)

        //if on splash screen, redirect to home, otherwise stay on your page...
    }else{
        setTimeout(function(){
            location.assign("login.html");
        },2000);

    }
});

document.getElementById("sign-out").addEventListener('click', (e) => {
    e.preventDefault();
    //retrieve inputs:

    signOut(auth).then(() => {
        // Sign-out successful.
        alert("Signed out successfully!")
    }).catch((error) => {
        // An error happened.
        //const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
    });

});


async function correctProfileValues(userId){
    let pathDoc = "users/" + userId;
    let userSubCollection = doc(db, pathDoc);

    const mySnapshot = await getDoc(userSubCollection);
    if(mySnapshot.exists()){
        const docData = mySnapshot.data();

        document.getElementById("userFullName").innerHTML = docData.firstName + " " + docData.lastName;
        document.getElementById("userStatus").innerHTML = "Admin: " + docData.isAdmin;
        document.getElementById("userEmail").innerHTML = "Email: " + docData.email;
        document.getElementById("userPhone").innerHTML = "Phone: " + docData.phoneNumber;

        if(docData.isAdmin==true){
            document.getElementById("sendCertBtn").style.display = "inline-block";
        }

    }
}

document.getElementById("sendCertBtn").addEventListener('click', (e) => {
    e.preventDefault();
    location.assign("directory.html");

});








