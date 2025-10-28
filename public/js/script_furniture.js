const furnitureForm = document.getElementById("furnitureForm");
const furnitureList = document.getElementById("furnitureList");

// Load saved data on page load
document.addEventListener("DOMContentLoaded", loadFurnitureData);

furnitureForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const furnitureType = document.getElementById("furnitureType").value.trim();
  const material = document.getElementById("material").value.trim();
  const quantity = document.getElementById("quantity").value;
  const price = document.getElementById("price").value;

  const record = {
    furnitureType,
    material,
    quantity,
    price
  };

  // Save to localStorage
  const furnitureData = JSON.parse(localStorage.getItem("furnitureStock")) || [];
  furnitureData.push(record);
  localStorage.setItem("furnitureStock", JSON.stringify(furnitureData));

  displayFurnitureRecord(record);
  furnitureForm.reset();
});

function loadFurnitureData() {
  const furnitureData = JSON.parse(localStorage.getItem("furnitureStock")) || [];
  furnitureList.innerHTML = "";
  furnitureData.forEach(displayFurnitureRecord);
}

function displayFurnitureRecord(record) {
  const item = document.createElement("p");
  item.innerHTML = `<strong>${record.furnitureType}</strong> (${record.material}) - ${record.quantity} pcs @ UGX ${record.price}`;
  furnitureList.appendChild(item);
}
