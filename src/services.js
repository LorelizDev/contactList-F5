// URL de nuestra Api simulada
const baseUrl = "http://localhost:3000/contacts";

// READ - method GET - endpoint: http://localhost:3000/contacts
async function getAllContacts() {
    const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    return data;
}

async function getOneContact(id) {
    const response = await fetch(`baseUrl/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    console.log(data);
    return data;
}

// DELETE - method DELETE - endpoint: http://localhost:3000/contacts/<id>
async function deleteContact(id) {
    const response = await fetch(`baseUrl/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) {
        getTasks();
      } else {
        console.error("Error while deleting contact");
      }
}
// deleteContact(1)

// CREATE - method POST - endpoint: http://localhost:3000/contacts
async function createContact(name, phone, email) {
    const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            email: email
          }),
    });
    const data = await response.json();
    console.log(data);
    return data;
}
// createContact("Nathan Sebhastian", "123654789", "ns@mail.com")

// UPDATE - method PUT - endpoint: http://localhost:3000/contacts/<id>
async function updateContact(id, name, phone, email) {
    const response = await fetch(`baseUrl/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            email: email
          }),
    });
    const data = await response.json();
    console.log(data);
    return data;
}
// updateContact(2, "Lulu", "1234", "lulu@mail.com")

function showContacts(contacts) {
    const list = document.getElementById("container");
    list.innerHTML = "";
    
    const contactList = contacts.map(contact => {
        list.innerHTML += `
        <div class="contact">
            <p class="title">Contacto nº <span class="idContact">${contact.id}</span></p>
            <p class="title">Nombre: <span class="name">${contact.name}</span></p>
            <p class="title">Teléfono: <span class="phone">${contact.phone}</span></p>
            <p class="title">Correo electrónico: <span class="email">${contact.email}</span></p>
            <button type="button" id="contact${contact.id}"><i class="fa-solid fa-trash"></i></button>
        </div>
        `
        const deleteButton = document.getElementById(`contact${contact.id}`)
        deleteButton.addEventListener('click', () => {
            deleteContact(contact.id);
        });
    });
};

getAllContacts().then(showContacts);