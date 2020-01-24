const canteenList = document.querySelector('#canteen-list');

//offline data
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            //probably multiple tabs open at once
            console.log('persistence failed')
        }else if(err.code == 'unimplemented'){
            //lack of browser support
            console.log('persistence is not available');
        }
    });

//creates element and renders canteen
function renderCanteen(doc){
    let li = document.createElement('option');
    let name = document.createElement('span')

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;

    li.appendChild(name);

    canteenList.appendChild(li);
}

db.collection('mensen').get().then((snapshot) => { 
    
    if(getCookie("fav_canteen")!== null){
        let li = document.createElement('option');
        let name = document.createElement('span')

        li.setAttribute('data-id', 0);
        name.textContent = getCookie("fav_canteen");

        li.appendChild(name);

        canteenList.appendChild(li);
    }
    snapshot.docs.forEach(doc => {
        renderCanteen(doc);
    })
})

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++){
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}