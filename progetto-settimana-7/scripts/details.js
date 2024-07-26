const URL = 'https://striveschool-api.herokuapp.com/api/product/';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEzOGIzOWYyNjBjYzAwMTVjYzBlYWYiLCJpYXQiOjE3MjE5OTQwNDEsImV4cCI6MTcyMzIwMzY0MX0.Zv6M7u0s0rJPIjR1vyIEYXGPxv9VUheJqWaT9e-Vs2Q '; // Sostituisci 'YOUR_TOKEN_HERE' con il tuo token effettivo

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('id'); 



function populateForm(item) {
  document.getElementById('name').value = item.name;
  document.getElementById('description').value = item.description;
  document.getElementById('price').value = item.price;
  document.getElementById('brand').value = item.brand;
  document.getElementById('imageUrl').value = item.imageUrl;
}


fetch(`${URL}${itemId}`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Errore nel recupero dei dettagli della carta');
    }
  })
  .then((itemDetails) => {
    console.log('DETTAGLI CARTA', itemDetails);
    populateForm(itemDetails);
  })
  .catch((error) => {
    console.error('Si è verificato un errore:', error);
  });


document.getElementById('update-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const updatedItem = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
    brand: document.getElementById('brand').value,
    imageUrl: document.getElementById('imageUrl').value
  };

  console.log('Dati aggiornati:', updatedItem);

  fetch(`${URL}${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updatedItem)
  })
    .then((response) => {
      if (response.ok) {
        alert('Carta modificato con successo!');
     
      } else {
        return response.json().then((errorData) => {
          throw new Error(`Errore nella modifica della carta: ${errorData.message}`);
        });
      }
    })
    .catch((error) => {
      console.error('Si è verificato un errore:', error.message);
    });
});


document.getElementById('delete-button').addEventListener('click', function () {
  if (confirm('Sei sicuro di voler eliminare questa carta?')) {
    fetch(`${URL}${itemId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          alert('Carta eliminata con successo!');
         
          window.location.href = './index.html';
        } else {
          return response.json().then((errorData) => {
            throw new Error(`Errore nell'eliminazione della carta: ${errorData.message}`);
          });
        }
      })
      .catch((error) => {
        console.error('Si è verificato un errore:', error.message);
      });
  }
});
