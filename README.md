# Proyecto de Lista de Contactos

<div style="display: flex; justify-content: center">
    <image style="height: 500px" src="assets/img/screenshot_app.png" alt="Captura de pantalla de la aplicación">
</div>

## Descripción

Este proyecto ha sido realizado durante el **Bootcamp de Desarrollo Web Full Stack de Factoria F5**. Es un ejercicio para practicar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando JavaScript vanilla. La aplicación permite a los usuarios gestionar una lista de contactos con funcionalidades para agregar, actualizar, eliminar y buscar contactos.

## Características

- **Crear Contacto**: Agregar nuevos contactos a la lista.
- **Leer Contactos**: Ver una lista de todos los contactos.
- **Actualizar Contacto**: Editar los detalles de un contacto existente.
- **Eliminar Contacto**: Eliminar contactos de la lista.
- **Buscar**: Filtrar contactos por nombre, teléfono o correo electrónico.
- **Filtrar por Grupo**: Ver contactos por su grupo (Familia, Amigos, Trabajo).
- **Validación de Formulario**: Asegurar que todos los campos del formulario sean válidos antes de enviarlo.
- **Diseño Adaptativo**: Estilos adaptados para pantallas grandes.

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/LorelizDev/contactList-F5.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd contactList-F5
    ```

3. Abre `index.html` en un navegador web.

## Uso

1. **Agregar Contactos**: Haz clic en "Añadir" para abrir el modal del formulario, completa los detalles del contacto y haz clic en "Añadir" para guardar.
2. **Actualizar Contactos**: Haz clic en el ícono de editar junto a un contacto para abrir el formulario con los detalles existentes, realiza los cambios y haz clic en "Actualizar" para guardar.
3. **Eliminar Contactos**: Haz clic en el ícono de la papelera junto a un contacto para eliminarlo. Confirma la eliminación en el cuadro de diálogo de confirmación.
4. **Buscar Contactos**: Usa la barra de búsqueda para encontrar contactos por nombre, teléfono o correo electrónico.
5. **Filtrar Contactos**: Utiliza el menú "Filtrar" para ver contactos por grupo o mostrar todos los contactos.

## Endpoints de la API

- **GET** `/contacts`: Obtener todos los contactos.
- **GET** `/contacts/:id`: Obtener un contacto específico por ID.
- **POST** `/contacts`: Crear un nuevo contacto.
- **PUT** `/contacts/:id`: Actualizar un contacto existente.
- **DELETE** `/contacts/:id`: Eliminar un contacto por ID.

## Estructura de Archivos

```textplain
contactList-F5
├── assets
│   └── img
│       └── screenshot_app.png
├── node_modules
├── server
│   └── db.json
├── src
│   ├── services.js
│   └── style.css
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
└── README.md
```

## Ejemplo de Uso

```javascript
// Obtener todos los contactos
const contacts = await getAllContacts();

// Agregar un nuevo contacto
await createContact();

// Actualizar un contacto existente
await updateContact(contactId);

// Eliminar un contacto
await deleteContact(contactId);

// Buscar contactos
await findContact();

// Filtrar contactos por grupo
await filterByGroup('Familia');
```

## Notas

- **Almacenamiento de Datos:** Este proyecto utiliza una API simulada para la gestión de datos, que se asume que está en ejecución en http://localhost:3000/contacts.
- **Estilos:** El proyecto incluye estilos básicos para asegurar una interfaz de usuario responsiva y amigable.

## Contribuciones

Siéntete libre de enviar problemas o solicitudes de extracción para mejorar el proyecto.