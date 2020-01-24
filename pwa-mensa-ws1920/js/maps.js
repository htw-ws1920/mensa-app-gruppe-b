//add markers to map + shows description of canteen on click
var mymap = L.map('map-id').setView([52.4976, 13.3690], 10);
var mensa0 = L.marker([52.5005226051674, 13.3593320846558]).addTo(mymap).bindPopup("Mensa Beuth Hochschule für Technik Kurfürstenstraße<br>Kurfürstenstraße 141, 10785 Berlin");
var mensa1 = L.marker([52.4556105829113, 13.5245776176453]).addTo(mymap).bindPopup("Mensa HTW Wilhelminenhof<br>Wilhelminenhofstraße 75 A, 12459 Berlin");
var mensa2 = L.marker([52.5372747574638, 13.6059719324112]).addTo(mymap).bindPopup("Mensa ASH Berlin Hellersdorf<br>Alice-Salomon-Platz 5, 12627 Berlin");
var mensa3 = L.marker([52.4529103498954, 13.2886826992035]).addTo(mymap).bindPopup("Mensa FU II Otto-von-Simson-Straße<br>Otto-von-Simson-Straße 26, 14195 Berlin");
var mensa4 = L.marker([52.48551, 13.33823]).addTo(mymap).bindPopup("Mensa HWR Badensche Straße<br>Badensche Str. 51, 10825 Berlin");
var mensa5 = L.marker([52.4931221056714, 13.5258704423904]).addTo(mymap).bindPopup("Mensa HTW Treskowallee<br>Treskowallee 8, 10318 Berlin");
var mensa6 = L.marker([52.5097208716561, 13.3261853456497]).addTo(mymap).bindPopup("Mensa TU Hardenbergstraße<br>Hardenbergstraße 34, 10623 Berlin");
var mensa7 = L.marker([52.5209593, 13.4030792]).addTo(mymap).bindPopup("Mensa HU Spandauer Straße<br>Spandauer Straße 1, 10178 Berlin");
var mensa8 = L.marker([52.4235697906821, 13.2624292373657]).addTo(mymap).bindPopup("Mensa EHB Teltower Damm<br>Teltower Damm 118 - 122, 14167 Berlin");
var mensa9 = L.marker([52.5579816, 13.4393295]).addTo(mymap).bindPopup("Mensa KHS Weißensee<br>Bühringstraße 20, 13086 Berlin");
var mensa10 = L.marker([52.4298241204763, 13.2369375228882]).addTo(mymap).bindPopup("Mensa FU Herrenhaus Düppel<br>Oertzenweg 19b, 14163 Berlin");
var mensa11 = L.marker([52.5184210453008, 13.3928918838501]).addTo(mymap).bindPopup("Mensa HU Süd<br>Unter den Linden 6, 10117 Berlin");
var mensa12 = L.marker([52.5281801653541, 13.3821308612823]).addTo(mymap).bindPopup("Mensa HU Nord<br>Hannoversche Straße 7, 10115 Berlin");
var mensa13 = L.marker([52.5445014448455, 13.3549761772156]).addTo(mymap).bindPopup("Mensa Beuth Hochschule für Technik Luxemburger Straße<br>Luxemburger Straße 9, 13353 Berlin");
var mensa14 = L.marker([52.4293498430889, 13.5300493240356]).addTo(mymap).bindPopup("Mensa HU Oase Adlershof<br>Rudower Chaussee 25, Haus 2");
var mensa15 = L.marker([52.51357, 13.39104]).addTo(mymap).bindPopup("Mensa HfM Charlottenstraße<br>Charlottenstraße 55, 10117 Berlin");
var mensa16 = L.marker([52.425427864151, 13.3573579788208]).addTo(mymap).bindPopup("Mensa FU Lankwitz Malteserstraße<br>Malteser Straße 74, 12249 Berlin");
var mensa17 = L.marker([52.4884585, 13.5333438]).addTo(mymap).bindPopup("Mensa Katholische HS für Sozialwesen<br>Köpenicker Allee 39 - 57, 10318 Berlin");
/* https://leafletjs.com/ */
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11'
}).addTo(mymap);

//https://stackoverflow.com/questions/6092400/is-there-a-way-to-check-if-geolocation-has-been-declined-with-javascript
//gets current position
function getPosition(){
    navigator.permissions.query({ name: 'geolocation' }).then(response => {
    if(response.state === "granted" || response.state ==="prompt"){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{ 
        //entsprechende Fehlermeldung muss noch ausgegeben werden s. function showError(error);
        showError(response.state);
    }
    })
}    

//shows current location on map with marker
function showPosition(position){
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    mymap.locate({setView: true, maxZoom: 16});
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("gefunden!").openPopup();  
}

//shows error message
function showError(error){             
    switch(error) {
        case "denied":
            alert("Der Zugriff auf deinen Standort wurde abgelehnt.")
            break;
        case "position_unavailable":
           alert ("Standortinformationen sind momentan nicht verfügbar.")
            break;
        case "timeout":
            alert ("Die Anforderung zum Abrufen deines Standorts ist abgelaufen.")
            break;
        case "unknown_error":
            alert("Ein unbekannter Fehler ist aufgetreten.")
            break;
    }
} 



