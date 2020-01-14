//HIER 
const currentDate = new Date();
//HIER AUCH
 function increaseDate() {
     currentDate.setDate(currentDate.getDate()+1)
     const formattedDate = currentDate.toLocaleDateString('de-DE', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      }).replace(/ /g, ' ');
     document.getElementById("date").innerHTML = formattedDate;
     var year = currentDate.getFullYear();
     var month = currentDate.getMonth() +1;
     var day = currentDate.getDate();
     getMeals(localStorage.getItem('id'), year, month, day).then(response => {
        showMeals(response);
    })
}
//HIER AUCH
function decreaseDate() {
     currentDate.setDate(currentDate.getDate()-1)
     const formattedDate = currentDate.toLocaleDateString('de-DE', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      }).replace(/ /g, ' ');
     document.getElementById("date").innerHTML = formattedDate;
     var year =currentDate.getFullYear();
     var month = currentDate.getMonth() +1;
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
     var year =currentDate.getFullYear();
     var month = currentDate.getMonth() +1;
     var day = currentDate.getDate();
     getMeals(localStorage.getItem('id'), year, month, day).then(response => {
        showMeals(response);
    })
 }

//HIER AUCH
function showMeals(response) {
 
    while (document.getElementById("meals-box").firstChild) {
        document.getElementById("meals-box").removeChild(document.getElementById("meals-box").firstChild);
    }
    if(response == ""){
        document.getElementById("meals-box").innerHTML = "Die Mensa hat an diesem Tag geschlossen."
    } else{


        var category = response[0].category
        var output = JSON.stringify(category);

        var para = document.createElement("P");
        para.innerHTML = output.replace(/^"(.*)"$/, '$1');
        para.id= "meal-category"
        document.getElementById("meals-box").appendChild(para);

        for (var iter =0; iter<response.length;iter++){
            var object = response[iter];
            if(object.category == category){
                var output =JSON.stringify(object.name)
                var para = document.createElement("P");
                para.innerHTML = output.replace(/^"(.*)"$/, '$1');
                var star = document.createElement("I");
                star.className = "material-icons"
                star.innerHTML = "star_border"
                var id = iter
                star.id = id;
                star.onclick = function(){
                    document.getElementById(this.id).innerHTML = "star";
                    document.cookie = this.id + "=" + document.getElementById("meal"+this.id).textContent;
                    console.log(document.cookie);
                }
                document.getElementById("meals-box").appendChild(star)
                para.className = "meal-title"
                para.id = "meal" +id;
                document.getElementById("meals-box").appendChild(para);

                var price = "";
                if(object.prices.students != null){
                    price += JSON.stringify(object.prices.students);

                    if(object.prices.employees != null){
                        price += "/"+ JSON.stringify(object.prices.employees);
                        if(object.prices.pupils != null){
                            price += "/" + JSON.stringify(object.prices.pupils);

                        }
                        if(object.prices.others !=null){

                            price += "/" + JSON.stringify(object.prices.others);
                            
                        }
                    }
                } else{
                    price += "0";
                }
            
                
                
                var priceP = document.createElement("P");
                priceP.innerHTML = price;
                priceP.id = "meal-price";
                document.getElementById("meals-box" ) .appendChild(priceP);
            }
        }

        for(var i = 0; i < response.length; i++) {
            var obj = response[i];
            
            if (category != obj.category){
                var output =JSON.stringify(obj.category)
                var para = document.createElement("P");
                para.innerHTML = output.replace(/^"(.*)"$/, '$1');
                para.id= "meal-category"
                document.getElementById("meals-box").appendChild(para);
                category = obj.category;
                
                for (var iter =0; iter<response.length;iter++){
                    var object = response[iter];
                    if(object.category == category){
                        var output =JSON.stringify(object.name)
                        var para = document.createElement("P");
                        var star = document.createElement("I");
                        star.className = "material-icons"
                        star.innerHTML = "star_border"
                        var id = iter
                        star.id = id;
                        star.onclick = function(){
                            document.getElementById(this.id).innerHTML = "star";
                            document.cookie = this.id + "=" + document.getElementById("meal"+this.id).textContent;
                            console.log(document.cookie);
                        }
                        document.getElementById("meals-box").appendChild(star)
                        para.innerHTML = output.replace(/^"(.*)"$/, '$1');
                        para.className = "meal-title"
                        para.id = "meal" +id;
                        document.getElementById("meals-box").appendChild(para);


                        var price = "";
                        if(object.prices.students != null){
                            price += JSON.stringify(object.prices.students);
            
                            if(object.prices.employees != null){
                                price += "/"+ JSON.stringify(object.prices.employees);
                                if(object.prices.pupils != null){
                                    price += "/" + JSON.stringify(object.prices.pupils);
            
                                }
                                if(object.prices.others !=null){
            
                                    price += "/" + JSON.stringify(object.prices.others);
                                    
                                }
                            }
                        } else{
                            price += "0";
                        }

                        var priceP = document.createElement("P");
                        priceP.innerHTML = price;
                        priceP.id = "meal-price";
                        document.getElementById("meals-box" ).appendChild(priceP);

                    }
                }
            }
        }
    }

}

function getMeals(canteen, year, month, day){

    var adress = 'https://openmensa.org/api/v2/canteens/'+canteen+'/days/'+year+'-'+month+'-'+day+'/meals';
    console.log(adress);

    return fetch(adress, {
        method: 'get',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        mode: "cors"
    })
    .then(response => {
        if (response.status !== 200 ) {
            console.log('Looks like there was a problem. Status Code: ' + response.status );
            return;
        }
        return response.json();
    })                
    .catch(err =>{
        console.log('Fetch Error :-S', err );
    });
}