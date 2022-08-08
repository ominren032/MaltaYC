// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { getDatabase, set, ref, push, child, onValue, onChildAdded } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";
import { getFirestore, getDocs, collection, query, orderBy } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";


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
const db = getFirestore(app);



queryForDocuments();

onAuthStateChanged(auth,(user) => {
    if(user){

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

async function queryForDocuments() {
    const customerOrdersQuery = query(
        collection(db, 'users'),
        orderBy('firstName')
    );
    const querySnapshot = await getDocs(customerOrdersQuery);
    let contactIndex=0;
    window.sessionStorage.clear();
    const allDocs = querySnapshot.forEach((snap) => {
        const docData = (snap).data();
        const docId = (snap).id;

        console.log(JSON.stringify(docData));
        let name = docData.firstName + " " + docData.lastName;
        let phone = docData.phoneNumber;


        let divData = "<div id=\"" +docId+ "\" onclick= \"selectContact(this.id)\" class=\"contact\">\n" +
            "        <div class = \"contactCheckMark\">\n" +
            "            <img id = \""+ contactIndex +"\" style=\"opacity: 0.38; height: 100%\" src=\"assets/features/check_box.svg\">\n" +
            "        </div>\n" +
            "        <div class=\"contactContent\">\n" +
            "            <h3 class=\"contactName\">" + name + "</h3>\n" +
            "            <small class=\"contactPhone\">" + phone + "</small>\n" +
            "        </div>\n" +
            "    </div>";

        let d1 = document.getElementById("main");
        d1.insertAdjacentHTML('beforeend', divData);
        contactIndex++;
    });

    let arrayLength = document.getElementById("main").getElementsByClassName("contact").length;
    window.contactsArrayForExport = new Array(arrayLength);

}





