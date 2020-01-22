//HIER 
const currentDate = new Date();
//HIER AUCH
function increaseDate() {
    currentDate.setDate(currentDate.getDate() + 1)
    const formattedDate = currentDate.toLocaleDateString('de-DE', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).replace(/ /g, ' ');
    document.getElementById("date").innerHTML = formattedDate;
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    getMeals(localStorage.getItem('id'), year, month, day).then(response => {
        showMeals(response);
    })
}
//HIER AUCH
function decreaseDate() {
    currentDate.setDate(currentDate.getDate() - 1)
    const formattedDate = currentDate.toLocaleDateString('de-DE', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).replace(/ /g, ' ');
    document.getElementById("date").innerHTML = formattedDate;
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    getMeals(localStorage.getItem('id'), year, month, day).then(response => {
        showMeals(response);
    })
}
//HIER AUCH
function getDate() {
    
    const formattedDate = currentDate.toLocaleDateString('de-DE', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).replace(/ /g, ' ');
    document.getElementById("date").innerHTML = formattedDate;
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    if (getCookie("notifications")!=="off"){
        for (var i = 0; i < 7; i++) {
        getMeals(localStorage.getItem('id'), year, month, day + i).then(response => {

            checkForFav(response,day);
        })
    }
    }
    
    getMeals(localStorage.getItem('id'), year, month, day).then(response => {
        showMeals(response);
    })
}

function checkForFav(response, day){
    var keyValuePairs = document.cookie.split(/; */);
    for (var i = 0; i < response.length; i++) {

        var object = response[i];

        for (var iter = 0; iter < keyValuePairs.length; iter++) {
            var name = keyValuePairs[iter].substring(0, keyValuePairs[iter].indexOf('='));
            var value = keyValuePairs[iter].substring(keyValuePairs[iter].indexOf('=') + 1);
            var output = JSON.stringify(object.name)
            output = output.replace(/^"(.*)"$/, '$1')

            if(output=== value){
                notify(value, day)
                
            }
        }
    }
}

function notify(meal,day){
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
        
    }
    else{
        var notification = new Notification('Dein Essen ist verfügbar.', {
        body: meal +  " am " + day,
        });
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
//HIER AUCH
function showMeals(response) {
    while (document.getElementById("meals-box").firstChild) {
        document.getElementById("meals-box").removeChild(document.getElementById("meals-box").firstChild);
    }
    if (response == "") {
        document.getElementById("meals-box").innerHTML = "Die Mensa hat an diesem Tag geschlossen."
    } else {
        var category = response[0].category
        var output = JSON.stringify(category);

        var para = document.createElement("P");
        para.innerHTML = output.replace(/^"(.*)"$/, '$1');
        para.id = "meal-category"
        document.getElementById("meals-box").appendChild(para);

        for (var iter = 0; iter < response.length; iter++) {
            var object = response[iter];
            if (object.category == category) {
                var output = JSON.stringify(object.name)
                var para = document.createElement("P");
                para.innerHTML = output.replace(/^"(.*)"$/, '$1');
                var star = document.createElement("I");
                star.className = "material-icons"
                star.innerHTML = "star_border"
                var id = iter
                star.id = id;
                star.onclick = function () {
                    document.getElementById(this.id).innerHTML = "star";
                    document.cookie = this.id + "=" + document.getElementById("meal" + this.id).textContent;
                   
                    console.log(document.cookie);
                   
                }
                document.getElementById("meals-box").appendChild(star)
                para.className = "meal-title"
                para.id = "meal" + id;
                document.getElementById("meals-box").appendChild(para);

                var price = "";
                if (object.prices.students != null) {
                    price += JSON.stringify(object.prices.students);
                    if (object.prices.employees != null) {
                        price += "€ / " + JSON.stringify(object.prices.employees);
                        if (object.prices.pupils != null) {
                            price += "€ / " + JSON.stringify(object.prices.pupils) + "€";
                        }
                        if (object.prices.others != null) {
                            price += "€ / " + JSON.stringify(object.prices.others) + "€";
                        }
                    }
                } else {
                    price += "keine Preisangabe";
                }

                var priceP = document.createElement("P");
                priceP.innerHTML = price;
                priceP.id = "meal-price";
                document.getElementById("meals-box").appendChild(priceP);

                
            }
        }

        for (var i = 0; i < response.length; i++) {
            var obj = response[i];

            if (category != obj.category) {
                var output = JSON.stringify(obj.category)
                var para = document.createElement("P");
                para.innerHTML = output.replace(/^"(.*)"$/, '$1');
                para.id = "meal-category"
                document.getElementById("meals-box").appendChild(para);
                category = obj.category;

                for (var iter = 0; iter < response.length; iter++) {
                    var object = response[iter];
                    if (object.category == category) {
                        var output = JSON.stringify(object.name)
                        var para = document.createElement("P");
                        var star = document.createElement("I");
                        star.className = "material-icons"
                        star.innerHTML = "star_border"
                        var id = iter
                        star.id = id;
                        star.onclick = function () {
                            document.getElementById(this.id).innerHTML = "star";
                            document.cookie = this.id + "=" + document.getElementById("meal" + this.id).textContent;
                            console.log(document.cookie);
                        }
                        document.getElementById("meals-box").appendChild(star)
                        para.innerHTML = output.replace(/^"(.*)"$/, '$1');
                        para.className = "meal-title"
                        para.id = "meal" + id;
                        document.getElementById("meals-box").appendChild(para);

                        var price = "";
                        if (object.prices.students != null) {
                            price += JSON.stringify(object.prices.students);

                            if (object.prices.employees != null) {
                                price += "€ / " + JSON.stringify(object.prices.employees);
                                if (object.prices.pupils != null) {
                                    price += "€ / " + JSON.stringify(object.prices.pupils) + "€";
                                }
                                if (object.prices.others != null) {
                                    price += "€ / " + JSON.stringify(object.prices.others) + "€";
                                }
                            }
                        } else {
                            price += "keine Preisangabe";
                        }

                        var priceP = document.createElement("P");
                        priceP.innerHTML = price;
                        priceP.id = "meal-price";
                        document.getElementById("meals-box").appendChild(priceP);

                        var span = document.createElement("span");
                        span = handleNotes(object, span);
                        span.className="popup";
                        span.id = "notes"+id;
                        span.onclick = function(){
                            
                            var popuptext ="";
                            var element = document.getElementById(this.id);

                            for(var i = 0; i< element.getElementsByClassName("note").length; i++){
                                
                                var notes = element.getElementsByClassName("note");
                               
                                popuptext += notes[i].textContent + "- " + notes[i].id +"&nbsp";
                            }
                            var popup =document.createElement("span");
                            popup.innerHTML = popuptext;
                            popup.className = "popuptext";
                            popup.classList.toggle("show");

                            element.appendChild(popup);
                            fadeOutEffect(popup);
                        }
                    
                        document.getElementById("meals-box").appendChild(span);
                        document.getElementById("meals-box").appendChild(document.createElement("br"));
                    }
                }
            }
        }
    }
}

function handleNotes(object, mainSpan){
    var notes = object.notes
                var array = [
                        "Schweinefleisch bzw. mit Gelatine vom Schwein",
                        "Alkohol",
                        "Geschmacksverstärker",
                        "gewachst",
                        "konserviert",
                        "Antioxidationsmittel",
                        "Farbstoff",
                        "Phosphat",
                        "geschwärzt",
                        "enthält eine Phenylalaninquelle",
                        "Süßungsmittel",
                        "mit zum Teil fein zerkleinertem Fleischanteil",
                        "koffeinhaltig",
                        "chininhaltig",
                        "geschwefelt",
                        "kann abführend wirken",
                        "Glutenhaltiges Getreide",
                        "Weizen",
                        "Roggen",
                        "Gerste",
                        "Hafer",
                        "Dinkel",
                        "Kamut",
                        "Krebstiere",
                        "Eier",
                        "Fisch",
                        "Erdnüsse",
                        "Schalenfrüchte",
                        "Mandeln",
                        "Haselnuss",
                        "Walnuss",
                        "Kaschunuss",
                        "Pacannuss",
                        "Paranuss",
                        "Pistazie",
                        "Macadamia",
                        "Sellerie",
                        "Soja",
                        "Senf",
                        "Milch und Milchprodukte (inkl. Laktose)",
                        "Sesam",
                        "Schwefeldioxid und Sulfide",
                        "Lupine",
                        "Weichtiere",
                        "Nitritpökelsalz",
                        "Hefe"]

                for(var i = 0; i < notes.length; i++){
                    var note = notes[i]
                    for(var index = 0; index <array.length;index++){
                        if(note === array[index]){
                        
                            var span = document.createElement("span");
                            span.innerHTML = index + "&nbsp;";
                            span.className="note";

                            span.id = array[index];

                            mainSpan.appendChild(span);
                        }
                        
                    }
                    switch(note){
                        case "grün (Ampel)":
                            var icon = document.createElement("img");
                            icon.src = "/img/icons/ampel_gruen_70x65.png";
                            icon.className = "meals-icon";
                            document.getElementById("meals-box").appendChild(icon);

                            

                            break;
                        case "gelb (Ampel)":
                            var icon = document.createElement("img");
                            icon.src = "/img/icons/ampel_gelb_70x65.png";
                            icon.className = "meals-icon";
                            document.getElementById("meals-box").appendChild(icon);


                            break;
                        case "rot (Ampel)":
                            var icon = document.createElement("img");
                            icon.className = "meals-icon";
                            icon.src = "/img/icons/ampel_rot_70x65.png";                            
                            document.getElementById("meals-box").appendChild(icon);


                            break;
                        case "vegan":
                            var icon = document.createElement("img");
                            icon.className = "meals-icon";
                            icon.src = "/img/icons/Vegan.png";
                            document.getElementById("meals-box").appendChild(icon);

                            break;
                        case "vegetarisch":
                            var icon = document.createElement("img");
                            icon.className = "meals-icon";
                            icon.src = "/img/icons/1.png";
                            document.getElementById("meals-box").appendChild(icon);

                            break;

                        case "Klimaessen":
                            var icon = document.createElement("img");
                            icon.className = "meals-icon";
                            icon.src = "/img/icons/43.png";
                            document.getElementById("meals-box").appendChild(icon);

                            break;
                        case "MSC":
                            var icon = document.createElement("img");
                            icon.className = "meals-icon";
                            icon.src = "/img/icons/38.png";
                            document.getElementById("meals-box").appendChild(icon);

                            break;
                        case "bio":
                            var icon = document.createElement("img");
                            icon.className = "meals-icon";
                            icon.src = "/img/icons/18.png";
                            document.getElementById("meals-box").appendChild(icon);

                            break;
                        
                    }
                                  
                
                }
        return mainSpan;        
                
}

function getMeals(canteen, year, month, day) {
    var adress = 'https://openmensa.org/api/v2/canteens/' + canteen + '/days/' + year + '-' + month + '-' + day + '/meals';
    console.log(adress);

    return fetch(adress, {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        mode: "cors"
    })
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            return response.json();
        })
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });
}
function fadeOutEffect(fadeTarget) {
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -=1;
        } else {
            clearInterval(fadeEffect);
           
        }
    }, 3000);
   
}