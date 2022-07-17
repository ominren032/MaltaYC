var lastClicked = "home";

var marker= document.querySelector('#marker');
var item = document.querySelectorAll('.nav a');
var ico = document.querySelectorAll('.icon');

$(document).ready(function() {
    indicator(document.getElementById(lastClicked));
    mainFixxer();
    document.getElementById("nav").style.boxShadow = "none";

});
$(window).resize(function(){
    indicator(document.getElementById(lastClicked));
    mainFixxer();
});

function mainFixxer(){
    var offValHdr = document.getElementById("hdr").offsetHeight + window.innerWidth*.02;
    var offValFtr = document.getElementById("nav").offsetHeight;
    var offValMrkr = document.getElementById("marker").offsetHeight;
        var tempVal = offValMrkr + offValFtr;
        var widthTXTAREA = window.innerWidth - document.getElementById("sendIMG").offsetWidth - 0.01*window.innerWidth ;

    document.getElementById("dummyDIV").style.height = offValHdr + "px"; //makes sure things dont end up under header
    document.getElementById("main").style.marginBottom = offValFtr + "px"; //makes sure things dont end up under footer
    document.getElementById("msgForm").style.bottom = tempVal + "px"; //correctly places msg Form
    document.getElementById("inputMSG").style.width = widthTXTAREA + "px";



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
})