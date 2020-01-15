function showFavorites(){
    var keyValuePairs = document.cookie.split(/; */);
    for(var i = 0; i < keyValuePairs.length; i++) {
        var name = keyValuePairs[i].substring(0, keyValuePairs[i].indexOf('='));
        var par = document.createElement("P")
        par.className = "favorites-par"
        if(!(getCookie(name).startsWith("GA1")||getCookie(name).startsWith("GS1"))){
            par.innerHTML = getCookie(name);
            document.getElementById("favs-box").appendChild(par)
        }
    }
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}