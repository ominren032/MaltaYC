// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { getDatabase, set, ref, push, child, onValue, onChildAdded } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
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

const database = getDatabase(app);

let userId;

onAuthStateChanged(auth,(user) => {
    if(user){
        userId = user.uid;


        //not working?
        if(document.title == "MYC - Splash Screen"){
            setTimeout(function(){
                location.assign("home.html");
            },2000);
        }
        //if on splash screen, redirect to home, otherwise stay on your page...
    }else{
        setTimeout(function(){
            location.assign("login.html");
        },2000);

    }
});

document.getElementById("submitFormBtn").addEventListener('click', async (e) => {
    e.preventDefault();

    for (var i = 0; i < contactArrayForDisplay.length; i++) {
        if (contactArrayForDisplay[i] != null) {
            let userId = contactArrayForDisplay[i][0];

            let formName = contactArrayForDisplay[i][1];
            let formDate = correctDate(document.getElementById("date").value);
            let formHours = document.getElementById("hours").value;

            let formAnswers = JSON.stringify([formName, formHours, formDate]);

            const newCertificateId = push(child(ref(database), 'certificates')).key;

            set(ref(database, 'certificates/' + userId + "/" + newCertificateId), {
                formName: formName,
                formHours: formHours,
                formDate: formDate,
                formAnswers: formAnswers
            });

        }
    }

    location.assign("home.html");
});

function correctDate(formDate){
    let correctStr;
    let dateArr = formDate.split("-");
    if (dateArr[0].length == 4){
        correctStr = dateArr[1] + "-" +dateArr[2] + "-" + dateArr[0];
    }
    return correctStr;
}


