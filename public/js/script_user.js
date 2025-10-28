const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

// Load saved data on page load
document.addEventListener("DOMContentLoaded", loadUserData);

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const role = document.getElementById("role").value;

  const record = { name, email, role };

  // Save to localStorage
  const userData = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  userData.push(record);
  localStorage.setItem("registeredUsers", JSON.stringify(userData));

  displayUserRecord(record);
  userForm.reset();
});

function loadUserData() {
  const userData = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  userList.innerHTML = "";
  userData.forEach(displayUserRecord);
}

function displayUserRecord(record) {
  const item = document.createElement("p");
  item.innerHTML = `<strong>${record.name}</strong> - ${record.role} (${record.email})`;
  userList.appendChild(item);
}
