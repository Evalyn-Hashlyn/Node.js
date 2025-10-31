function showSection(id) {
  document.querySelectorAll('section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  }
//   showSection('sales');
  function recordSale(event) {
  event.preventDefault();
  const name = document.getElementById('customerName').value;
  const product = document.getElementById('product').value;
  const qty = document.getElementById('quantity').value;
  const amount = document.getElementById('amount').value;
  const salesDiv = document.getElementById('salesList');
  const newSale = document.createElement('div');
  newSale.innerHTML = `<p><strong>${name}</strong> purchased <strong>${qty}</strong> ${product}(s) for $${amount}.</p>`;
  
  salesDiv.appendChild(newSale);
  document.getElementById('salesForm').reset();
  }