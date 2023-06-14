console.log("hello world");
const API_URL = `http://localhost:3000`;
//
async function createUser() {
  const userData = {};
  userData.name = document.getElementById("name").value;
  userData.email = document.getElementById("email").value;
  userData.phone = document.getElementById("phone").value;
  console.log(JSON.stringify(userData));
  const response = await fetch(`${API_URL}/savedata`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  let data = await response.json();
  console.log(data);
}


async function showNewUserOnScreen() {
  const response = await fetch(`${API_URL}/all-users`);
  const data = await response.json();
  const userList = document.getElementById("listofuser");

  data.forEach((user) => {
    const listItem = document.createElement("li"); 
    listItem.textContent = `Name: ${user.name}, Email: ${user.email}, Phone Number: ${user.phone} `;

    const editButton = document.createElement("button"); 
    editButton.textContent = "Edit"; 
    editButton.addEventListener("click", () => editUserDetails(user.id)); 
    const deleteButton = document.createElement("button"); 
    deleteButton.textContent = "Delete"; 
    deleteButton.addEventListener("click", () => deleteUser(user.id)); 

    listItem.appendChild(editButton); 
    listItem.appendChild(deleteButton); 
    userList.appendChild(listItem); 
  });
}

async function editUserDetails(id) {
  const newName = prompt("Enter new name");
  const newEmail = prompt("Enter new email");
  const newPhone = prompt("Enter new phone number");
  const updatedDetails = {
    userId : id ,
    newName,
    newEmail,
    newPhone
  }
  const response = await fetch(`${API_URL}/update-user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDetails),
  });
}
// Delete function 
async function deleteUser(id) {
  const response = await fetch(`${API_URL}/delete-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: id }),
  });
  console.log(" User deleted", response);
}

showNewUserOnScreen();

const botam = document.getElementById("botam");

botam.addEventListener("click", (e) => {
  e.preventDefault();
  createUser();
});
