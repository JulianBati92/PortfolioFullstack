"use client";

import { FormEvent, useEffect, useState } from "react";

type Project = {
  name: string;
  description: string;
  image: string;
  live: string;
  repo: string;
  stack: string[];
  detail: string;
  highlights: string[];
};

const projects: Project[] = [
  {
    name: "VuelosBaratos",
    description: "Una plataforma para comparar alternativas de viaje sin perderse entre precios, escalas y proveedores. Centraliza la búsqueda y ayuda a elegir la opción más conveniente con información clara.",
    image: "/projects/vuelosbaratos.png",
    live: "https://vuelosbaratos-two.vercel.app",
    repo: "https://github.com/JulianBati92/Vuelosbaratos",
    stack: ["React", "Node.js", "Travelpayouts", "Vercel"],
    detail: "Construí el frontend en React y un backend Node.js conectado con Travelpayouts. El sistema trabaja con precios de referencia, ordena resultados mediante un puntaje de conveniencia y deriva a búsquedas actualizadas antes de reservar.",
    highlights: ["Comparación por precio y escalas", "Puntaje de conveniencia", "Integración con Travelpayouts"],
  },
  {
    name: "Tu Matteoli Online",
    description: "Una tienda online creada para convertir un catálogo artesanal en una experiencia de compra simple, visual y usable desde cualquier dispositivo.",
    image: "/projects/tumatteoli.png",
    live: "https://tumatteolionline.vercel.app",
    repo: "https://github.com/JulianBati92/tumatteolionline",
    stack: ["JavaScript", "Firebase", "Stripe", "E-commerce"],
    detail: "Desarrollé el catálogo, los filtros por categoría, el carrito y el proceso de compra. La solución guarda órdenes con Firebase y deja preparado el flujo de pagos con Stripe para acompañar la operación real del emprendimiento.",
    highlights: ["Catálogo y filtros", "Carrito persistente", "Órdenes con Firebase"],
  },
  {
    name: "¿Qué Cocino Hoy?",
    description: "Un producto pensado para resolver una pregunta cotidiana: qué cocinar con lo que ya hay en casa, respetando gustos, tiempos, dietas y formas de preparación.",
    image: "/projects/que-cocino-hoy.png",
    live: "https://quecocinohoy.vercel.app",
    repo: "https://github.com/JulianBati92/que-cocino-hoy",
    stack: ["Next.js", "TypeScript", "Gemini", "Firebase", "Mercado Pago"],
    detail: "Diseñé una experiencia mobile first que combina ingredientes, una foto opcional y preferencias libres. Gemini devuelve cinco propuestas estructuradas; Firebase gestiona el acceso y Mercado Pago permite continuar con una suscripción Premium.",
    highlights: ["Recetas personalizadas", "Acceso con Firebase", "Suscripciones con Mercado Pago"],
  },
  {
    name: "TechPaws",
    description: "Más que una landing: un sistema que presenta el servicio técnico, organiza las reparaciones y mantiene informado al cliente durante todo el proceso.",
    image: "/projects/techpaws.png",
    live: "https://tech-paws.vercel.app",
    repo: "https://github.com/JulianBati92/TechPaws",
    stack: ["Next.js", "TypeScript", "Neon Postgres", "Vercel"],
    detail: "Construí una identidad comercial completa y un panel privado para administrar órdenes, estados e historial. Cada cliente puede consultar su equipo con datos propios y el sistema prepara avisos claros para enviar por WhatsApp.",
    highlights: ["Panel privado de órdenes", "Seguimiento para clientes", "Datos en Neon Postgres"],
  },
];

const experience = [
  {
    period: "SEP 2024 — ACTUALIDAD",
    company: "Megatrans",
    role: "IT Support Analyst",
    summary: "Soporte técnico integral para usuarios, gerencia y equipos VIP. Resolución de incidentes de hardware, software y redes; administración de accesos; soporte remoto y presencial; onboarding, offboarding y mantenimiento de activos.",
    tags: ["Microsoft 365", "Active Directory", "Redes", "Soporte VIP"],
  },
  {
    period: "OCT 2023 — OCT 2024",
    company: "Tech Mahindra · Google",
    role: "Application Support & QA Analyst",
    summary: "Testing y control de calidad para complementos de Google Workspace Marketplace. Detección y seguimiento de bugs, automatización con Apps Script, análisis de datos y soporte técnico a desarrolladores.",
    tags: ["QA", "Google Workspace", "Apps Script", "Looker Studio"],
  },
  {
    period: "ABR 2023 — OCT 2023",
    company: "Pixel IT · Cervecería Quilmes",
    role: "Field Support Analyst",
    summary: "Soporte de campo y remoto, seguimiento de tickets y SLA, preparación de equipos, instalación de software corporativo, inventario, onboarding y asistencia a salas Cisco y Zoom.",
    tags: ["ServiceNow", "SLA", "Hardware", "Soporte onsite"],
  },
  {
    period: "ENE 2023 — MAR 2023",
    company: "Cognizant · Google Ads",
    role: "Support Agent",
    summary: "Soporte LATAM para Google Ads, Analytics, Tag Manager y Merchant Center. Configuración de campañas, conversiones, audiencias, pagos y resolución de incidencias de políticas.",
    tags: ["Google Ads", "Analytics", "Tag Manager", "Soporte LATAM"],
  },
];

const education = [
  { title: "Full Stack Developer", place: "Coderhouse", period: "AGO 2022 — ABR 2023", text: "Formación en desarrollo web, JavaScript, React y backend, aplicada luego a productos completos y desplegados." },
  { title: "Instalador y soporte de sistemas informáticos", place: "CFP 404", period: "ABR 2020 — ABR 2021", text: "Capacitación técnica en instalación, diagnóstico, mantenimiento y soporte de sistemas informáticos." },
  { title: "Inglés intermedio", place: "Experiencia profesional", period: "USO ACTUAL", text: "Comunicación y soporte en contextos regionales, documentación técnica y plataformas internacionales." },
];

const suggestions = [
  "¿Qué proyectos hizo?",
  "¿Qué tecnologías usa?",
  "¿Qué experiencia tiene?",
];

const changingWords = ["simples", "útiles", "reales"];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function answerAboutJulian(question: string) {
  const q = normalize(question);

  if (!q) return "Preguntame algo sobre Julián, sus proyectos o las tecnologías que usa.";
  if (/hola|buenas|quien sos|como estas/.test(q)) return "¡Hola! Soy el asistente del portfolio de Julián. Puedo contarte sobre su perfil, sus proyectos y las tecnologías que utilizó.";
  if (/quien es|sobre julian|perfil|presenta/.test(q)) return "Julián Batistutti es desarrollador full stack argentino. Construye productos web de punta a punta, combinando frontend, backend, integraciones, bases de datos y una mirada práctica de producto.";
  if (/donde trabaja|donde trabajas|empresa actual|trabajo actual|empleo actual|actualmente/.test(q)) return "Actualmente trabaja como IT Support Analyst en Megatrans, desde septiembre de 2024. Resuelve incidencias de hardware, software y redes; administra accesos y herramientas corporativas; y brinda soporte remoto y presencial.";
  if (/experiencia|trayectoria|cv|curriculum|donde trabajo|donde trabajaste|empresas/.test(q)) return "Trabajó como Support Agent para Google Ads en Cognizant, Field Support Analyst para Cervecería Quilmes mediante Pixel IT, y Application Support & QA Analyst para Google en Tech Mahindra. Actualmente es IT Support Analyst en Megatrans.";
  if (/estudio|formacion|curso|coderhouse|educacion/.test(q)) return "Se formó como Full Stack Developer en Coderhouse y realizó la capacitación de Instalador y soporte de sistemas informáticos en el CFP 404. Su secundario tuvo orientación en economía, gestión, turismo y hotelería.";
  if (/ingles|idioma/.test(q)) return "Tiene nivel de inglés intermedio y experiencia brindando soporte para equipos y plataformas de alcance regional e internacional.";
  if (/soporte|hardware|software|it support|active directory|redes/.test(q)) return "Tiene experiencia en soporte IT, Active Directory, Microsoft 365, Google Workspace, ServiceNow, redes TCP/IP, mantenimiento de equipos, onboarding, soporte VIP y resolución de incidentes.";
  if (/qa|testing|calidad|bug/.test(q)) return "En Tech Mahindra realizó soporte y QA para complementos de Google Workspace Marketplace: detección y seguimiento de bugs, testing, optimización de procesos y soporte técnico a desarrolladores.";
  if (/proyecto|portfolio|hiciste|hizo|construyo|desarrollo/.test(q)) return "Sus proyectos seleccionados son VuelosBaratos, Tu Matteoli Online, ¿Qué Cocino Hoy? y TechPaws. Van desde e-commerce y viajes hasta productos con IA y sistemas de gestión.";
  if (/tecnologia|stack|lenguaje|herramienta|programa/.test(q)) return "Trabaja con React, Next.js, JavaScript, TypeScript y Node.js. También integró Firebase, Neon Postgres, Gemini, Mercado Pago, Stripe, Travelpayouts y despliegues en Vercel.";
  if (/vuelo|travel|viaje/.test(q)) return "VuelosBaratos centraliza una búsqueda que normalmente obliga a comparar varias páginas. Consulta referencias con Travelpayouts, evalúa precio y escalas, ordena por conveniencia y deriva a una búsqueda actualizada antes de reservar. Está construido con React y Node.js.";
  if (/matteoli|mate|tienda|ecommerce|e commerce/.test(q)) return "Tu Matteoli Online transformó un catálogo artesanal en una tienda responsive. Incluye filtros, productos reales, carrito, registro de órdenes con Firebase y un flujo de compra preparado para Stripe.";
  if (/cocino|receta|comida|gemini/.test(q)) return "¿Qué Cocino Hoy? propone cinco recetas según ingredientes, foto, dieta, tiempo y preferencias personales. Integra Gemini, autenticación con Firebase, favoritos y continuidad Premium mediante Mercado Pago.";
  if (/techpaws|tech paws|reparacion|servicio tecnico|pc|notebook/.test(q)) return "TechPaws combina la presencia comercial del servicio técnico con su operación diaria: panel privado, órdenes, historial de estados, seguimiento para clientes, avisos para WhatsApp y persistencia en Neon Postgres.";
  if (/contacto|email|correo|contratar|hablar/.test(q)) return "Podés contactar a Julián en julian.batistutti@gmail.com o visitar su GitHub: github.com/JulianBati92.";
  if (/argentina|donde|ubicacion/.test(q)) return "Julián trabaja desde Argentina y desarrolla productos web para escritorio y dispositivos móviles.";
  if (/ia|inteligencia artificial|gemini/.test(q)) return "En ¿Qué Cocino Hoy? integró Gemini para interpretar ingredientes y preferencias y devolver recetas ordenadas y fáciles de seguir.";

  return "Puedo responderte sobre el perfil de Julián, VuelosBaratos, Tu Matteoli Online, ¿Qué Cocino Hoy?, TechPaws, su stack o cómo contactarlo.";
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("Preguntame por los proyectos, el stack o la experiencia de Julián.");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setWordIndex((current) => (current + 1) % changingWords.length), 2600);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => observer.observe(element));
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  function ask(value: string) {
    setQuestion(value);
    setReply(answerAboutJulian(value));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }

  return (
    <main id="top">
      <aside className="profile-panel">
        <nav className="side-nav">
          <a className="identity" href="#top"><span className="flag" aria-label="Argentina">🇦🇷</span><span>JULIAN.dev</span></a>
          <div><a href="#proyectos">Proyectos</a><a href="#sobre-mi">Sobre mí</a></div>
        </nav>

        <section className="intro-copy">
          <div className="available"><i /> Disponible para nuevos proyectos</div>
          <p className="eyebrow hero-line">FULL STACK DEVELOPER · ARGENTINA</p>
          <h1 className="hero-line">Creo productos<br />digitales que se<br />sienten <em key={changingWords[wordIndex]}>{changingWords[wordIndex]}.</em></h1>
          <p className="bio hero-line">Diseño y desarrollo experiencias web completas: desde una idea clara hasta un producto funcional, cuidado y listo para crecer.</p>
          <div className="hero-actions hero-line">
            <a className="primary-action" href="#proyectos">Ver mi trabajo <Arrow /></a>
            <a className="secondary-action" href="mailto:julian.batistutti@gmail.com">Hablemos <span>→</span></a>
          </div>
        </section>

        <section className="assistant" aria-labelledby="assistant-title">
          <div className="assistant-head">
            <div><span className="assistant-dot" /><p id="assistant-title">Preguntale al portfolio</p></div>
            <span>JULIÁN</span>
          </div>
          <div className="answer" aria-live="polite">{reply}</div>
          <form onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="portfolio-question">Pregunta sobre Julián</label>
            <input id="portfolio-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="¿Qué construyó Julián?" autoComplete="off" />
            <button type="submit" aria-label="Enviar pregunta">↑</button>
          </form>
          <div className="suggestions">
            {suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>)}
          </div>
        </section>

        <div className="profile-foot"><span>BUENOS AIRES, ARGENTINA · UTC −03:00</span><span>HECHO CON MATE Y CÓDIGO</span></div>
      </aside>

      <section className="work-panel" id="proyectos">
        <header className="work-head"><span>PROYECTOS SELECCIONADOS</span><span>04 PROYECTOS</span></header>
        <div className="projects">
          {projects.map((project, index) => (
            <article className="project reveal" key={project.name} data-reveal>
              <div className="project-label"><span>0{index + 1}</span><span>{project.stack.slice(0, 2).join(" · ")}</span></div>
              <a className="project-name" href={project.live} target="_blank" rel="noreferrer">
                <h2>{project.name}</h2><span><Arrow /></span>
              </a>
              <p className="project-description">{project.description}</p>
              <a className="project-shot" href={project.live} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.name}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={`Captura real de ${project.name}`} />
                <span className="open-project">VER PROYECTO <Arrow /></span>
              </a>
              <div className="project-info">
                <p>{project.detail}</p>
                <ul className="project-highlights">{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
                <div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="project-links">
                  <a href={project.live} target="_blank" rel="noreferrer">Sitio en vivo <Arrow /></a>
                  <a href={project.repo} target="_blank" rel="noreferrer">Código <Arrow /></a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="career reveal" data-reveal>
          <div className="section-intro">
            <p className="eyebrow">EXPERIENCIA PROFESIONAL</p>
            <h2>Experiencia técnica<br />en contextos reales.</h2>
            <p>Desarrollo, soporte y calidad con una misma forma de trabajar: entender el problema, documentar bien y resolver sin vueltas.</p>
          </div>
          <div className="timeline">
            {experience.map((item) => (
              <article className="timeline-item" key={item.company}>
                <p className="timeline-period">{item.period}</p>
                <div>
                  <h3>{item.company}</h3>
                  <p className="timeline-role">{item.role}</p>
                  <p className="timeline-summary">{item.summary}</p>
                  <div className="stack">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="education reveal" data-reveal>
          <div className="section-intro compact">
            <p className="eyebrow">FORMACIÓN Y CAPACIDADES</p>
            <h2>Base técnica y aprendizaje constante.</h2>
          </div>
          <div className="education-grid">
            {education.map((item) => (
              <article key={item.title}>
                <p>{item.period}</p>
                <h3>{item.title}</h3>
                <strong>{item.place}</strong>
                <span>{item.text}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="approach reveal" id="sobre-mi" data-reveal>
          <p className="eyebrow">CÓMO TRABAJO</p>
          <h2>Del problema real<br />al producto publicado.</h2>
          <div className="approach-grid">
            <div><span>01</span><h3>Producto</h3><p>Pienso primero qué necesita resolver la persona y qué flujo hace falta.</p></div>
            <div><span>02</span><h3>Desarrollo</h3><p>Construyo la interfaz, la lógica y las integraciones como un solo sistema.</p></div>
            <div><span>03</span><h3>Iteración</h3><p>Pruebo, corrijo y mejoro a partir del uso real del producto.</p></div>
          </div>
        </section>

        <footer>
          <p className="eyebrow">CONTACTO</p>
          <h2>¿Construimos algo<br /><em>que sirva de verdad?</em></h2>
          <a className="mail" href="mailto:julian.batistutti@gmail.com">julian.batistutti@gmail.com <Arrow /></a>
          <div className="footer-line"><span>JULIÁN BATISTUTTI · FULL STACK DEVELOPER</span><a href="#top">VOLVER ARRIBA ↑</a></div>
        </footer>
      </section>
    </main>
  );
}
