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

    // Mostrar mensaje de confirmación
    mostrarConfirmacion(datos);

    return false; // Prevent form submission
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
            // Si el usuario confirma, redirigir al usuario a la página de GitHub donde está Home.html
            redirigirAHomeEnGitHub();
        } else {
            // Si el usuario no confirma, mostrar mensaje de error
            mostrarMensajeError("Tus datos ingresados recientemente fueron eliminados, por favor vuelve a completar el formulario correctamente para poder ingresar!");
        }
    });
}

// Función para redirigir al usuario a la página de GitHub donde está Home.html
 function redirigirAHomeEnGitHub() {
//    // URL de la página Home.html en tu repositorio de GitHub
    const githubUrl = "https://raw.githubusercontent.com/wijerman/entregaFinalWijerman/master/asset/pages/Home.html";

   //Realizar una solicitud de Fetch para obtener el contenido de la página Home.html
   fetch(githubUrl)
   .then(response => {
    if (!response.ok) {
        throw new Error('No se pudo obtener la página Home.html');
    }
    return response.text();
   })
   .then(html => {
    //Crear un objeto tipo blob con el contenido HTML obtenido
    const blob = new Blob([html], {type: 'text/html' });
    const url = URL.createObjectURL(blob);
console.log(URL);
const newWindow = window.open(url);
//Ensure that the CSS file is loaded after the HTML is completely loaded
    // newWindow.addEventListener('DOMContentLoaded', () => {
    //   const link = newWindow.document.createElement('link');
    //   link.rel = 'stylesheet';
    //   link.type = 'text/css';
    //   link.href = '../css/estilo.css';
    //   newWindow.document.head.appendChild(link);
    // });
    //Redirigir al usuario a la página Home.html
    // window.location.href = .Home.html; 
   })

   .catch(error => {
    //Manejar errores de solicitud Fetch
    console.error('Error al obtener la página Home.html', error);
    mostrarMensajeError("Error al obtener la página Home.html. Por favor, intenta nuevamente más tarde.");
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