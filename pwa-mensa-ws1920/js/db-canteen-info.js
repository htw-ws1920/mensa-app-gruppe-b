const canteenInfo = document.querySelector('#canteen-info');

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

//displays canteen name & address
function renderCanteenInfo(doc){
    let a = document.createElement('a');
    let br = document.createElement('br');
    let name = document.createElement('b')
    let address = document.createElement('span')

    a.setAttribute('href', '/index.html');
    a.setAttribute('id', 'textfarbe');
    a.setAttribute('data-id', doc.id);

    name.textContent = localStorage.getItem('name');
    address.textContent = localStorage.getItem('address');

    a.appendChild(name);
    a.appendChild(br);
    a.appendChild(address);
    
    canteenInfo.appendChild(a);
}

db.collection('mensen').get().then((snapshot) => {
    renderCanteenInfo(snapshot.docs[1]);
})