// script.js

// =============================================
// NAV TOGGLE
// =============================================
const menuToggleBtn = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = menuToggleBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = menuToggleBtn.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    const icon = menuToggleBtn.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  }
});

// =============================================
// MÚSICA DE FONDO — instrumental suave, volumen muy bajo
// =============================================
const bgMusic = document.getElementById("bgMusic");

if (bgMusic) {
  bgMusic.volume = 0.07; // 7% — muy suave, no invasivo
}

function tryPlayMusic() {
  if (!bgMusic) return;
  bgMusic.play().catch(() => {
    // Autoplay bloqueado por el navegador — se inicia al primer toque
  });
}

tryPlayMusic();

function onFirstInteraction() {
  tryPlayMusic();
  document.removeEventListener("click", onFirstInteraction);
  document.removeEventListener("keydown", onFirstInteraction);
  document.removeEventListener("touchstart", onFirstInteraction);
}
document.addEventListener("click", onFirstInteraction);
document.addEventListener("keydown", onFirstInteraction);
document.addEventListener("touchstart", onFirstInteraction, { passive: true });

// =============================================
// ARRAY DE 30 PREGUNTAS JANERIANAS
// =============================================
const preguntas = [
  { dia: 1,  pregunta: "¿En qué país nació Ana María Janer?",                              opciones: ["España", "Italia", "Francia"],                                            correcta: "España" },
  { dia: 2,  pregunta: "¿Cuál era uno de los valores principales de Ana María Janer?",    opciones: ["Solidaridad", "Orgullo", "Ambición"],                                     correcta: "Solidaridad" },
  { dia: 3,  pregunta: "¿A qué dedicó su vida Ana María Janer?",                          opciones: ["La educación y ayuda a los demás", "La política", "El comercio"],         correcta: "La educación y ayuda a los demás" },
  { dia: 4,  pregunta: "¿Qué buscaba transmitir Ana María Janer?",                        opciones: ["Amor y servicio", "Competencia", "Fama"],                                 correcta: "Amor y servicio" },
  { dia: 5,  pregunta: "¿Qué congregación fundó Ana María Janer?",                        opciones: ["Hermanas de la Sagrada Familia de Urgell", "Salesianos", "Jesuitas"],     correcta: "Hermanas de la Sagrada Familia de Urgell" },
  { dia: 6,  pregunta: "¿Qué valor caracterizaba a Ana María Janer?",                     opciones: ["Empatía", "Egoísmo", "Indiferencia"],                                     correcta: "Empatía" },
  { dia: 7,  pregunta: "¿A quiénes ayudaba principalmente Ana María Janer?",              opciones: ["A los necesitados", "A los soldados", "A los empresarios"],               correcta: "A los necesitados" },
  { dia: 8,  pregunta: "¿Qué promovía Ana María Janer mediante la educación?",            opciones: ["Valores y formación", "Competencia extrema", "Desigualdad"],              correcta: "Valores y formación" },
  { dia: 9,  pregunta: "¿Qué actitud tenía Ana María Janer frente a las dificultades?",  opciones: ["Perseverancia", "Abandono", "Indiferencia"],                              correcta: "Perseverancia" },
  { dia: 10, pregunta: "¿Qué representa el espíritu janeriano?",                          opciones: ["Servicio y comunidad", "Orgullo individual", "Competencia negativa"],     correcta: "Servicio y comunidad" },
  { dia: 11, pregunta: "¿Qué valor enseñaba Ana María Janer a los jóvenes?",              opciones: ["Respeto", "Violencia", "Egoísmo"],                                        correcta: "Respeto" },
  { dia: 12, pregunta: "¿Cuál era una característica de Ana María Janer?",                opciones: ["Humildad", "Soberbia", "Vanidad"],                                        correcta: "Humildad" },
  { dia: 13, pregunta: "¿Qué buscaba lograr Ana María Janer mediante sus obras?",         opciones: ["Ayudar y educar", "Ganar dinero", "Conseguir fama"],                      correcta: "Ayudar y educar" },
  { dia: 14, pregunta: "¿Qué importancia tenía la fe para Ana María Janer?",              opciones: ["Era fundamental en su vida", "No era importante", "La ignoraba"],         correcta: "Era fundamental en su vida" },
  { dia: 15, pregunta: "¿Qué valor fortalece la convivencia según el espíritu janeriano?",opciones: ["Respeto", "Violencia", "Desinterés"],                                     correcta: "Respeto" },
  { dia: 16, pregunta: "¿Qué promovía Ana María Janer en la comunidad?",                  opciones: ["La unión", "La división", "La rivalidad"],                               correcta: "La unión" },
  { dia: 17, pregunta: "¿Cómo enfrentaba Ana María Janer los desafíos?",                  opciones: ["Con perseverancia", "Rindiéndose", "Ignorándolos"],                       correcta: "Con perseverancia" },
  { dia: 18, pregunta: "¿Qué misión tenía Ana María Janer?",                              opciones: ["Educar y servir", "Competir", "Dirigir empresas"],                        correcta: "Educar y servir" },
  { dia: 19, pregunta: "¿Qué demostraba Ana María Janer hacia los demás?",                opciones: ["Compasión", "Indiferencia", "Superioridad"],                              correcta: "Compasión" },
  { dia: 20, pregunta: "¿Qué importancia tiene ayudar al prójimo?",                       opciones: ["Es un acto de solidaridad", "No tiene valor", "Genera problemas"],        correcta: "Es un acto de solidaridad" },
  { dia: 21, pregunta: "¿Qué buscaba enseñar Ana María Janer además de conocimientos?",   opciones: ["Valores humanos", "Competencia agresiva", "Individualismo"],              correcta: "Valores humanos" },
  { dia: 22, pregunta: "¿Qué actitud representa mejor el espíritu janeriano?",            opciones: ["Compañerismo", "Egoísmo", "Violencia"],                                  correcta: "Compañerismo" },
  { dia: 23, pregunta: "¿Qué significa servir a los demás?",                              opciones: ["Ayudar con generosidad", "Buscar beneficio propio", "Ignorar necesidades"], correcta: "Ayudar con generosidad" },
  { dia: 24, pregunta: "¿Qué valor promovía Ana María Janer en la educación?",            opciones: ["Inclusión", "Exclusión", "Discriminación"],                               correcta: "Inclusión" },
  { dia: 25, pregunta: "¿Qué representa la solidaridad?",                                 opciones: ["Ayudar a otros", "Competir negativamente", "Pensar solo en uno mismo"],   correcta: "Ayudar a otros" },
  { dia: 26, pregunta: "¿Qué actitud tenía Ana María Janer hacia los niños y jóvenes?",  opciones: ["Cariño y dedicación", "Desinterés", "Distancia"],                         correcta: "Cariño y dedicación" },
  { dia: 27, pregunta: "¿Qué buscaba construir Ana María Janer en la sociedad?",          opciones: ["Una comunidad unida", "División", "Desigualdad"],                         correcta: "Una comunidad unida" },
  { dia: 28, pregunta: "¿Qué valor ayuda a convivir mejor?",                              opciones: ["Empatía", "Violencia", "Orgullo"],                                        correcta: "Empatía" },
  { dia: 29, pregunta: "¿Qué representa el Mes Janeriano?",                               opciones: ["Unión, valores y participación", "Competencia negativa", "Desorden"],     correcta: "Unión, valores y participación" },
  { dia: 30, pregunta: "¿Qué enseñó Ana María Janer con su ejemplo?",                     opciones: ["Servicio y amor al prójimo", "Individualismo", "Indiferencia"],           correcta: "Servicio y amor al prójimo" }
];

// =============================================
// ASIGNACIÓN AUTOMÁTICA DE EQUIPO POR DIVISIÓN
// =============================================
const divisionEquipoMap = {
  "A": { equipo: "cervera", nombre: "Cervera",   color: "var(--blue-intense)",  glow: "var(--accent-glow-blue)"  },
  "B": { equipo: "talar",   nombre: "Talarn",    color: "var(--red-intense)",   glow: "var(--accent-glow-red)"   },
  "C": { equipo: "valdora", nombre: "Vall d'Ora", color: "var(--green-intense)", glow: "var(--accent-glow-green)" }
};

const divisionSelect  = document.getElementById("division");
const equipoInput     = document.getElementById("equipo");
const equipoDisplay   = document.getElementById("equipo-display");
const desafioForm     = document.getElementById("desafioForm");

divisionSelect.addEventListener("change", () => {
  const div = divisionSelect.value.toUpperCase();
  const info = divisionEquipoMap[div];

  if (info) {
    equipoInput.value = info.equipo;

    equipoDisplay.textContent = "Equipo: " + info.nombre;
    equipoDisplay.style.color = info.color;
    equipoDisplay.style.borderColor = info.color;
    equipoDisplay.classList.add("visible");

    // Actualizar glow de radios
    if (desafioForm) {
      desafioForm.style.setProperty("--team-color", info.color);
      desafioForm.style.setProperty("--team-glow",  info.glow);
    }
  } else {
    equipoInput.value = "";
    equipoDisplay.textContent = "";
    equipoDisplay.classList.remove("visible");
    if (desafioForm) {
      desafioForm.style.removeProperty("--team-color");
      desafioForm.style.removeProperty("--team-glow");
    }
  }
});

// =============================================
// SISTEMA DE PUNTOS
// =============================================
const POINTS_KEY = "mesJanerianoPuntos_v2";

function getPoints() {
  let pts = JSON.parse(localStorage.getItem(POINTS_KEY));
  if (!pts) {
    pts = { cervera: 0, talar: 0, valdora: 0 };
    localStorage.setItem(POINTS_KEY, JSON.stringify(pts));
  }
  return pts;
}

function updateUI(pts) {
  const max = Math.max(pts.cervera, pts.talar, pts.valdora) || 1;
  Object.entries({ cervera: pts.cervera, talar: pts.talar, valdora: pts.valdora }).forEach(([team, val]) => {
    const card = document.querySelector(".puntos-card." + team);
    if (!card) return;
    card.querySelector(".points-number").textContent = val;
    card.querySelector(".points-bar").style.width = ((val / max) * 100).toFixed(2) + "%";
  });
}

// =============================================
// CONTADOR DE DÍAS JANERIANOS
// =============================================
function getDiaJaneriano() {
  const fecha = new Date();
  const mes = fecha.getMonth(); // 5 = junio
  const dia = fecha.getDate();
  if (mes === 5) return dia;
  return 0;
}

function renderDiaJaneriano() {
  const el = document.getElementById("desafio-dia-numero");
  if (!el) return;
  const d = getDiaJaneriano();
  el.textContent = d === 0 ? "Día 0" : "Día " + d;
}

// =============================================
// PREGUNTA AUTOMÁTICA POR DÍA DEL MES
// =============================================
function getPreguntaHoy() {
  const dia = new Date().getDate();
  const idx = Math.min(dia, 30) - 1;
  return preguntas[idx];
}

function renderPregunta() {
  const preguntaHoy = getPreguntaHoy();

  const preguntaEl = document.querySelector(".pregunta");
  if (preguntaEl) preguntaEl.textContent = preguntaHoy.pregunta;

  const fieldset = document.querySelector(".respuestas-group");
  if (fieldset) {
    fieldset.innerHTML = "<legend>Respuesta</legend>";
    preguntaHoy.opciones.forEach(opcion => {
      const id = "resp_" + opcion.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "respuesta";
      input.value = opcion;
      input.required = true;
      input.id = id;

      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = opcion;

      fieldset.appendChild(input);
      fieldset.appendChild(label);
    });
  }
}

// =============================================
// PARTICIPACIÓN DIARIA — UN ALUMNO UNA VEZ POR DÍA
// =============================================
const PARTICIPACION_KEY = "mesJanerianoParticipacion_v3";

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getAlumnoKey(nombre, curso, division) {
  return (nombre.trim() + "|" + curso.trim() + "|" + division.trim()).toLowerCase() + "|" + getTodayKey();
}

function alumnoYaParticipoHoy(nombre, curso, division) {
  const data = JSON.parse(localStorage.getItem(PARTICIPACION_KEY) || "{}");
  return !!data[getAlumnoKey(nombre, curso, division)];
}

function registrarParticipacionHoy(nombre, curso, division, equipo) {
  const data = JSON.parse(localStorage.getItem(PARTICIPACION_KEY) || "{}");
  data[getAlumnoKey(nombre, curso, division)] = { equipo, fecha: getTodayKey() };
  localStorage.setItem(PARTICIPACION_KEY, JSON.stringify(data));
}

// =============================================
// FEEDBACK VISUAL
// =============================================
const feedback = document.getElementById("desafioFeedback");

function showFeedback(type, msg) {
  if (!feedback) return;
  feedback.textContent = msg;
  feedback.className = "desafio-feedback " + type;
  setTimeout(() => { feedback.className = "desafio-feedback"; feedback.textContent = ""; }, 7000);
}

// =============================================
// VALIDACIÓN DE FORMULARIO
// =============================================
function validateForm(nombre, curso, division, equipo, respuesta) {
  if (!nombre)    return { ok: false, msg: "Ingresá tu nombre." };
  if (!curso)     return { ok: false, msg: "Seleccioná tu año." };
  if (!division)  return { ok: false, msg: "Seleccioná tu división." };
  if (!equipo)    return { ok: false, msg: "La división seleccionada no tiene equipo asignado." };
  if (!respuesta) return { ok: false, msg: "Seleccioná una respuesta." };
  return { ok: true };
}

// =============================================
// SUBMIT DEL FORMULARIO
// =============================================
desafioForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData  = new FormData(desafioForm);
  const nombre    = (formData.get("nombre")   || "").trim();
  const curso     = (formData.get("curso")    || "").trim();
  const division  = (formData.get("division") || "").trim();
  const equipo    = (formData.get("equipo")   || "").trim();
  const respuesta = formData.get("respuesta") || "";

  const val = validateForm(nombre, curso, division, equipo, respuesta);
  if (!val.ok) {
    showFeedback("error", val.msg);
    return;
  }

  if (alumnoYaParticipoHoy(nombre, curso, division)) {
    showFeedback("info", "Ya participaste hoy. ¡Volvé mañana!");
    return;
  }

  registrarParticipacionHoy(nombre, curso, division, equipo);

  const preguntaHoy = getPreguntaHoy();

  if (respuesta === preguntaHoy.correcta) {
    showFeedback("success", "¡Respuesta correcta! Gracias por participar en el desafío Janeriano de hoy.");
  } else {
    showFeedback("error", "Respuesta incorrecta. Volvé a intentarlo mañana.");
  }

  desafioForm.reset();
  equipoInput.value = "";
  equipoDisplay.textContent = "";
  equipoDisplay.classList.remove("visible");
  desafioForm.querySelectorAll("input, select, button").forEach(el => el.disabled = true);
});

// =============================================
// INIT
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  updateUI(getPoints());
  renderDiaJaneriano();
  renderPregunta();
});
