$(document).ready(function() {
    mainFixxer();
});
$(window).resize(function(){
    mainFixxer();
});

function mainFixxer(){
    var offValHdr = document.getElementById("hdr").offsetHeight;
    var offValSrch = document.getElementById("inputSrch").offsetHeight;

    document.getElementById("dummyDIV").style.height = (offValHdr+offValSrch) + "px";
    document.getElementById("srchForm").style.top = offValHdr + "px";


}