const canteenList = document.querySelector('#canteen-list');

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
    snapshot.docs.forEach(doc => {
        renderCanteen(doc);
    })
})