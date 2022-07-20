$(document).ready(function() {
    mainFixxer();
});
$(window).resize(function(){
    mainFixxer();
});

function mainFixxer(){
    var offValHdr = document.getElementById("hdr").offsetHeight;

    document.getElementById("dummyDIV").style.height = offValHdr + "px";
}

//disables enter key to avoid submit w/o button-click
$(document).keypress(
    function(event){
        if (event.which == '13') {
            event.preventDefault();
        }
    });