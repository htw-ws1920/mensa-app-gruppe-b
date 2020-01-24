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
//https://www.w3schools.com/js/js_cookies.asp
function setCookie(name,value) {
    document.cookie = name + "=" + value;
}
//https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }