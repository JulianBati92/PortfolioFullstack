"use client";

import { FormEvent, useState } from "react";

type Project = {
  name: string;
  description: string;
  image: string;
  live: string;
  repo: string;
  stack: string[];
  detail: string;
};

const projects: Project[] = [
  {
    name: "VuelosBaratos",
    description: "Buscador de vuelos con comparación por precio y escalas, recomendación de conveniencia y conexión con Travelpayouts.",
    image: "/projects/vuelosbaratos.png",
    live: "https://vuelosbaratos-two.vercel.app",
    repo: "https://github.com/JulianBati92/Vuelosbaratos",
    stack: ["React", "Node.js", "Travelpayouts", "Vercel"],
    detail: "Aplicación full stack que ordena ofertas por conveniencia y mantiene la búsqueda útil incluso sin una API de IA configurada.",
  },
  {
    name: "Tu Matteoli Online",
    description: "Tienda online de mates y accesorios con catálogo, carrito y un flujo de compra conectado con Firebase y Stripe.",
    image: "/projects/tumatteoli.png",
    live: "https://tumatteolionline.vercel.app",
    repo: "https://github.com/JulianBati92/tumatteolionline",
    stack: ["JavaScript", "Firebase", "Stripe", "E-commerce"],
    detail: "E-commerce responsive con productos reales, gestión del carrito y persistencia de órdenes mediante servicios de Firebase.",
  },
  {
    name: "¿Qué Cocino Hoy?",
    description: "Aplicación que propone recetas a partir de ingredientes, una foto y preferencias escritas con palabras propias.",
    image: "/projects/que-cocino-hoy.png",
    live: "https://quecocinohoy.vercel.app",
    repo: "https://github.com/JulianBati92/que-cocino-hoy",
    stack: ["Next.js", "TypeScript", "Gemini", "Firebase", "Mercado Pago"],
    detail: "Incluye autenticación, cinco propuestas estructuradas, favoritos, usos gratuitos y continuidad Premium mediante suscripciones.",
  },
  {
    name: "TechPaws",
    description: "Web y sistema de gestión para un servicio técnico de PCs y notebooks, con seguimiento privado para cada cliente.",
    image: "/projects/techpaws.png",
    live: "https://tech-paws.vercel.app",
    repo: "https://github.com/JulianBati92/TechPaws",
    stack: ["Next.js", "TypeScript", "Neon Postgres", "Vercel"],
    detail: "Combina una landing comercial con panel privado, órdenes de servicio, historial de estados y mensajes preparados para WhatsApp.",
  },
];

const suggestions = [
  "¿Qué proyectos hizo?",
  "¿Qué tecnologías usa?",
  "Contame sobre TechPaws",
];

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
  if (/proyecto|trabajo|portfolio|hiciste|hizo/.test(q)) return "Sus proyectos seleccionados son VuelosBaratos, Tu Matteoli Online, ¿Qué Cocino Hoy? y TechPaws. Van desde e-commerce y viajes hasta productos con IA y sistemas de gestión.";
  if (/tecnologia|stack|lenguaje|herramienta|programa/.test(q)) return "Trabaja con React, Next.js, JavaScript, TypeScript y Node.js. También integró Firebase, Neon Postgres, Gemini, Mercado Pago, Stripe, Travelpayouts y despliegues en Vercel.";
  if (/vuelo|travel|viaje/.test(q)) return "VuelosBaratos compara precios y escalas, ordena opciones por conveniencia y utiliza Travelpayouts para obtener referencias. Está construido con React y Node.js.";
  if (/matteoli|mate|tienda|ecommerce|e commerce/.test(q)) return "Tu Matteoli Online es una tienda de mates y accesorios. Incluye catálogo, carrito, Firebase y un flujo de pagos preparado con Stripe.";
  if (/cocino|receta|comida|gemini/.test(q)) return "¿Qué Cocino Hoy? usa Gemini para generar cinco recetas a partir de ingredientes, una foto y preferencias personales. Suma Firebase Authentication y suscripciones con Mercado Pago.";
  if (/techpaws|tech paws|reparacion|servicio tecnico|pc|notebook/.test(q)) return "TechPaws es el proyecto de servicio técnico de Julián. La web incluye captación de clientes, panel privado, órdenes de reparación, seguimiento de equipos y una base Neon Postgres.";
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

  function ask(value: string) {
    setQuestion(value);
    setReply(answerAboutJulian(value));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }

  return (
    <main>
      <aside className="profile-panel">
        <div className="identity">
          <span className="flag" aria-label="Argentina">🇦🇷</span>
          <span>JULIÁN BATISTUTTI</span>
          <span className="available">DISPONIBLE</span>
        </div>

        <section className="intro-copy">
          <p className="eyebrow">FULL STACK DEVELOPER · ARGENTINA</p>
          <h1>Julián<br />Batistutti.</h1>
          <p className="role">Diseño interfaces, conecto backends y convierto ideas en productos web que funcionan.</p>
          <p className="bio">Desarrollador full stack enfocado en experiencias completas: frontend, APIs, bases de datos, pagos y automatización.</p>
          <div className="socials">
            <a href="mailto:julian.batistutti@gmail.com">Email <Arrow /></a>
            <a href="https://github.com/JulianBati92" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          </div>
        </section>

        <section className="assistant" aria-labelledby="assistant-title">
          <div className="assistant-head">
            <div><span className="assistant-dot" /><p id="assistant-title">Preguntale al portfolio</p></div>
            <span>EN LÍNEA</span>
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

        <div className="profile-foot"><span>BUENOS AIRES · UTC −03:00</span><span>© 2026</span></div>
      </aside>

      <section className="work-panel">
        <header className="work-head"><span>PROYECTOS SELECCIONADOS</span><span>04 PROYECTOS</span></header>
        <div className="projects">
          {projects.map((project, index) => (
            <article className="project" key={project.name}>
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
                <div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="project-links">
                  <a href={project.live} target="_blank" rel="noreferrer">Sitio en vivo <Arrow /></a>
                  <a href={project.repo} target="_blank" rel="noreferrer">Código <Arrow /></a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="approach">
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
