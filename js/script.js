/* ========================================
   MENÚ RESPONSIVE
======================================== */

const botonMenu = document.querySelector("#boton-menu");
const menu = document.querySelector("#menu");

botonMenu.addEventListener("click", () => {

    menu.classList.toggle("mostrar");

    const abierto = menu.classList.contains("mostrar");

    botonMenu.setAttribute(
        "aria-expanded",
        abierto
    );

});


/* Cerrar menú al seleccionar una opción */

const enlacesMenu = document.querySelectorAll(".menu a");

enlacesMenu.forEach((enlace) => {

    enlace.addEventListener("click", () => {

        menu.classList.remove("mostrar");

        botonMenu.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* ========================================
   TEMA CLARO / OSCURO
======================================== */

const botonTema = document.querySelector("#boton-tema");

const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {

    document.body.classList.add("oscuro");

    botonTema.textContent = "☀️";

}


botonTema.addEventListener("click", () => {

    document.body.classList.toggle("oscuro");

    if (document.body.classList.contains("oscuro")) {

        botonTema.textContent = "☀️";

        localStorage.setItem(
            "tema",
            "oscuro"
        );

    } else {

        botonTema.textContent = "🌙";

        localStorage.setItem(
            "tema",
            "claro"
        );

    }

});


/* ========================================
   FILTRO DE PROYECTOS
======================================== */

const botonesFiltro = document.querySelectorAll(".filtro");

const proyectos = document.querySelectorAll(".proyecto-card");


botonesFiltro.forEach((boton) => {

    boton.addEventListener("click", () => {

        botonesFiltro.forEach((item) => {

            item.classList.remove("activo");

        });


        boton.classList.add("activo");


        const filtro = boton.dataset.filtro;


        proyectos.forEach((proyecto) => {

            const categoria = proyecto.dataset.categoria;


            if (
                filtro === "todos" ||
                filtro === categoria
            ) {

                proyecto.style.display = "block";

            } else {

                proyecto.style.display = "none";

            }

        });

    });

});


/* ========================================
   MODAL DE PROYECTOS
======================================== */

const modal = document.querySelector("#modal-proyecto");

const modalTitulo = document.querySelector("#modal-titulo");

const modalDescripcion = document.querySelector("#modal-descripcion");

const botonesDetalles = document.querySelectorAll(".boton-detalles");

const cerrarModal = document.querySelector("#cerrar-modal");


const informacionProyectos = {

    agematch: {

        titulo: "AgeMatch",

        descripcion:
            "Sistema desarrollado con Django, TensorFlow y OpenCV para detectar edad y emociones mediante visión artificial."

    },

    mango: {

    titulo:
        "Clasificación de Patologías Foliares del Mango mediante Redes Neuronales Convolucionales",

    descripcion:
        "Proyecto de inteligencia artificial que utiliza redes neuronales convolucionales para clasificar enfermedades presentes en hojas de mango. Se trabajó con modelos como MobileNetV2, ResNet50 y DenseNet121 para comparar su rendimiento."

   },

    sistema_medico: {

        titulo: "Sistema Medico",

        descripcion:
                "Aplicación web desarrollada para gestionar pacientes, citas médicas y registros clínicos, facilitando la organización y consulta de información dentro de un entorno médico."

    }

};


botonesDetalles.forEach((boton) => {

    boton.addEventListener("click", () => {

        const proyecto = boton.dataset.proyecto;

        const informacion = informacionProyectos[proyecto];


        modalTitulo.textContent =
            informacion.titulo;

        modalDescripcion.textContent =
            informacion.descripcion;


        modal.showModal();

    });

});


cerrarModal.addEventListener("click", () => {

    modal.close();

});


/* ========================================
   FORMULARIO DE CONTACTO
======================================== */

const formulario =
    document.querySelector("#formulario-contacto");

const mensajeFormulario =
    document.querySelector("#mensaje-formulario");


if (formulario && mensajeFormulario) {

    formulario.addEventListener("submit", async (evento) => {

        evento.preventDefault();

        const nombre =
            document.querySelector("#nombre").value.trim();

        const correo =
            document.querySelector("#correo").value.trim();

        const mensaje =
            document.querySelector("#mensaje").value.trim();

        if (
            nombre === "" ||
            correo === "" ||
            mensaje === ""
        ) {

            mensajeFormulario.textContent =
                "Por favor completa todos los campos.";

            return;
        }

        mensajeFormulario.textContent =
            "Enviando mensaje...";

        const datos =
            new FormData(formulario);

        try {

            const respuesta =
                await fetch(formulario.action, {

                    method: formulario.method,

                    body: datos,

                    headers: {
                        "Accept": "application/json"
                    }

                });

            if (respuesta.ok) {

                mensajeFormulario.textContent =
                    `Gracias ${nombre}. Tu mensaje fue enviado correctamente.`;

                formulario.reset();

            } else {

                mensajeFormulario.textContent =
                    "No se pudo enviar el mensaje.";

            }

        } catch (error) {

            console.log(error);

            mensajeFormulario.textContent =
                "Ocurrió un error al enviar el mensaje.";

        }

    });

}