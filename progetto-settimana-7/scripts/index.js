const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzOGIzOWYyNjBjYzAwMTVjYzBlYWYiLCJpYXQiOjE3MjE5OTQwNDEsImV4cCI6MTcyMzIwMzY0MX0.Zv6M7u0s0rJPIjR1vyIEYXGPxv9VUheJqWaT9e-Vs2Q '; // Sostituisci 'YOUR_TOKEN_HERE' con il tuo token effettivo

let myArray = [];

fetch(URL, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Errore nella chiamata, response non OK');
    }
  })
  .then((data) => {
    myArray = data;
    console.log('carte A DB', myArray);
    populateDOM(myArray);
  })
  .catch((error) => {
    console.error('Si è verificato un errore:', error);
  });

function populateDOM(array) {
  const itemsRow = document.getElementById('items-row');
  itemsRow.innerHTML = '';
  array.forEach(item => {
    const col = document.createElement('div');
    col.className = 'col pb-3';
    col.innerHTML = `
      <div class="card bg-success text-light border-dark ">
        <img src="${item.imageUrl}" class="card-img-top" alt="${item.name}">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">${item.description}</p>
          <p class="card-text">Prezzo: ${item.price}€</p>
          <p class="card-text">Marca: ${item.brand}</p>
          <a href="details.html?id=${item._id}" class="btn btn-primary">Dettagli</a>
        </div>
      </div>
    `;
    itemsRow.appendChild(col);
  });
}
