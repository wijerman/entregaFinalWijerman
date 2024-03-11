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

    // Enviar los datos del formulario al servidor utilizando Fetch API
    fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(response => {
        // Verificar si la respuesta es correcta
        if (!response.ok) {
            throw new Error('Error al enviar los datos.');
        }
        return response.json();
    })
    .then(() => {
        // Mostrar un mensaje de confirmación al usuario
        mostrarConfirmacion(datos);
    })
    .catch(() => {
        // Mostrar mensaje de error si falla el envío de datos
        mostrarMensajeError("Error al enviar los datos. Por favor, intenta nuevamente más tarde.");
    });

    return false;
}

// Función para mostrar mensaje de confirmación con SweetAlert
function mostrarConfirmacion(datos) {
    Swal.fire({
        title: "Tus datos han sido ingresados correctamente? ",
        text: "Por favor, confirma.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, guardar los datos en el LocalStorage
            guardarDatosLS(datos);
            // Mostrar mensaje de éxito y redirigir al usuario a una página de inicio
            mostrarMensajeExito("Tus datos fueron guardados correctamente. Bienvenido a LrKinesio");
        } else {
            // Si el usuario no confirma, eliminar los datos del LocalStorage y mostrar un mensaje de error
            eliminarDatosLS();
            mostrarMensajeError("Tus datos ingresados recientemente fueron eliminados, por favor vuelve a completar el formulario correctamente para poder ingresar!");
        }
    });
}

// Función para mostrar mensaje de error con SweetAlert
function mostrarMensajeError(mensaje) {
    Swal.fire({
        position: "top",
        icon: "error",
        text: mensaje,
        showConfirmButton: false,
        timer: 5000
    });
}

// Función para mostrar mensaje de éxito con SweetAlert y redirigir a una URL
function mostrarMensajeExito(mensaje, url) {
    Swal.fire({
        title: "Guardado!",
        text: mensaje,
        icon: "success"
    }).then(() => {
        window.location.href ="./Home.html";
    });
    
}

// Función para guardar los datos en el LocalStorage
function guardarDatosLS(datos) {
    localStorage.setItem("datosForm", JSON.stringify(datos));
}

// Función para eliminar los datos del LocalStorage
function eliminarDatosLS() {
    localStorage.removeItem("datosForm");
}
