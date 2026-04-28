const preguntas = [
  // EJE: HORIZONTE TEMPORAL
  { q: "¿Por cuánto tiempo planeas mantener tu inversión?", a: [{t: "Menos de 6 meses", p: 1}, {t: "6 meses a 2 años", p: 2}, {t: "Más de 2 años", p: 3}] },
  { q: "¿Cuándo estimas que necesitarás retirar el capital?", a: [{t: "En cualquier momento (Liquidez inmediata)", p: 1}, {t: "En plazos programados", p: 2}, {t: "No lo necesito en el corto/mediano plazo", p: 3}] },
  
  // EJE: CONOCIMIENTO Y EXPERIENCIA
  { q: "¿Cuál es tu nivel de conocimiento en el mercado de capitales?", a: [{t: "Nulo o básico (Plazo fijo/FCI)", p: 1}, {t: "Intermedio (Bonos/CEDEARs)", p: 2}, {t: "Avanzado (Derivados/Arbitraje)", p: 3}] },
  { q: "¿Con qué frecuencia operás en el mercado?", a: [{t: "Nunca o casi nunca", p: 1}, {t: "Mensualmente", p: 2}, {t: "Semanalmente o diario", p: 3}] },
  
  // EJE: TOLERANCIA AL RIESGO (PSICOLOGÍA)
  { q: "Si tu cartera cae un 15% por volatilidad del mercado, ¿qué hacés?", a: [{t: "Vendo todo para no perder más", p: 1}, {t: "Espero a que recupere", p: 2}, {t: "Compro más para promediar a la baja", p: 3}] },
  { q: "¿Qué frase define mejor tu relación con el riesgo?", a: [{t: "Prefiero seguridad aunque gane menos que la inflación", p: 1}, {t: "Busco un equilibrio entre riesgo y retorno", p: 2}, {t: "Estoy dispuesto a perder capital por ganancias altas", p: 3}] },
  { q: "Respecto a la inflación (IPC), ¿cuál es tu objetivo?", a: [{t: "No quedar muy atrás", p: 1}, {t: "Empatarle o ganarle por poco", p: 2}, {t: "Maximizar el rendimiento real", p: 3}] },
  
  // EJE: CAPACIDAD FINANCIERA
  { q: "¿Qué porcentaje de tus ahorros totales estás invirtiendo hoy?", a: [{t: "Más del 70%", p: 1}, {t: "Entre el 30% y 70%", p: 2}, {t: "Menos del 30%", p: 3}] },
  { q: "¿Cuál es tu fuente de ingresos principal?", a: [{t: "Ingreso único y estable", p: 1}, {t: "Ingreso variable", p: 2}, {t: "Múltiples fuentes de ingresos", p: 3}] },
  
  // EJE: PREFERENCIA DE ACTIVOS
  { q: "¿En qué moneda preferís que se valúen tus activos?", a: [{t: "Pesos (Tasa fija)", p: 1}, {t: "Ajustados por CER/UVA", p: 2}, {t: "Dólar Hard/Cable", p: 3}] },
  { q: "¿Te sentís cómodo operando activos con baja liquidez?", a: [{t: "No, necesito salir rápido siempre", p: 1}, {t: "Solo en una parte de la cartera", p: 2}, {t: "Sí, priorizo el rendimiento final", p: 3}] },
  { q: "¿Qué pensás de los instrumentos de renta variable (Acciones)?", a: [{t: "Son muy peligrosos", p: 1}, {t: "Son necesarios para diversificar", p: 2}, {t: "Son la base de mi crecimiento", p: 3}] },
  { q: "Si ganaras un premio, ¿dónde lo pondrías?", a: [{t: "FCI Money Market / Cauciones", p: 1}, {t: "Obligaciones Negociables", p: 2}, {t: "Acciones o Criptoactivos", p: 3}] },
  { q: "¿Cómo reaccionás ante noticias de inestabilidad política/económica?", a: [{t: "Busco refugio inmediato", p: 1}, {t: "Rebalanceo mi cartera", p: 2}, {t: "Busco oportunidades de compra", p: 3}] },
  { q: "¿Tenés deudas o compromisos financieros prontos a vencer?", a: [{t: "Sí, importantes", p: 1}, {t: "Algunas menores", p: 2}, {t: "No, ninguna", p: 3}] }
];

let indiceActual = 0;
let puntajeTotal = 0;

function mostrarPregunta() {
  const item = preguntas[indiceActual];
  document.getElementById("pregunta-texto").innerText = item.q;
  const container = document.getElementById("opciones-container");
  container.innerHTML = "";
  
  item.a.forEach(opcion => {
    const btn = document.createElement("button");
    btn.innerText = opcion.t;
    btn.className = "btn-opcion"; // Para que le des estilos en CSS
    btn.onclick = () => procesarRespuesta(opcion.p);
    container.appendChild(btn);
  });
  
  document.getElementById("contador").innerText = `Pregunta ${indiceActual + 1} de ${preguntas.length}`;
  // Actualizar barra de progreso si la tenés
  const progreso = ((indiceActual + 1) / preguntas.length) * 100;
  if(document.getElementById("progress-fill")) {
      document.getElementById("progress-fill").style.width = progreso + "%";
  }
}

function procesarRespuesta(puntos) {
  puntajeTotal += puntos;
  indiceActual++;
  
  if (indiceActual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
}

function mostrarResultado() {
  const promedio = puntajeTotal / preguntas.length;
  let perfil = "";
  let desc = "";

  if (promedio < 1.6) {
    perfil = "Conservador";
    desc = "Tu prioridad es proteger el capital. Te sugerimos instrumentos de baja volatilidad como FCI Money Market, Cauciones y Letras del Tesoro de corto plazo.";
  } else if (promedio < 2.5) {
    perfil = "Moderado";
    desc = "Buscás un equilibrio entre crecimiento y riesgo. Tu cartera ideal combina Renta Fija (ONs, Bonos CER) con una participación controlada en Renta Variable (CEDEARs de índices).";
  } else {
    perfil = "Agresivo";
    desc = "Tu horizonte es de largo plazo y tolerás la volatilidad. Podés optar por una mayor exposición a Acciones del Merval, CEDEARs tecnológicos y estrategias con derivados.";
  }

  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("resultado-box").style.display = "block";
  document.getElementById("perfil-nombre").innerText = perfil;
  document.getElementById("perfil-desc").innerText = desc;
}

// Iniciar al cargar
window.onload = mostrarPregunta;
