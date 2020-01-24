
const currentDate = new Date();

//gets current date
// displays it and calls the functions checkForFav(), getMeals() and showMeals()
function getDate(){
    const formattedDate = currentDate.toLocaleDateString('de-DE', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).replace(/ /g, ' ');
    document.getElementById("date").innerHTML = formattedDate;

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    if (getCookie("notifications")!=="off"){
        getMeals(localStorage.getItem('id'), year, month, day).then(response => {
            checkForFav(response);
        });
    }
    getMeals(localStorage.getItem('id'), year, month, day).then(response => {
        showMeals(response);
    })
}

//gets next days date
function increaseDate(){
    currentDate.setDate(currentDate.getDate() + 1);
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

//gets last days date
function decreaseDate(){
    currentDate.setDate(currentDate.getDate() - 1);
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

//iterates over the response sent from the server, 
//and all cookies to check if a favorite meal of the user is available today or tomorrow
// if yes it calls the function notify()
function checkForFav(response){
    var keyValuePairs = document.cookie.split(/; */);
    for(var i = 0; i < response.length; i++){
        var object = response[i];

        for(var iter = 0; iter < keyValuePairs.length; iter++){
            var name = keyValuePairs[iter].substring(0, keyValuePairs[iter].indexOf('='));
            var value = keyValuePairs[iter].substring(keyValuePairs[iter].indexOf('=') + 1);
            var output = JSON.stringify(object.name);
            output = output.replace(/^"(.*)"$/, '$1');

            if(output === value){
                notify(value);
            }
        }
    }
}

//notifies the user about available favorite meals
//sends a push notification 
function notify(meal){
    if(Notification.permission !== "granted"){
        Notification.requestPermission();
    }else{
        new Notification('Dein Lieblingsessen ist heute verfügbar.', {
        body: meal,
        })
    }
}

//https://www.w3schools.com/js/js_cookies.asp
//returns the cookies value by name
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

//https://stackoverflow.com/questions/57240628/how-to-make-a-button-call-a-function-that-uses-the-fetch-api
//gets meals from openmensa
function getMeals(canteen, year, month, day) {
    var adress = 'https://openmensa.org/api/v2/canteens/' + canteen + '/days/' + year + '-' + month + '-' + day + '/meals';

    return fetch(adress, {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        mode: "cors"
    }).then(response => {
            if(response.status !== 200){
                console.log('Anscheinend gab es ein Problem. Status Code: ' + response.status);
                return;
            }
            return response.json();
        }).catch(err => {
            console.log('Fetch Error :-S', err);
        });
}

//shows the categories, meal name, notes + icons, price
function showMeals(response) {
    while (document.getElementById("meals-box").firstChild) {
        document.getElementById("meals-box").removeChild(document.getElementById("meals-box").firstChild);
    }
    
    if (response == "") {
        document.getElementById("meals-box").innerHTML = "Die Mensa hat an diesem Tag geschlossen."
    }else{
        var category = response[0].category;
        var output = JSON.stringify(category);
        var para = document.createElement("P");

        para.innerHTML = output.replace(/^"(.*)"$/, '$1');
        para.id = "meal-category";
        document.getElementById("meals-box").appendChild(para);

        for(var iter = 0; iter < response.length; iter++){
            var object = response[iter];
            if(object.category == category){
                var output = JSON.stringify(object.name);
                var para = document.createElement("P");
                var star = document.createElement("I");
                var div = document.createElement("div");
                var id = iter;

                para.innerHTML = output.replace(/^"(.*)"$/, '$1');
                star.className = "material-icons";
                star.innerHTML = "star_border";
                star.id = id;
                star.onclick = function(){
                    document.getElementById(this.id).innerHTML = "star";
                    document.cookie = this.id + "=" + document.getElementById("meal" + this.id).textContent;
                    console.log(document.cookie);
                }

                div.className = "meal-fav";
                div.appendChild(star);
                document.getElementById("meals-box").appendChild(div);
                para.className = "meal-title";
                para.id = "meal" + id;
                document.getElementById("meals-box").appendChild(para);

                var price = "";
                if(object.prices.students != null){
                    price += JSON.stringify(object.prices.students);
                    if(object.prices.employees != null){
                        price += "€ / " + JSON.stringify(object.prices.employees);
                        if(object.prices.pupils != null){
                            price += "€ / " + JSON.stringify(object.prices.pupils) + "€";
                        }
                        if(object.prices.others != null){
                            price += "€ / " + JSON.stringify(object.prices.others) + "€";
                        }
                    }
                }else{
                    price += "keine Preisangabe";
                }

                var priceP = document.createElement("P");
                var span = document.createElement("span");
                var lineMeal = document.createElement("hr");

                priceP.innerHTML = price;
                priceP.id = "meal-price";
                document.getElementById("meals-box").appendChild(priceP);

                span = handleNotes(object, span);
                span.className="popup";
                span.id = "notes"+id;
                span.onclick = function(){
                    var popuptext ="";
                    var element = document.getElementById(this.id);
                    var popup = document.createElement("span");

                    for(var i = 0; i< element.getElementsByClassName("note").length; i++){
                        var notes = element.getElementsByClassName("note");
                        popuptext += notes[i].textContent + "- " + notes[i].id +"<br>";
                    }
 
                    popup.innerHTML = popuptext;
                    popup.className = "popuptext";
                    popup.classList.toggle("show");
                    element.appendChild(popup);
                    fadeOutEffect(popup);
                }
                document.getElementById("meals-box").appendChild(span);
                document.getElementById("meals-box").appendChild(document.createElement("br"));
                lineMeal.className = "lineMeal";
                document.getElementById("meals-box").appendChild(lineMeal);
            }
        }

        for(var i = 0; i < response.length; i++){
            var obj = response[i];

            if(category != obj.category){
                var output = JSON.stringify(obj.category);
                var para = document.createElement("P");

                para.innerHTML = output.replace(/^"(.*)"$/, '$1');
                para.id = "meal-category";
                document.getElementById("meals-box").appendChild(para);
                category = obj.category;

                for(var iter = 0; iter < response.length; iter++){
                    var object = response[iter];

                    if(object.category == category){
                        var output = JSON.stringify(object.name)
                        var para = document.createElement("P");
                        var star = document.createElement("I");
                        var div = document.createElement("div");
                        var id = iter
                        var priceP = document.createElement("P");

                        star.className = "material-icons";
                        star.innerHTML = "star_border";
                        star.id = id;
                        star.onclick = function(){
                            document.getElementById(this.id).innerHTML = "star";
                            document.cookie = this.id + "=" + document.getElementById("meal" + this.id).textContent;
                            console.log(document.cookie);
                        }

                        div.className = "meal-fav";
                        div.appendChild(star);
                        document.getElementById("meals-box").appendChild(div);
                        para.innerHTML = output.replace(/^"(.*)"$/, '$1');
                        para.className = "meal-title";
                        para.id = "meal" + id;
                        document.getElementById("meals-box").appendChild(para);

                        var price = "";
                        if(object.prices.students != null){
                            price += JSON.stringify(object.prices.students);
                            if(object.prices.employees != null){
                                price += "€ / " + JSON.stringify(object.prices.employees);
                                if(object.prices.pupils != null){
                                    price += "€ / " + JSON.stringify(object.prices.pupils) + "€";
                                }
                                if(object.prices.others != null){
                                    price += "€ / " + JSON.stringify(object.prices.others) + "€";
                                }
                            }
                        }else{
                            price += "keine Preisangabe";
                        }

                        priceP.innerHTML = price;
                        priceP.id = "meal-price";
                        document.getElementById("meals-box").appendChild(priceP);

                        var span = document.createElement("span");
                        var lineMeal = document.createElement("hr");

                        span = handleNotes(object, span);
                        span.className="popup";
                        span.id = "notes"+id;
                        span.onclick = function(){
                            var popuptext ="";
                            var element = document.getElementById(this.id);
                            var popup = document.createElement("span");

                            for(var i = 0; i < element.getElementsByClassName("note").length; i++){
                                var notes = element.getElementsByClassName("note");
                                popuptext += notes[i].textContent + "- " + notes[i].id +"<br>";
                            }
                            popup.innerHTML = popuptext;
                            popup.className = "popuptext";
                            popup.classList.toggle("show");
                            element.appendChild(popup);
                            fadeOutEffect(popup);
                        }
                        document.getElementById("meals-box").appendChild(span);
                        document.getElementById("meals-box").appendChild(document.createElement("br"));
                        lineMeal.className = "lineMeal";
                        document.getElementById("meals-box").appendChild(lineMeal);
                    }
                }
            }
        }
    }
}

//handles notes from meals
//displays them in a specified style
function handleNotes(object, mainSpan){
    var notes = object.notes;
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
        var note = notes[i];
        var div = document.createElement("div");
        div.className = "div-notes";

        for(var index = 0; index <array.length; index++){
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
                div.appendChild(icon);
                break;
            case "gelb (Ampel)":
                var icon = document.createElement("img");
                icon.src = "/img/icons/ampel_gelb_70x65.png";
                icon.className = "meals-icon";
                div.appendChild(icon);
                break;
            case "rot (Ampel)":
                var icon = document.createElement("img");
                icon.className = "meals-icon";
                icon.src = "/img/icons/ampel_rot_70x65.png";                            
                div.appendChild(icon);
                break;
            case "vegan":
                var icon = document.createElement("img");
                icon.className = "meals-icon";
                icon.src = "/img/icons/Vegan.png";
                div.appendChild(icon);
                break;
            case "vegetarisch":
                var icon = document.createElement("img");
                icon.className = "meals-icon";
                icon.src = "/img/icons/1.png";
                div.appendChild(icon);
                break;
            case "Klimaessen":
                var icon = document.createElement("img");
                icon.className = "meals-icon";
                icon.src = "/img/icons/43.png";
                div.appendChild(icon);
                break;
            case "MSC":
                var icon = document.createElement("img");
                icon.className = "meals-icon";
                icon.src = "/img/icons/38.png";
                div.appendChild(icon);
                break;
            case "bio":
                var icon = document.createElement("img");
                icon.className = "meals-icon";
                icon.src = "/img/icons/18.png";
                div.appendChild(icon);
                break;
        }
        document.getElementById("meals-box").appendChild(div);
    }
    return mainSpan;                  
}

//https://stackoverflow.com/questions/29017379/how-to-make-fadeout-effect-with-pure-javascript
//fade out effect for notes popup
//interval is set to 3000 and opacity is decreased by 1, 
//so it disappears instantly and will then be removed from the span it was contained in
function fadeOutEffect(fadeTarget) {
    var fadeEffect = setInterval(function(){
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -=1;
            for(var i = 0; i < document.getElementsByClassName("popup").length; i++){
                var popup = document.getElementsByClassName("popup")[i];
                if(popup.contains(fadeTarget)){
                    popup.removeChild(fadeTarget);
                }
            }
        } else {
            clearInterval(fadeEffect);
            
            
           
        }
    }, 3000);
}
