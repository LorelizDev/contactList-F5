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
	let text; // Texto que aparecerá en la etiqueta al hacer una acción

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
		text = `${contact.name} ya no se encuentra entre tus contactos😢`;
	} else {
		text = `¡Decidiste darle otra oportunidad a ${contact.name}!😀`;
	}
	createLabel(text);
}

// CREATE - method POST - endpoint: http://localhost:3000/contacts
async function createContact() {
	const name = document.getElementById("nameContact");
	const phone = document.getElementById("phoneContact");
	const email = document.getElementById("emailContact");
	const group = document.getElementById("groupContact");

	const response = await fetch(URL_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name.value, // Contenido del input
			phone: phone.value,
			email: email.value,
			group: group.value,
		}),
	});

	if (response.ok) {
		// Limpiar el contenido de los input
		name.value = "";
		phone.value = "";
		email.value = "";
		group.value = "";
		showContacts();
		createLabel(`¡Agregaste a ${name.value} a tu lista de contactos!🎉`);
	} else {
		console.error("Error while creating contact");
	};

	const data = await response.json();
	return data;
}

// UPDATE - method PUT - endpoint: http://localhost:3000/contacts/<id>
async function updateContact(id) {

	const name = document.getElementById("nameContact");
	const phone = document.getElementById("phoneContact");
	const email = document.getElementById("emailContact");
	const group = document.getElementById("groupContact");

	const response = await fetch(`${URL_API}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: name.value,
			phone: phone.value,
			email: email.value,
			group: group.value,
		}),
	});

	if (response.ok) {
		createLabel(`¡Actualizaste la información de ${name.value}!✨`);
		// Limpiar el contenido de los input
		name.value = "";
		phone.value = "";
		email.value = "";
		group.value = "";
		showContacts();
	} else {
		console.error("Error while updating contact");
	};

	const data = await response.json();
	return data;
}

async function showContacts(contacts = null) {
	// Seleccionar el elemento ul donde estarán cada contacto en element
	const list = document.getElementById("contactList");
	list.innerHTML = "";
	
	// Si no se proporcionan contactos, se obtiene la lista completa
	if (!contacts) {
		contacts = await getAllContacts();
	}

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
					<div>
						${contact.group ? `<p class="contact__item-tag">Grupo:</p><p class="contact__info-item">${contact.group}</p>` : ""}
                    </div>
                    <div class="contact__info__buttons">
                        <i onclick="showEditContact('${contact.id}')" class="fa-solid fa-square-pen fa-xl"></i>
                        <i onclick="deleteContact('${contact.id}')" class="fa-solid fa-trash fa-lg"></i>
                    </div>
                </details>
            </div>
        </li>
        `;
		// Nota: Al usar un operador ternario (? :) directamente dentro del template, se asegura que la información del grupo se agregue correctamente al innerHTML de cada contacto en el momento en que se está generando.
		// Si la condición es verdadera (es decir, contact.group tiene un valor), el bloque de código HTML del grupo se inserta dentro del <div>.
		// Si la condición es falsa (es decir, contact.group está vacío o es null), no se inserta nada dentro del <div> (se inserta una cadena vacía "").
	});
}

function showAddContact() {
	// Esconder el botón de Actualizar contacto
	const btnUpdateContact = document.getElementById("btnUpdateContact");
	btnUpdateContact.style.display = "none";
	// Mostrar el botón de Añadir contacto
	const btnAddContact = document.getElementById("btnAddContact");
	btnAddContact.style.display = "block";
	// Mostrar modal con el form
	window.modal.showModal();
}

async function showEditContact(id) {
	// Obtener el contacto a editar
	const contact = await getOneContact(id);
	
	const nameContact = document.getElementById("nameContact");
	const phoneContact = document.getElementById("phoneContact");
	const emailContact = document.getElementById("emailContact");
	const groupContact = document.getElementById("groupContact");

	//Mostrar los datos del contacto en los input del form
	nameContact.value = contact.name;
	phoneContact.value = contact.phone;
	emailContact.value = contact.email;
	groupContact.value = contact.group;

	// Mostrar modal con el form
	window.modal.showModal();

	// Esconder el botón de Añadir contacto
	const btnAddContact = document.getElementById("btnAddContact");
	btnAddContact.style.display = "none";

	// Mostrar el botón de Actualizar contacto
	const btnUpdateContact = document.getElementById("btnUpdateContact");
	btnUpdateContact.style.display = "block";

	// Crear una copia del botón actualizar y reemplazar el anterior, eliminando así cualquier listener anterior
	const newBtnUpdateContact = btnUpdateContact.cloneNode(true);
    btnUpdateContact.parentNode.replaceChild(newBtnUpdateContact, btnUpdateContact);
	
	 // Añadir el nuevo listener
	 // Se añade el nuevo listener solo después de eliminar el anterior, lo que garantiza que no haya múltiples listeners en el mismo botón.
	newBtnUpdateContact.addEventListener('click', async (e) => {
		e.preventDefault();
		await updateContact(`${contact.id}`);
		window.modal.close();
	});
}

// Función para mostrar/ocultar el menú de filtrado
function toggleFilterMenu() {
    const filterMenu = document.getElementById("filterMenu");
	filterMenu.style.display = filterMenu.style.display === "block" ? "none" : "block";
}

// Función para filtrar contactos por grupo
async function filterByGroup(group) {
	const contacts = await getAllContacts();

	let filteredContacts;

	if (group === "all") {
		filteredContacts = contacts; // Mostrar todos los contactos si se selecciona 'Todos'
	} else {
		filteredContacts = contacts.filter(contact => contact.group === group);
	}

	showContacts(filteredContacts);
}

// Etiqueta de información al hacer una acción, ejemplo: crear o borrar un contacto
function createLabel(text) {
	const label = document.getElementById("messageLabel")
	const contentLabel = document.createElement('p');
	contentLabel.textContent = text;
	label.appendChild(contentLabel);

	setTimeout(() => {
		contentLabel.remove();
	}, 4000);
}

// Inicializar contactos al cargar la página
showContacts();