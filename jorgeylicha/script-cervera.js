document.addEventListener("DOMContentLoaded", () => {
    // Configuración del Intersection Observer para el scroll suave
    const opciones = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Inicia la animación al ver el 15% de la tarjeta
    };

    const registrarEntrada = (entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("active");
                observador.unobserve(entrada.target); // Dejamos de observar para evitar doble animación
            }
        });
    };

    const observador = new IntersectionObserver(registrarEntrada, opciones);

    // Identificamos todos los elementos con la clase .reveal y los observamos
    const elementosOcultos = document.querySelectorAll(".reveal");
    elementosOcultos.forEach(elemento => observador.observe(elemento));
});

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. BANCO DE IMÁGENES HISTÓRICAS PARA CADA HITO
    // Podés cambiar los links de acá abajo por tus propias imágenes locales (ej: "./img/foto1.jpg")
    const imagenesCronologia = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/El_dos_de_mayo_de_1808_en_Madrid.jpg/960px-El_dos_de_mayo_de_1808_en_Madrid.jpg", // 1800: Nacimiento
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/HOSPITAL_BERENGUER_DE_CASTELLTORT_-_CERVERA_-_IB-567.JPG/960px-HOSPITAL_BERENGUER_DE_CASTELLTORT_-_CERVERA_-_IB-567.JPG", // 1818: Hospital Castelltort
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Rectorado_de_la_UPCT.jpg/960px-Rectorado_de_la_UPCT.jpg", // 1844: Regreso exilio
        "https://centros.lasallefp.com/img/centros/13/90126c28c70686f7283d515a3bf27980.JPG"  // 1860: Consolidación
    ];

    // 2. INYECCIÓN AUTOMÁTICA DE IMÁGENES EN LAS TARJETAS
    const tarjetas = document.querySelectorAll(".tarjeta-tiempo");
    
    tarjetas.forEach((tarjeta, index) => {
        if (imagenesCronologia[index]) {
            // Creamos el contenedor de la imagen
            const contenedorImg = document.createElement("div");
            contenedorImg.className = "tarjeta-imagen-dinamica";
            
            // Creamos la etiqueta de imagen propiamente dicha
            const img = document.createElement("img");
            img.src = imagenesCronologia[index];
            img.alt = "Hito histórico Cervera";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";
            img.style.marginBottom = "15px";
            img.style.display = "block";

            contenedorImg.appendChild(img);
            
            // Insertamos la imagen al principio de la tarjeta (arriba del año y los textos)
            tarjeta.insertBefore(contenedorImg, tarjeta.firstChild);
        }
    });

    // 3. MOTOR DE ANIMACIÓN INTERSECTION OBSERVER (SCROLL FLUIDO)
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