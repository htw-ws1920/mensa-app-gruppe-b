//save notifications preferences
function notificationsChange(){
    switch(getCookie("notifications")){
        case null:
            setCookie("notifications", "off");
            console.log(document.cookie);
            break;
        case "on":
            setCookie("notifications", "off");
            console.log(document.cookie);
            break;

        case "off": 
            setCookie("notifications", "on");
            console.log(document.cookie);
            break;
    }
}

function setCookie(name,value) {
    document.cookie = name + "=" + (value || "");
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}