document.addEventListener("DOMContentLoaded", () => {
    // Configuramos el detector para activar las animaciones al hacer scroll
    const opciones = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Se activa al visualizar el 15% de la tarjeta
    };

    const registrarEntrada = (entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("active");
                observador.unobserve(entrada.target); // Detiene la observación una vez animado
            }
        });
    };

    const observador = new IntersectionObserver(registrarEntrada, opciones);

    // Activamos la vigilancia sobre todos los elementos con la clase 'reveal'
    const elementosOcultos = document.querySelectorAll(".reveal");
    elementosOcultos.forEach(elemento => observador.observe(elemento));
});

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. BANCO DE IMÁGENES HISTÓRICAS PARA CADA HITO DE TALARN (Son 5 tarjetas)
    // Podés reemplazar estos links por tus imágenes locales si lo preferís (ej: "./img/talarn1.jpg")
    const imagenesCronologia = [
        "https://images.mnstatic.com/42/f4/42f436612a2a3de208225ed536b674cd.jpg?width=1536", // 1880: Capítulo General
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Talarn._L%27esgl%C3%A9sia_7.JPG/500px-Talarn._L%27esgl%C3%A9sia_7.JPG", // 1883: Humildad y servicio
        "https://www.pateandoespaña.es/archivo7/espana/Todas%20fotos/Talarn.jpg", // 1883-1884: Formadora de almas
        "https://a1.elespanol.com/cronicaglobal/2015/01/18/business/business_4260180_1601945_1706x960.jpg", // Enero 1885: El último deseo
        "https://scontent.faep29-2.fna.fbcdn.net/v/t39.30808-6/615197295_898235899526041_7911781343335937481_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=TzwnTLUNOTAQ7kNvwEiEatz&_nc_oc=Adr_OoBjI7rj32r4UWQq2f8mm9WgvNSFE4DpI7e7FSsw5E_CxQOHYNo-DT5GtXV3A3o&_nc_zt=23&_nc_ht=scontent.faep29-2.fna&_nc_gid=lxDVk-TuR8eZljo6FUP6kw&_nc_ss=7b289&oh=00_Af8jIxVz-kSoXVcBfg3CiQJQiG-rYAqofI5QW76NjTNHLg&oe=6A260C52"  // 11 Enero 1885: Tránsito a la eternidad
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
            img.alt = "Hito histórico Talarn";
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";
            img.style.marginBottom = "15px";
            img.style.display = "block";

            contenedorImg.appendChild(img);
            
            // Colocamos el bloque de imagen arriba de todo dentro de la tarjeta
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