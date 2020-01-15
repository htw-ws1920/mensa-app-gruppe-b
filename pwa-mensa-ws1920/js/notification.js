function notify(){
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
        
    }
    else{
        var notification = new Notification('Hund', {
        body: "Jetzt bist du ein Hurensohn",
        });
    }
}