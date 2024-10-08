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
	createLabel(text, "messageContact");
}

// CREATE - method POST - endpoint: http://localhost:3000/contacts
async function createContact() {
	const name = document.getElementById("nameContact");
	const phone = document.getElementById("phoneContact");
	const email = document.getElementById("emailContact");
	const group = document.getElementById("groupContact");
	let text;

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
		text = `¡Agregaste a ${name.value} a tu lista de contactos!🎉`
		createLabel(text, "messageContact");
		// Limpiar el contenido de los input
		cleanForm();
		showContacts();
	} else {
		text = `No se pudo agregar a ${name.value} a tus contactos!🤔`
		createLabel(text, "messageContact");
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
		createLabel(`¡Actualizaste la información de ${name.value}!✨`, "messageContact")
		// Limpiar el contenido de los input
		cleanForm();
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
					${contact.phone ? `<p class="contact__item-tag">Teléfono:</p><p class="contact__info-item">${contact.phone}</p>` : ""}
                    </div>
                    <div>
					${contact.email ? `<p class="contact__item-tag">Correo electrónico:</p><p class="contact__info-item">${contact.email}</p>` : ""}
                    </div>
					<div>
						${contact.group ? `<p class="contact__item-tag">Grupo:</p><p class="contact__info-item">${contact.group}</p>` : ""}
                    </div>
                    <div class="contact__info__buttons">
                        <button class="btn-icon" onclick="showEditContact('${contact.id}')"><i class="fa-solid fa-square-pen fa-xl"></i></button>
                        <button class="btn-icon" onclick="deleteContact('${contact.id}')"><i class="fa-solid fa-trash fa-lg"></i></button>
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

    // Mostrar los datos del contacto en los input del form
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

    // Guardar el ID del contacto en un atributo de datos del botón
    btnUpdateContact.dataset.contactId = id;

    // Crear una copia del botón actualizar y reemplazar el anterior, eliminando así cualquier listener anterior
    const newBtnUpdateContact = btnUpdateContact.cloneNode(true);
    btnUpdateContact.parentNode.replaceChild(newBtnUpdateContact, btnUpdateContact);
    
    // Añadir el listener para validar y actualizar
    newBtnUpdateContact.addEventListener('click', (e) => {
        e.preventDefault();
        validateForm('update');
    });
}

// Función para validar el formulario
function validateForm(action) {
    const name = document.getElementById("nameContact").value.trim();
    const phone = document.getElementById("phoneContact").value.trim();
    const email = document.getElementById("emailContact").value.trim();
    
    // Validación del campo de nombre
    if (name === "") {
        createLabel("El nombre es requerido. Por favor, ingrésalo.", "messageForm");
        return;
    }
    
    // Validación del campo de teléfono (solo números y símbolo +)
    if (phone !== "") {
		const phonePattern = /^\+?\d+$/;
		if (!phonePattern.test(phone)) {
			createLabel("El teléfono debe comenzar con un símbolo + opcional seguido solo de números.", "messageForm");
			return;
		}
	}

    // Validación del campo de correo electrónico (formato válido de email)
    if (email !== "") {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(email)) {
			createLabel("Por favor, ingresa un correo electrónico válido.", "messageForm");
			return;
		}
	}

    // Si la validación es exitosa, proceder con la acción
    if (action === 'add') {
        createContact();
    } else if (action === 'update') {
        const contactId = document.getElementById("btnUpdateContact").dataset.contactId;
        updateContact(contactId);
    }
    
    // Cerrar el modal
    window.modal.close();
}

// Función para limpiar el formulario
function cleanForm() {
	document.getElementById("nameContact").value = "";
	document.getElementById("phoneContact").value = "";
	document.getElementById("emailContact").value = "";
	document.getElementById("groupContact").value = "";
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
function createLabel(text, labelId) {
	const label = document.getElementById(labelId)
	const contentLabel = document.createElement('p');
	contentLabel.textContent = text;
	label.appendChild(contentLabel);

	setTimeout(() => {
		contentLabel.remove();
	}, 4000);
}

// Función para buscar un contacto
async function findContact() {
	const searchInput = document.getElementById("contentFinder");
	const contentFinder = searchInput.value;

	const contacts = await getAllContacts();

	// Filtrar los contactos que coinciden con la búsqueda
    const filteredContacts = contacts.filter(contact => 
        contact.name.toLowerCase().includes(contentFinder.toLowerCase()) || 
        contact.phone.toLowerCase().includes(contentFinder.toLowerCase()) || 
        contact.email.toLowerCase().includes(contentFinder.toLowerCase())
    );

	// Verificar si hay contactos filtrados
    if (filteredContacts.length > 0) {
		// Mostrar los contactos filtrados
        showContacts(filteredContacts);
    } else {
        // Mostrar el mensaje de que no se encontró ningún contacto
        createLabel("Lo siento. No se encontró ningún contacto🤷", "messageContact");
		showContacts();
    }

	// Limpiar el input después de la búsqueda
	searchInput.value = "";
}

// Inicializar contactos al cargar la página
showContacts();