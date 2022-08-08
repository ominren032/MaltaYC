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
const auth = getAuth(app);

const database = getDatabase(app);
const db = getFirestore(app);





onAuthStateChanged(auth,(user) => {
    if(user){
        sessionStorage.setItem("currentUser", user.uid);

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

let userCertificatesPath = 'certificates/' + sessionStorage.getItem("currentUser") +'/';
const newCert = ref(database, userCertificatesPath);

onChildAdded(newCert, (data) => {

    let certificateId = data.id;

    var divData = '<div class="certificateBox" onclick="fillForm(this.id)" id="'+ certificateId +'">\n' +
        '        <small style="">' + data.val().formAnswers +'</small> <br>\n' +
        '        <img style=" border-radius:2.5vh;" src="assets/Certificate_Image.svg">\n' +
        '        <button  class="certificateButton">Download Certificate</button>\n' +
        '    </div>\n'+
        '</div>\n';

    let d1 = document.getElementById("main");
    d1.insertAdjacentHTML('beforeend', divData);
    setTimeout(function(){
        window.scrollTo(0,document.documentElement.scrollHeight);
    },500);

});
