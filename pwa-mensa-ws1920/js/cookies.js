//shows favorites
//checks for cookies and displays them
function showFavorites(){
    var keyValuePairs = document.cookie.split(/; */);
    for(var i = 0; i < keyValuePairs.length; i++){
        var name = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
        var value = keyValuePairs[i].substring(keyValuePairs[i].indexOf('=')+1);

        if(!(name === "fav_canteen") && !(name === "notifications") && (!(getCookie(name).startsWith("GA1")||getCookie(name).startsWith("GS1")))){
            var star = document.createElement("I")

            star.className ="material-icons"
            star.id = name;
            star.innerHTML ="star"
            //removes cookie and lets the favorite meal fade out, and then disappear
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

//for notification settings page
// is called on load in the noti-settings page 
// checks if the "notifications" cookie is set "on" or "off"
// if "on", it sets the toggle switch to checked and if "off" it sets it unchecked
function checkCookies(){
    var element = document.getElementById("myonoffswitch");
    
    if(getCookie("notifications")==="off"){
        element.checked = false;
    }else{
        element.checked = true;
    }
    
}
function checkCookiesIndex(){
    console.log(document.cookie);
    var element2 = document.getElementById("save-canteen");
    if(getCookie("fav_canteen")=== null){
        element2.checked = false;
    }else{
        element2.checked = true;
    }
}
//https://www.w3schools.com/js/js_cookies.asp
//returns the cookies value by name
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

//https://stackoverflow.com/questions/29017379/how-to-make-fadeout-effect-with-pure-javascript
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
