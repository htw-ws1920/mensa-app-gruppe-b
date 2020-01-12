 /* date formatting */
 const currentDate = new Date();
 const formattedDate = currentDate.toLocaleDateString('de-DE', {
   weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
 }).replace(/ /g, ' ');
 
 document.getElementById("date").innerHTML = formattedDate;

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

 function getDate() {
     currentDate = new Date();
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

 /* display meals 
         document.getElementById("meal-title").innerHTML += JSON.stringify(obj.name) + "<br>"
        document.getElementById("meal-price").innerHTML += JSON.stringify(obj.prices) + "<br>"*/
        /*document.getElementById("meal-title").innerHTML = "Gericht" + "<br>";
        document.getElementById("meal-category").innerHTML += JSON.stringify(obj.category) + "<br>"
        
            console.log(JSON.stringify(obj.category));
            console.log(category);*/
 function showMeals(response) {
    var category = new Set(); 
    
    for(var i = 0; i < response.length; i++) {
        var obj = response[i];
        
        if(!(category.has(JSON.stringify(obj.category)))){
            category.add(obj.category);
            console.log(category)
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
             console.log('Looks like there was a problem. Status Code: ' +
                 response.status );
             return;
         }
         return response.json();
     })                
     .catch(err =>{
         console.log('Fetch Error :-S', err );
     });
 }