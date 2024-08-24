// URL de nuestra Api simulada
const URL_API = "http://localhost:3000/contacts";

// READ - method GET - endpoint: http://localhost:3000/contacts
// Traer todos los contactos
async function getAllContacts() {
	const response = await fetch(URL_API, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
}

// READ - method GET - Traer un contacto por su id
async function getOneContact(id) {
	const response = await fetch(`${URL_API}/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
}

// DELETE - method DELETE - endpoint: http://localhost:3000/contacts/<id>
async function deleteContact(id) {
	// Obtener el contacto a eliminar
	const contact = await getOneContact(id);

	// Crear un cuadro de confirmación
	const textConfirm = `¿Estás seguro de eliminar a ${contact.name} de tus contactos?`;
	if (confirm(textConfirm)) { // Si responde "Aceptar" (true), se hace la petición DELETE
		const response = await fetch(`${URL_API}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
        if (response.ok) {
            showContacts();
        } else {
            console.error("Error while deleting contact");
        }
		console.log(`${contact.name} ya no se encuentra entre tus contactos`);
	} else {
		console.log(`Decidiste darle otra oportunidad a ${contact.name}`);
	}
}

// CREATE - method POST - endpoint: http://localhost:3000/contacts
async function createContact() {
	const name = document.getElementById("nameContact");
	const phone = document.getElementById("phoneContact");
	const email = document.getElementById("emailContact");

	const response = await fetch(URL_API, {
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
		// Limpiar el contenido de los input
		name.value = "";
		phone.value = "";
		email.value = "";
		showContacts();
	} else {
		console.error("Error while creating contact");
	}
}

// UPDATE - method PUT - endpoint: http://localhost:3000/contacts/<id>
async function updateContact(id, name, phone, email) {
	const response = await fetch(`${URL_API}/${id}`, {
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

async function showContacts() {
	// Seleccionar el elemento ul donde estarán cada contacto en element
	const list = document.getElementById("contactList");
	// list.innerHTML = "";
	
	const contacts = await getAllContacts(); // Traer todos los contactos
	// Recorrer la lista de contactos y mostrar cada uno de ellos
	contacts.map((contact) => {
		// Plantilla de cada contacto
		list.innerHTML += `
		<li class="contact">
            <div class="contact__avatar">
                <i class="fa-solid fa-circle-user fa-2xl"></i>
            </div>
            <div class="contact__info">
                <details>
                    <summary>${contact.name}</summary>
                    <div>
                        <p class="contact__item-tag">Teléfono:</p>
                        <p class="contact__info-item">${contact.phone}</p>
                    </div>
                    <div>
                        <p class="contact__item-tag">Correo electrónico:</p>
                        <p class="contact__info-item">${contact.email}</p>
                    </div>
                    <div class="contact__info__buttons">
                        <i class="fa-solid fa-square-pen fa-xl"></i>
                        <i onclick="deleteContact('${contact.id}')" class="fa-solid fa-trash fa-lg"></i>
                    </div>
                </details>
            </div>
        </li>
        `;
	});
}

showContacts();