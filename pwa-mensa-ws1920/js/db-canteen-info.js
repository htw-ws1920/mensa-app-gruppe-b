const canteenInfo = document.querySelector('#canteen-info');

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