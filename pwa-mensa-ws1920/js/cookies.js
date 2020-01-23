//shows favorites
function showFavorites(){
    var keyValuePairs = document.cookie.split(/; */);
    for(var i = 0; i < keyValuePairs.length; i++){
        var name = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
        var value = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);

        if(!(getCookie(name).startsWith("GA1")||getCookie(name).startsWith("GS1"))&& !(name === "notifications")){
            var star = document.createElement("I")

            star.className ="material-icons"
            star.id = name;
            star.innerHTML ="star"
            star.onclick = function(){
                document.cookie = this.id +"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                var par = document.getElementById("meal"+ this.id)
                var star =document.getElementById(this.id)
                star.innerHTML = "star_border";
                fadeOutEffect(star)
                fadeOutEffect(par)

            }
            var par = document.createElement("P")

            document.getElementById("favs-box").appendChild(star)
            par.className = "favorites-par"
            par.innerHTML = getCookie(name);
            par.id = "meal" + name;
            document.getElementById("favs-box").appendChild(par)
        }
    }
}

//ELIAS KOMMENTIEREN PLS
function checkCookies(){
    var element = document.getElementById("myonoffswitch");
    if(getCookie("notifications")==="off"){
        element.checked = false;
    }else{
        element.checked = true;
    }
}

function setCookie(name,value) {
    var expires = "";
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++){
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

//fade out effect for favorite(star) icon
function fadeOutEffect(fadeTarget) {
    var fadeEffect = setInterval(function() {
        if(!fadeTarget.style.opacity){
            fadeTarget.style.opacity = 1;
        }
        if(fadeTarget.style.opacity > 0){
            fadeTarget.style.opacity -= 0.3;
        }else{
            clearInterval(fadeEffect);
            document.getElementById("favs-box").removeChild(fadeTarget)
        }
    }, 100);

}