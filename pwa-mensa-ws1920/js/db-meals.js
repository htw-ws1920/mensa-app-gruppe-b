 /* date formatting */
 const date = new Date();
 const formattedDate = date.toLocaleDateString('de-DE', {
   weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
 }).replace(/ /g, ' ');
 
 document.getElementById("date").innerHTML = formattedDate;

 function increaseDate() {
     currentDate.setDate(currentDate.getDate()+1)
     document.getElementById("date").innerHTML = currentDate;
     var year = currentDate.getFullYear();
     var month = currentDate.getMonth() +1;
     var day = currentDate.getDate();
     getMeals(localStorage.getItem('id'), year, month, day).then(response => {
         document.getElementById("meals").innerHTML = JSON.stringify(response);
     })
 }

 function decreaseDate() {
     currentDate.setDate(currentDate.getDate()-1)
     document.getElementById("date").innerHTML = currentDate;
     var year =currentDate.getFullYear();
     var month = currentDate.getMonth() +1;
     var day = currentDate.getDate();
     getMeals(localStorage.getItem('id'), year, month, day).then(response => {
         document.getElementById("meals").innerHTML = JSON.stringify(response);
     })
 }

 function getDate() {
     currentDate = new Date();
     document.getElementById("date").innerHTML = formattedDate;
     var year =currentDate.getFullYear();
     var month = currentDate.getMonth() +1;
     var day = currentDate.getDate();
     getMeals(localStorage.getItem('id'), year, month, day).then(response => {
         document.getElementById("meals").innerHTML = JSON.stringify(response);
     })
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