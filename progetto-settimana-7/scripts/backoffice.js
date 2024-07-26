const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzOGIzOWYyNjBjYzAwMTVjYzBlYWYiLCJpYXQiOjE3MjE5OTQwNDEsImV4cCI6MTcyMzIwMzY0MX0.Zv6M7u0s0rJPIjR1vyIEYXGPxv9VUheJqWaT9e-Vs2Q '; // Sostituisci 'YOUR_TOKEN_HERE' con il tuo token effettivo

document.getElementById('item-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const brand = document.getElementById('brand').value;
  const imageUrl = document.getElementById('imageUrl').value;

 
  if (!name || !description || !price || !brand || !imageUrl) {
    alert('Per favore, riempi tutti i campi richiesti.');
    return;
  }

  const newItem = {
    name,
    description,
    price,
    brand,
    imageUrl
  };

  console.log('Dati da inviare:', newItem);

  fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(newItem)
  })
    .then((response) => {
      if (response.ok) {
        alert('Carta creata con successo!');
      
      } else {
        return response.json().then((errorData) => {
          throw new Error(`Errore nella creazione della carta: ${errorData.message}`);
        });
      }
    })
    .catch((error) => {
      console.error('Si è verificato un errore:', error.message);
    });
});
