const woodForm = document.getElementById("woodForm");
const woodList = document.getElementById("woodList");

// Load saved wood data on page load
document.addEventListener("DOMContentLoaded", loadWoodData);

woodForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const woodType = document.getElementById("woodType").value.trim();
  const quantity = document.getElementById("quantity").value;
  const supplier = document.getElementById("supplier").value.trim();
  const dateReceived = document.getElementById("dateReceived").value;

  const record = {
    woodType,
    quantity,
    supplier,
    dateReceived
  };

  // Save to localStorage
  const woodData = JSON.parse(localStorage.getItem("woodStock")) || [];
  woodData.push(record);
  localStorage.setItem("woodStock", JSON.stringify(woodData));

  displayWoodRecord(record);
  woodForm.reset();
});

function loadWoodData() {
  const woodData = JSON.parse(localStorage.getItem("woodStock")) || [];
  woodList.innerHTML = "";
  woodData.forEach(displayWoodRecord);
}

function displayWoodRecord(record) {
  const item = document.createElement("p");
  item.innerHTML = `<strong>${record.woodType}</strong> - ${record.quantity} pcs from ${record.supplier} on ${record.dateReceived}`;
  woodList.appendChild(item);
}
