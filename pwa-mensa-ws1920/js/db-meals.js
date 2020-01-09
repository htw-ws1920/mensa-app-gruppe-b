const canteenInfo = document.querySelector('#meals-box');

//display canteen name & address
function renderCanteenInfo(doc){
    let a = document.createElement('a');
    let br = document.createElement('br');
    let category = document.createElement('span')
    let name = document.createElement('span')
    let prices = document.createElement('span')
    //let notes = document.createElement('span')

    category.textContent = localStorage.getItem('category');
    name.textContent = localStorage.getItem('name');
    prices.textContent = localStorage.getItem('prices');
    //notes.textContent = localStorage.getItem('notes');

    a.appendChild(category);
    a.appendChild(br);
    a.appendChild(name);
    a.appendChild(br);
    a.appendChild(prices);
    //a.appendChild(notes);
    
    canteenInfo.appendChild(a);
}

db.collection('mensen').get().then((snapshot) => {
    console.log(snapshot.docs[1].data());
    renderCanteenInfo(snapshot.docs[1]);
})