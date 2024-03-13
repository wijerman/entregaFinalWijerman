// Definición del array de objetos con la información de cada tarjeta
var tarjetas = [
    { imagen: "../imagenes/esccr.jpg", enlace: "./index2.html", textoBoton: "Kinesiologia" },
    { imagen: "../imagenes/descarga.jpg", enlace: "./index3.html", textoBoton: "Quiropraxia" },
    { imagen: "../imagenes/images.jpg", enlace: "./index4.html", textoBoton: "Osteopatia" }
];

// Función para crear una tarjeta a partir de un objeto terapia
function crearTarjeta(terapia) {
    // Crear un elemento <div> para la tarjeta
    var card = document.createElement("div");
    card.classList.add("card"); // Agregar la clase "card" al elemento <div>

    // Crear un elemento <img> para la imagen de la terapia
    var img = document.createElement("img");
    img.src = terapia.imagen; // Establecer la fuente de la imagen
    img.alt = ""; // Dejar el atributo alt vacío por ahora

    // Crear un elemento <a> para el enlace de la tarjeta
    var link = document.createElement("a");
    link.href = terapia.enlace; // Establecer el enlace de destino
    link.classList.add("btn", "btn-primary"); // Agregar clases "btn" y "btn-primary" al enlace
    link.textContent = terapia.textoBoton; // Establecer el texto del botón

    // Agregar la imagen y el enlace como hijos de la tarjeta
    card.appendChild(img);
    card.appendChild(link);

    return card; // Devolver la tarjeta creada
}

// Función para manejar el clic en una tarjeta
function manejarClicTarjeta(event) {
    var enlace = event.currentTarget.querySelector("a").href; // Obtener el enlace de la tarjeta clicada
    console.log("Se ingresó a: " + enlace); // Mostrar el enlace en la consola
}

// Crear un contenedor padre para todas las tarjetas
var contenedorPadre = document.createElement("div");
contenedorPadre.classList.add("contenedor"); // Agregar la clase "contenedor" al contenedor padre

// Iterar sobre cada objeto terapia y crear una tarjeta para cada uno
tarjetas.forEach(function(tarjeta) {
    var card = crearTarjeta(tarjeta); // Crear una tarjeta utilizando la función crearTarjeta
    card.addEventListener("click", manejarClicTarjeta); // Agregar un evento de clic a la tarjeta
    contenedorPadre.appendChild(card); // Agregar la tarjeta al contenedor padre
});

// Agregar el contenedor padre al cuerpo del documento HTML
document.body.appendChild(contenedorPadre);

function recuperarInformacionDeGithub() {
    //    // URL de la página Home.html en tu repositorio de GitHub
        const githubUrl = "https://raw.githubusercontent.com/wijerman/javascriptHome/master/jshome.json";
    
       //Realizar una solicitud de Fetch para obtener el contenido de la página Home.html
       fetch(githubUrl)
       .then(response => {
       
    
    return response.json()
       })
       .then(data => {
      console.log(data,"esta es la data que llega de github");
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

recuperarInformacionDeGithub();