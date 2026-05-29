// script.js

// =============================================
// NAV TOGGLE
// =============================================
const menuToggleBtn = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

menuToggleBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggleBtn.querySelector("i").classList.toggle("fa-bars");
  menuToggleBtn.querySelector("i").classList.toggle("fa-xmark");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900 && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    menuToggleBtn.querySelector("i").classList.add("fa-bars");
    menuToggleBtn.querySelector("i").classList.remove("fa-xmark");
  }
});

// =============================================
// MÚSICA DE FONDO
// =============================================
const MUSIC_KEY = "mesJanerianoMusica";
const bgMusic = document.getElementById("bgMusic");
const musicToggleBtn = document.getElementById("musicToggle");
let musicEnabled = localStorage.getItem(MUSIC_KEY) === "on";

if (bgMusic) {
  bgMusic.volume = 0.18;
}

function setMusicIcon(playing) {
  if (!musicToggleBtn) return;
  const icon = musicToggleBtn.querySelector("i");
  if (playing) {
    icon.className = "fa-solid fa-volume-high";
    musicToggleBtn.classList.add("music-on");
  } else {
    icon.className = "fa-solid fa-volume-xmark";
    musicToggleBtn.classList.remove("music-on");
  }
}

function tryPlayMusic() {
  if (!bgMusic || !musicEnabled) return;
  bgMusic.play().catch(() => {
    // Autoplay bloqueado — esperar interacción
  });
  setMusicIcon(true);
}

function stopMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
  setMusicIcon(false);
}

if (musicToggleBtn) {
  musicToggleBtn.addEventListener("click", () => {
    musicEnabled = !musicEnabled;
    localStorage.setItem(MUSIC_KEY, musicEnabled ? "on" : "off");
    if (musicEnabled) {
      tryPlayMusic();
    } else {
      stopMusic();
    }
  });
}

// Iniciar música al primer toque/click del usuario si está activada
function onFirstInteraction() {
  if (musicEnabled) tryPlayMusic();
  document.removeEventListener("click", onFirstInteraction);
  document.removeEventListener("keydown", onFirstInteraction);
  document.removeEventListener("touchstart", onFirstInteraction);
}
document.addEventListener("click", onFirstInteraction);
document.addEventListener("keydown", onFirstInteraction);
document.addEventListener("touchstart", onFirstInteraction);

// Aplicar estado guardado al icono desde el inicio
setMusicIcon(musicEnabled);

// =============================================
// ARRAY DE 30 PREGUNTAS JANERIANAS
// =============================================
const preguntas = [
  { dia: 1,  pregunta: "¿En qué país nació Ana María Janer?",                              opciones: ["españa", "italia", "francia"],                                         correcta: "españa" },
  { dia: 2,  pregunta: "¿Cuál era uno de los valores principales de Ana María Janer?",    opciones: ["solidaridad", "orgullo", "ambición"],                                  correcta: "solidaridad" },
  { dia: 3,  pregunta: "¿A qué dedicó su vida Ana María Janer?",                          opciones: ["la educación y ayuda a los demás", "la política", "el comercio"],      correcta: "la educación y ayuda a los demás" },
  { dia: 4,  pregunta: "¿Qué buscaba transmitir Ana María Janer?",                        opciones: ["amor y servicio", "competencia", "fama"],                              correcta: "amor y servicio" },
  { dia: 5,  pregunta: "¿Qué congregación fundó Ana María Janer?",                        opciones: ["hermanas de la sagrada familia de urgell", "salesianos", "jesuitas"],  correcta: "hermanas de la sagrada familia de urgell" },
  { dia: 6,  pregunta: "¿Qué valor caracterizaba a Ana María Janer?",                     opciones: ["empatía", "egoísmo", "indiferencia"],                                  correcta: "empatía" },
  { dia: 7,  pregunta: "¿A quiénes ayudaba principalmente Ana María Janer?",              opciones: ["a los necesitados", "a los soldados", "a los empresarios"],             correcta: "a los necesitados" },
  { dia: 8,  pregunta: "¿Qué promovía Ana María Janer mediante la educación?",            opciones: ["valores y formación", "competencia extrema", "desigualdad"],            correcta: "valores y formación" },
  { dia: 9,  pregunta: "¿Qué actitud tenía Ana María Janer frente a las dificultades?",  opciones: ["perseverancia", "abandono", "indiferencia"],                            correcta: "perseverancia" },
  { dia: 10, pregunta: "¿Qué representa el espíritu janeriano?",                          opciones: ["servicio y comunidad", "orgullo individual", "competencia negativa"],   correcta: "servicio y comunidad" },
  { dia: 11, pregunta: "¿Qué valor enseñaba Ana María Janer a los jóvenes?",              opciones: ["respeto", "violencia", "egoísmo"],                                     correcta: "respeto" },
  { dia: 12, pregunta: "¿Cuál era una característica de Ana María Janer?",                opciones: ["humildad", "soberbia", "vanidad"],                                     correcta: "humildad" },
  { dia: 13, pregunta: "¿Qué buscaba lograr Ana María Janer mediante sus obras?",         opciones: ["ayudar y educar", "ganar dinero", "conseguir fama"],                    correcta: "ayudar y educar" },
  { dia: 14, pregunta: "¿Qué importancia tenía la fe para Ana María Janer?",              opciones: ["era fundamental en su vida", "no era importante", "la ignoraba"],       correcta: "era fundamental en su vida" },
  { dia: 15, pregunta: "¿Qué valor fortalece la convivencia según el espíritu janeriano?",opciones: ["respeto", "violencia", "desinterés"],                                   correcta: "respeto" },
  { dia: 16, pregunta: "¿Qué promovía Ana María Janer en la comunidad?",                  opciones: ["la unión", "la división", "la rivalidad"],                              correcta: "la unión" },
  { dia: 17, pregunta: "¿Cómo enfrentaba Ana María Janer los desafíos?",                  opciones: ["con perseverancia", "rindiéndose", "ignorándolos"],                     correcta: "con perseverancia" },
  { dia: 18, pregunta: "¿Qué misión tenía Ana María Janer?",                              opciones: ["educar y servir", "competir", "dirigir empresas"],                      correcta: "educar y servir" },
  { dia: 19, pregunta: "¿Qué demostraba Ana María Janer hacia los demás?",                opciones: ["compasión", "indiferencia", "superioridad"],                            correcta: "compasión" },
  { dia: 20, pregunta: "¿Qué importancia tiene ayudar al prójimo?",                       opciones: ["es un acto de solidaridad", "no tiene valor", "genera problemas"],      correcta: "es un acto de solidaridad" },
  { dia: 21, pregunta: "¿Qué buscaba enseñar Ana María Janer además de conocimientos?",   opciones: ["valores humanos", "competencia agresiva", "individualismo"],            correcta: "valores humanos" },
  { dia: 22, pregunta: "¿Qué actitud representa mejor el espíritu janeriano?",            opciones: ["compañerismo", "egoísmo", "violencia"],                                correcta: "compañerismo" },
  { dia: 23, pregunta: "¿Qué significa servir a los demás?",                              opciones: ["ayudar con generosidad", "buscar beneficio propio", "ignorar necesidades"], correcta: "ayudar con generosidad" },
  { dia: 24, pregunta: "¿Qué valor promovía Ana María Janer en la educación?",            opciones: ["inclusión", "exclusión", "discriminación"],                             correcta: "inclusión" },
  { dia: 25, pregunta: "¿Qué representa la solidaridad?",                                 opciones: ["ayudar a otros", "competir negativamente", "pensar solo en uno mismo"], correcta: "ayudar a otros" },
  { dia: 26, pregunta: "¿Qué actitud tenía Ana María Janer hacia los niños y jóvenes?",  opciones: ["cariño y dedicación", "desinterés", "distancia"],                       correcta: "cariño y dedicación" },
  { dia: 27, pregunta: "¿Qué buscaba construir Ana María Janer en la sociedad?",          opciones: ["una comunidad unida", "división", "desigualdad"],                       correcta: "una comunidad unida" },
  { dia: 28, pregunta: "¿Qué valor ayuda a convivir mejor?",                              opciones: ["empatía", "violencia", "orgullo"],                                     correcta: "empatía" },
  { dia: 29, pregunta: "¿Qué representa el Mes Janeriano?",                               opciones: ["unión, valores y participación", "competencia negativa", "desorden"],    correcta: "unión, valores y participación" },
  { dia: 30, pregunta: "¿Qué enseñó Ana María Janer con su ejemplo?",                     opciones: ["servicio y amor al prójimo", "individualismo", "indiferencia"],         correcta: "servicio y amor al prójimo" }
];

// =============================================
// SISTEMA DE PUNTOS (inicio en 0, +1 por respuesta correcta)
// =============================================
const POINTS_KEY      = "mesJanerianoPuntos_v2";
const PARTICIPACION_KEY = "mesJanerianoParticipacion_v2";
const PARTICIPANTES_KEY = "mesJanerianoParticipantes_v2";
const USUARIOS_KEY    = "mesJanerianoUsuarios_v3";  // bloqueo por usuario permanente

function getPoints() {
  let pts = JSON.parse(localStorage.getItem(POINTS_KEY));
  if (!pts) {
    pts = { cervera: 0, talar: 0, valdora: 0 };
    localStorage.setItem(POINTS_KEY, JSON.stringify(pts));
  }
  return pts;
}

function savePoints(pts) {
  localStorage.setItem(POINTS_KEY, JSON.stringify(pts));
}

function addPoints(team, increment = 1) {
  const pts = getPoints();
  if (pts[team] !== undefined) {
    pts[team] += increment;
    savePoints(pts);
    updateUI(pts);
  }
}

function updateUI(pts) {
  const max = Math.max(pts.cervera, pts.talar, pts.valdora) || 1;
  const teams = { cervera: pts.cervera, talar: pts.talar, valdora: pts.valdora };

  Object.entries(teams).forEach(([team, val]) => {
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
  const mes = fecha.getMonth(); // 0=enero … 5=junio
  const dia = fecha.getDate();
  if (mes === 5) return dia;   // junio → día real (1-30)
  return 0;                    // cualquier otro mes → Día 0
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
  const fecha = new Date();
  const dia = fecha.getDate();
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
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="respuesta" value="${opcion}" required /> ${opcion}`;
      fieldset.appendChild(label);
    });
  }
}

// =============================================
// GLOW DE EQUIPO EN RESPUESTAS
// =============================================
const equipoTeamColors = {
  cervera: { color: "var(--blue-intense)", glow: "var(--accent-glow-blue)" },
  talar:   { color: "var(--red-intense)",  glow: "var(--accent-glow-red)"  },
  valdora: { color: "var(--green-intense)", glow: "var(--accent-glow-green)" }
};

const equipoSelect = document.getElementById("equipo");
if (equipoSelect) {
  equipoSelect.addEventListener("change", () => {
    const chosen = equipoSelect.value;
    const form = document.getElementById("desafioForm");
    if (!form) return;
    if (equipoTeamColors[chosen]) {
      form.style.setProperty("--team-color", equipoTeamColors[chosen].color);
      form.style.setProperty("--team-glow",  equipoTeamColors[chosen].glow);
    } else {
      form.style.removeProperty("--team-color");
      form.style.removeProperty("--team-glow");
    }
  });
}

// =============================================
// AVISO MINÚSCULAS
// =============================================
(function injectHintMinusculas() {
  const form = document.getElementById("desafioForm");
  if (!form) return;
  const hint = document.createElement("p");
  hint.className = "hint-minusculas";
  hint.textContent = "Todos los datos deben escribirse en minúsculas.";
  // Insert before the submit button
  const submitBtn = form.querySelector("button[type='submit']");
  if (submitBtn) {
    form.insertBefore(hint, submitBtn);
  } else {
    form.appendChild(hint);
  }
})();

// =============================================
// BLOQUEO POR USUARIO (nombre + curso + división)
// =============================================
function getUserKey(nombre, curso, division) {
  return (nombre + "|" + curso + "|" + division).toLowerCase().trim();
}

function usuarioYaJugo(nombre, curso, division) {
  const lista = JSON.parse(localStorage.getItem(USUARIOS_KEY) || "[]");
  const key = getUserKey(nombre, curso, division);
  return lista.includes(key);
}

function registrarUsuario(nombre, curso, division) {
  const lista = JSON.parse(localStorage.getItem(USUARIOS_KEY) || "[]");
  const key = getUserKey(nombre, curso, division);
  if (!lista.includes(key)) {
    lista.push(key);
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(lista));
  }
}

// =============================================
// PARTICIPACIÓN DIARIA (bloqueo por fecha)
// =============================================
function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getParticipacionHoy() {
  const data = JSON.parse(localStorage.getItem(PARTICIPACION_KEY) || "{}");
  return data[getTodayKey()] || null;
}

function setParticipacionHoy(nombre, curso, division, equipo) {
  const data = JSON.parse(localStorage.getItem(PARTICIPACION_KEY) || "{}");
  data[getTodayKey()] = { nombre, curso, division, equipo };
  localStorage.setItem(PARTICIPACION_KEY, JSON.stringify(data));
}

// =============================================
// ÚLTIMOS PARTICIPANTES
// =============================================
function getParticipantes() {
  return JSON.parse(localStorage.getItem(PARTICIPANTES_KEY) || "[]");
}

function addParticipante(nombre, curso, division, equipo) {
  const lista = getParticipantes();
  lista.unshift({ nombre, curso, division, equipo, fecha: getTodayKey() });
  localStorage.setItem(PARTICIPANTES_KEY, JSON.stringify(lista.slice(0, 10)));
  renderParticipantes();
}

function renderParticipantes() {
  const container = document.getElementById("participantes-lista");
  if (!container) return;

  const lista = getParticipantes();
  if (lista.length === 0) {
    container.innerHTML = "<p class='no-participantes'>Aún no hay participantes registrados.</p>";
    return;
  }

  const colores  = { cervera: "#4f9ef8", talar: "#f85c5c", valdora: "#4caf7d" };
  const iconos   = { cervera: "fa-shield-halved", talar: "fa-fire", valdora: "fa-leaf" };
  const nombres  = { cervera: "Cervera", talar: "Talar", valdora: "Valdora" };

  container.innerHTML = lista.map(p => {
    const color = colores[p.equipo] || "#aaa";
    const icono = iconos[p.equipo] || "fa-star";
    const eq    = nombres[p.equipo] || p.equipo;
    return `
      <div class="participante-item" style="border-left:3px solid ${color}">
        <div class="participante-info">
          <span class="participante-nombre">${p.nombre}</span>
          <span class="participante-meta">${p.curso} · Div. ${p.division.toUpperCase()}</span>
        </div>
        <span class="participante-equipo" style="color:${color}">
          <i class="fa-solid ${icono}"></i> ${eq}
        </span>
      </div>`;
  }).join("");
}

// =============================================
// FEEDBACK VISUAL
// =============================================
const feedback = document.getElementById("desafioFeedback");

function showFeedback(type, msg) {
  if (!feedback) return;
  feedback.textContent = msg;
  feedback.className = "desafio-feedback " + type;
  setTimeout(() => { feedback.className = "desafio-feedback"; }, 5000);
}

// =============================================
// VALIDACIÓN EN MINÚSCULAS
// =============================================
function esTodoMinusculas(str) {
  return str === str.toLowerCase();
}

function validateForm(formData) {
  const nombre   = formData.get("nombre").trim();
  const curso    = formData.get("curso").trim();
  const division = formData.get("division").trim();
  const equipo   = formData.get("equipo");
  const respuesta = formData.get("respuesta");

  // Campos vacíos o sin equipo/respuesta
  if (!nombre || !curso || !division || !equipo || !respuesta) return { ok: false, msg: "Completá todos los campos." };

  // División sólo una letra
  if (!/^[a-z]{1}$/.test(division)) return { ok: false, msg: "La división debe ser una sola letra en minúscula." };

  // Validación de minúsculas
  if (!esTodoMinusculas(nombre))   return { ok: false, msg: "Escribí todo en minúscula." };
  if (!esTodoMinusculas(curso))    return { ok: false, msg: "Escribí todo en minúscula." };
  if (!esTodoMinusculas(division)) return { ok: false, msg: "Escribí todo en minúscula." };

  return { ok: true };
}

// =============================================
// SUBMIT DEL FORMULARIO
// =============================================
const desafioForm = document.getElementById("desafioForm");

desafioForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Bloqueo por fecha (ya participó HOY)
  if (getParticipacionHoy()) {
    showFeedback("info", "Ya participaste hoy. ¡Volvé mañana!");
    return;
  }

  const formData = new FormData(desafioForm);
  const nombre    = formData.get("nombre").trim();
  const curso     = formData.get("curso").trim();
  const division  = formData.get("division").trim();
  const equipo    = formData.get("equipo");
  const respuesta = formData.get("respuesta");

  // Validación de formulario (incluye minúsculas)
  const val = validateForm(formData);
  if (!val.ok) {
    showFeedback("error", val.msg);
    return;
  }

  // Bloqueo por usuario (nombre+curso+división ya registrados alguna vez)
  if (usuarioYaJugo(nombre, curso, division)) {
    showFeedback("info", "Este usuario ya participó.");
    return;
  }

  // Todo OK → registrar
  const preguntaHoy = getPreguntaHoy();
  setParticipacionHoy(nombre, curso, division, equipo);
  registrarUsuario(nombre, curso, division);
  addParticipante(nombre, curso, division, equipo);

  if (respuesta === preguntaHoy.correcta) {
    showFeedback("success", "¡Respuesta correcta! Sumaste +1 punto para tu equipo.");
    addPoints(equipo, 1);
    desafioForm.reset();
  } else {
    showFeedback("error", "Respuesta incorrecta. ¡Intentá mañana!");
    desafioForm.reset();
  }
});

// =============================================
// INIT
// =============================================
document.addEventListener("DOMContentLoaded", () => {
  updateUI(getPoints());
  renderDiaJaneriano();
  renderPregunta();
  renderParticipantes();

  // Si ya participó hoy → deshabilitar form
  if (getParticipacionHoy()) {
    showFeedback("info", "Ya participaste hoy. ¡Volvé mañana!");
    desafioForm.querySelectorAll("input, select, button").forEach(el => el.disabled = true);
  }
});