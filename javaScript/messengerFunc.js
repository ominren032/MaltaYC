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
const db = getFirestore(app);


let userId;


onAuthStateChanged(auth,(user) => {
    if(user){
        sessionStorage.setItem("currentUser", user.uid);
        userId = user.uid;
        setUserName(userId);


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


document.getElementById("sendMsgBtn").addEventListener('click', async (e) => {
    e.preventDefault();

    let message = document.getElementById("inputMSG").value;

    let fullName = document.getElementById("currentUserName").innerHTML;

    const id = push(child(ref(database), 'messages')).key;

    set(ref(database, 'messages/' + id), {
        userId: userId,
        name: fullName,
        message: message
    });


    document.getElementById("inputMSG").value = "";
    document.getElementById("inputMSG").style.height = 0;
    document.getElementById("inputMSG").style.height = document.getElementById("inputMSG").scrollHeight + 'px';



});

const newMsg = ref(database, 'messages/');

onChildAdded(newMsg, (data) => {
    if(data.val().userId != userId){
        var divData = '<div>\n' +
            '        <small style="display:block; text-align: left;">' + data.val().name + '</small>\n' +
            '        <div class="opp_flex_messages">\n' +
            '            <div class="opp_msg_content_container ">\n' +
            '                <h3 class="opp_content">'+ data.val().message + '</h3>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';
    }else{
        var divData = '<div>\n' +
            '        <small style="display:block; text-align: right;">'+ data.val().name + '</small>\n' +
            '        <div class="you_flex_messages">\n' +
            '            <div class="you_msg_content_container ">\n' +
            '                <h3 class="you_content">' + data.val().message + '</h3>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    </div>';
    }

    let d1 = document.getElementById("main");
    d1.insertAdjacentHTML('beforeend', divData);

    window.scrollTo(0,document.body.scrollHeight);

});

async function setUserName(userId){
    let pathDoc = "users/" + userId;
    let userSubCollection = doc(db, pathDoc);

    const mySnapshot = await getDoc(userSubCollection);
    if(mySnapshot.exists()){
        const docData = mySnapshot.data();
        document.getElementById("currentUserName").innerHTML= (docData.firstName + " " + docData.lastName);

    }else{
        return "error";
    }


}




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




