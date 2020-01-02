const storeForm = document.getElementById('store-form');
const storeId = document.getElementById('store-id');
const storeAdress = document.getElementById('store-adress');

async function addStore(e) {
  e.preventDefault();
  if (storeId.value === '' || storeAdress === '') {
    alert('Wypełnij wszystkie pola');
  }
  const sendBody = {
    storeId: storeId.value,
    adress: storeAdress.value
  };
console.log(sendBody)
  try {
    const res = await fetch('/api/v1/stores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });
    if (res.status === 400) {
      throw Error('Sklep już istnieje');
    }
    alert('Store added');
    window.location.href = '/index.0html';
  } catch (err) {
    alert(err);
    return;
  }
}

storeForm.addEventListener('submit', addStore);
