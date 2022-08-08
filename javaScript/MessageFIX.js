var lastClicked = "reminders";

var marker= document.querySelector('#marker');
var item = document.querySelectorAll('.nav a');
var ico = document.querySelectorAll('.icon');

let initialTextAreaHeight;

$(document).ready(function() {
    indicator(document.getElementById(lastClicked));
    mainFixxer();
    document.getElementById("nav").style.boxShadow = "none";
    initialTextAreaHeight = document.getElementById("inputMSG").offsetHeight;

});
$(window).resize(function(){
    indicator(document.getElementById(lastClicked));
    mainFixxer();
});

function mainFixxer(){
    var offValHdr = document.getElementById("hdr").offsetHeight + window.innerWidth*.02;
    var offValFtr = document.getElementById("nav").offsetHeight;
    var offValMrkr = document.getElementById("marker").offsetHeight;
        var tempVal = offValFtr;
        var widthTXTAREA = document.documentElement.clientWidth - document.getElementById("sendMsgBtn").offsetWidth - 0.01*document.documentElement.clientWidth ;
    let bottomSendSpace = (28 + document.documentElement.clientHeight*.02 - document.getElementById("sendMsgBtn").offsetHeight)/2 + tempVal;

    document.getElementById("dummyDIV").style.height = offValHdr + "px"; //makes sure things dont end up under header
    document.getElementById("main").style.marginBottom = (document.getElementById("inputMSG").offsetHeight + tempVal + offValMrkr + window.innerWidth*.02) + "px"; //makes sure things dont end up under footer
    document.getElementById("msgForm").style.bottom = tempVal + "px"; //correctly places msg Form
    document.getElementById("inputMSG").style.width = widthTXTAREA + "px";
    document.getElementById("sendMsgBtn").style.bottom = bottomSendSpace + "px";
}

function indicator(e){
    marker.style.left = e.offsetLeft + "px";
    marker.style.width = e.offsetWidth + "px";
    lastClicked = e.getAttribute('id');
}

item.forEach(link => {
    link.addEventListener('click', (e) =>{
        for(let i=0; i<ico.length; i++){
            ico[i].style.opacity=0.6;
        }
        indicator(e.target);
        e.target.style.opacity = 1;
    })
});

//This will autoresize our textarea...
function expandTextarea(id) {
    document.getElementById(id).addEventListener('keyup', function() {
        this.style.height = 0;
        this.style.height = this.scrollHeight + 'px';

    }, false);
}

expandTextarea('inputMSG');