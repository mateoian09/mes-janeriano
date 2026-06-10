document.addEventListener("DOMContentLoaded", () => {
    const opciones = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const animarEntrada = (entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("active");
                observador.unobserve(entrada.target);
            }
        });
    };

    const observador = new IntersectionObserver(animarEntrada, opciones);

    // Activamos la observación en los elementos .reveal del index
    const elementosOcultos = document.querySelectorAll(".reveal");
    elementosOcultos.forEach(elemento => observador.observe(elemento));
});