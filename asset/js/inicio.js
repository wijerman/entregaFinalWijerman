function guardarDatosUsuario(datos) {
    // Convertir el objeto de datos a una cadena JSON
    const datosJSON = JSON.stringify(datos);
    // Guardar los datos en el almacenamiento local del navegador
    localStorage.setItem('datosUsuario', datosJSON);
}

function validarForm() {
    // Obtener los valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;

    // Validar si algún campo está vacío
    if (!nombre || !apellido || !edad) {
        mostrarMensajeError("Completa todos los campos.");
        return false;
    }

    // Validar si la edad es menor de 18 años
    if (parseInt(edad) < 18) {
        mostrarMensajeError("Debes ser mayor de 18 años para acceder.");
        return false;
    }

    // Crear objeto con los datos del formulario
    const datos = { nombre, apellido, edad };

    // Guardar los datos del usuario
    guardarDatosUsuario(datos);

    // Mostrar mensaje de confirmación
    mostrarConfirmacion(datos);

    return false; // Prevent form submission
}


// Función para mostrar mensaje de confirmación con SweetAlert
function mostrarConfirmacion(datos) {
    Swal.fire({
        title: "¿Tus datos han sido ingresados correctamente?",
        text: "Por favor, confirma.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, redirigir al usuario a la página de GitHub donde está Home.html
            window.location.href = "/asset/pages/Home.html";
        } else {
            // Si el usuario no confirma, mostrar mensaje de error
            mostrarMensajeError("Tus datos ingresados recientemente fueron eliminados, por favor vuelve a completar el formulario correctamente para poder ingresar!");
        }
    });
}
