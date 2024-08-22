// URL de nuestra Api simulada
const baseUrl = "http://localhost:3000/contacts";

// READ - method GET - endpoint: http://localhost:3000/contacts
// Traer todos los contactos
async function getAllContacts() {
	const response = await fetch(baseUrl, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	console.log(data);
	return data;
}

// READ - method GET - Traer un contacto por su id
async function getOneContact(id) {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	console.log(data);
	return data;
}

// DELETE - method DELETE - endpoint: http://localhost:3000/contacts/<id>
async function deleteContact(id) {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		getAllContacts();
	} else {
		console.error("Error while deleting contact");
	}
}
// deleteContact(1)

// CREATE - method POST - endpoint: http://localhost:3000/contacts
async function createContact() {
	const name = document.getElementById("nameContact");
	const phone = document.getElementById("phoneContact");
	const email = document.getElementById("emailContact");

	const response = await fetch(baseUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name.value, // Contenido del input
			phone: phone.value,
			email: email.value,
		}),
	});

	if (response.ok) {
		getAllContacts();
	} else {
		console.error("Error while creating contact");
	}
}

// UPDATE - method PUT - endpoint: http://localhost:3000/contacts/<id>
async function updateContact(id, name, phone, email) {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name,
			phone: phone,
			email: email,
		}),
	});
	const data = await response.json();
	console.log(data);
	return data;
}
// updateContact(2, "Lulu", "1234", "lulu@mail.com")

function showContacts(contacts) {
	const list = document.getElementById("contactList");
	list.innerHTML = "";

	const contactList = contacts.map((contact) => {
		// Crea un elemento li para cada contacto
		const contactLi = document.createElement("li");
		// Añade el id al li
		contactLi.setAttribute("data-id", contact.id);

		// Plantilla de cada contacto
		contactLi.innerHTML += `
            <p class="title">Contacto nº <span class="idContact">${contact.id}</span></p>
            <p class="title">Nombre: <span class="name">${contact.name}</span></p>
            <p class="title">Teléfono: <span class="phone">${contact.phone}</span></p>
            <p class="title">Correo electrónico: <span class="email">${contact.email}</span></p>
        `;

		// Botón eliminar contacto
		const deleteButton = document.createElement("button"); // Crea el botón
		// Añade un evento al hacer click en el botón para que ejecute la función deleteContact
		deleteButton.addEventListener("click", () => deleteContact(contact.id));

		// Icono de bote de basura
		const trashIcon = document.createElement("i"); // Crea el icono
		// Añadimos la clase "fa-solid fa-trash" para que se pinte el icono de bote de basura, pero como son 2 clases (estan separadas por espacio), debemos pasar cada una como argumento
		trashIcon.classList.add("fa-solid", "fa-trash");

		// Agregar el icono trash al botón eliminar
		deleteButton.appendChild(trashIcon);

		// Agregar los botones al div contact
		contactLi.appendChild(deleteButton);

		// Agregar cada contactLi a la lista
		list.appendChild(contactLi);
	});
};

// Añade un evento al hacer click en el botón "Añadir contacto" para que ejecute la función addContact
const addContact = document.getElementById("addContact");
addContact.addEventListener("click", () => createContact());

getAllContacts().then(showContacts);