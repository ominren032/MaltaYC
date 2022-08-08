var lastClicked = "certificates";

var marker= document.querySelector('#marker');
var item = document.querySelectorAll('.nav a');
var ico = document.querySelectorAll('.icon');

let initialTextAreaHeight;

$(document).ready(function() {
    indicator(document.getElementById(lastClicked));
    mainFixxer();


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

    document.getElementById("dummyDIV").style.height = offValHdr + "px"; //makes sure things dont end up under header
    document.getElementById("main").style.marginBottom = (tempVal + offValMrkr + window.innerWidth*.02) + "px"; //makes sure things dont end up under footer

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
