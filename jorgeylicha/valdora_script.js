document.addEventListener("DOMContentLoaded", () => {
    // Configuramos el detector de scroll (Intersection Observer)
    const opciones = {
        root: null,          // Usa el viewport del navegador
        rootMargin: "0px",   // No añade márgenes extra
        threshold: 0.15      // Se activa cuando el 15% del elemento ya es visible
    };

    const callback = (entradas, observador) => {
        entradas.forEach(entrada => {
            // Si el elemento entra en la pantalla...
            if (entrada.isIntersecting) {
                // Le añadimos la clase que inicia la animación en CSS
                entrada.target.classList.add("active");
                // Dejamos de observarlo para que la animación solo ocurra una vez
                observador.unobserve(entrada.target);
            }
        });
    };

    const observador = new IntersectionObserver(callback, opciones);

    // Seleccionamos todos los elementos con la clase 'reveal' y los ponemos bajo vigilancia
    const elementosAnimados = document.querySelectorAll(".reveal");
    elementosAnimados.forEach(elemento => observador.observe(elemento));
});

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. BANCO DE IMÁGENES HISTÓRICAS PARA CADA HITO DE VALDORA (Son 5 tarjetas)
    // Podés cambiar estos links por tus propias imágenes locales más adelante (ej: "./img/valdora1.jpg")
    const imagenesCronologia = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Solsona_des_del_Castellvell_-_panoramio.jpg/960px-Solsona_des_del_Castellvell_-_panoramio.jpg", // 1837: Llamado en Solsona
        "https://www.rutaspirineos.org/images/la-vall-d-ora-pla-de-busa-sant-pere-de-graudescales/la-vall-d-ora-pla-de-busa-sant-pere-de-graudescales-1.jpg", // 1838: Llegada a la Vall d'Ora
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Acci%C3%B3n_de_Piedrabuena_-_Carga_de_la_caballer%C3%ADa_del_Coronel_Melgerizo_%28Segunda_parte_de_la_Guerra_Civil._Anales_desde_1843_hasta_el_fallecimiento_de_don_Alfonso_XII%29.jpg/960px-thumbnail.jpg", // 1838-1840: Línea de fuego
        "https://upload.wikimedia.org/wikipedia/commons/5/5d/Don_carlos_de_borb%C3%B3n_nypl.jpg", // 1839: Rechazo de condecoración
        "https://lonelyplanetes.cdnstatics2.com/cdn/ff/lEJ5L10Z4DJZEPuhyI_lnYnWFebgmMyUy8_xBrIm90M/1728485720/public/styles/1536x864_scale_crop/public/blog/shutterstock_2313212401_%281%29.jpg?itok=7EenRHI6"  // 1840: Prisión y exilio
    ];

    // 2. INYECCIÓN AUTOMÁTICA DE IMÁGENES EN LAS TARJETAS
    const tarjetas = document.querySelectorAll(".tarjeta-tiempo");
    
    tarjetas.forEach((tarjeta, index) => {
        if (imagenesCronologia[index]) {
            // Creamos el contenedor de la imagen
            const contenedorImg = document.createElement("div");
            contenedorImg.className = "tarjeta-imagen-dinamica";
            
            // Creamos el elemento img
            const img = document.createElement("img");
            img.src = imagenesCronologia[index];
            img.alt = "Hito histórico Valdora";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";
            img.style.marginBottom = "15px";
            img.style.display = "block";

            contenedorImg.appendChild(img);
            
            // Colocamos el bloque de imagen arriba de todo, al inicio de la tarjeta
            tarjeta.insertBefore(contenedorImg, tarjeta.firstChild);
        }
    });

    // 3. MOTOR DE ANIMACIÓN INTERSECTION OBSERVER (REVEAL ON SCROLL)
    const opciones = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const registrarEntrada = (entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("active");
                observador.unobserve(entrada.target);
            }
        });
    };

    const observador = new IntersectionObserver(registrarEntrada, opciones);

    const elementosOcultos = document.querySelectorAll(".reveal");
    elementosOcultos.forEach(elemento => observador.observe(elemento));
});