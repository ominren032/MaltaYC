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

document.getElementById("signupBTN").onclick = function(){
    if(document.getElementById("checkPass").value != document.getElementById("password").value){
        alert("Passwords do not match.")
    }else{}

}

