import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Cpu,
  Layers3,
  Mail,
  Phone,
  Send,
  Workflow,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./portfolio.css";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = lazy(() => import("./HeroScene.jsx"));

const focusAreas = [
  {
    number: "01",
    icon: BrainCircuit,
    title: "IA generativa",
    description:
      "Exploro cómo llevar la IA generativa al trabajo real: con foco en utilidad, contexto y una experiencia que tenga sentido.",
    tags: ["Generative AI", "LLMs", "Experimentación"],
    visual: "01",
    accent: "violet",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Ecosistema Cells",
    description:
      "Desarrollo sobre Cells, el framework interno de BBVA, trabajando dentro de un ecosistema tecnológico propio y modular.",
    tags: ["Cells", "Framework interno", "BBVA"],
    visual: "02",
    accent: "blue",
  },
  {
    number: "03",
    icon: Code2,
    title: "Plataformas bancarias",
    description:
      "Trabajo con tecnologías internas como ASO, APX, LRA y LRBA para dar soporte a soluciones del sector financiero.",
    tags: ["ASO", "APX", "LRA", "LRBA"],
    visual: "03",
    accent: "pink",
  },
];

const skillGroups = [
  {
    number: "01",
    icon: Code2,
    title: "Desarrollo",
    description: "Interfaces, lógica de aplicación e integración con servicios.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Python", "APIs"],
  },
  {
    number: "02",
    icon: BrainCircuit,
    title: "IA & automatización",
    description: "Aplicaciones de IA generativa y automatización de procesos.",
    skills: ["IA generativa", "Automatizaciones", "Integración de APIs"],
  },
  {
    number: "03",
    icon: Workflow,
    title: "Pipelines & plataformas",
    description: "Generación de pipelines y desarrollo sobre plataformas internas.",
    skills: ["Pipelines", "Cells", "ASO", "APX", "LRA", "LRBA"],
  },
];

function ClientMarks({ compact = false }) {
  return (
    <div
      className={`client-marks${compact ? " client-marks--compact" : ""}`}
      aria-label="Accenture y BBVA"
    >
      <span className="client-mark client-mark--accenture">
        <span className="accenture-chevron" aria-hidden="true">
          &gt;
        </span>
        <span>accenture</span>
      </span>
      <span className="client-mark-divider" aria-hidden="true" />
      <span className="client-mark client-mark--bbva">
        <svg viewBox="0 0 42 32" aria-hidden="true">
          <path d="M2 8.5 18.5 2h8L9.8 12.3 2 15.1z" />
          <path d="m13.5 13.5 16.8-6.7h8.2L21.3 18.3l-7.8 2.8z" />
          <path d="m25 18.5 12.8-5.2v8.2l-12.8 5.2z" />
        </svg>
        <span>BBVA</span>
      </span>
    </div>
  );
}

function SectionHeading({ number, title, detail, light = false }) {
  return (
    <div className={`section-heading${light ? " section-heading--light" : ""}`}>
      <span className="section-number">{number}</span>
      <span className="section-kicker">{title}</span>
      <span className="section-rule" />
      <span className="section-aside">{detail}</span>
    </div>
  );
}

function App() {
  const appRef = useRef(null);
  const [submitStatus, setSubmitStatus] = useState("idle");

  useEffect(() => {
    const app = appRef.current;
    if (!app) return undefined;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-reveal]", app).forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: app,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    });

    media.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        const section = app.querySelector(".journey-section");
        const stage = app.querySelector(".journey-pin");
        const viewport = app.querySelector(".journey-viewport");
        const track = app.querySelector(".journey-track");
        if (!section || !stage || !viewport || !track) return undefined;

        const horizontalDistance = () =>
          Math.max(0, track.scrollWidth - viewport.clientWidth);
        return gsap.to(track, {
          x: () => -horizontalDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(horizontalDistance(), window.innerHeight * 1.8)}`,
            pin: stage,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      },
    );

    return () => media.revert();
  }, []);

  async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const details = Object.fromEntries(new FormData(form));
    setSubmitStatus("sending");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/angusjr003@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: details.name,
            email: details.email,
            phone: details.phone || "No indicado",
            projectType: details.projectType,
            projectDetails: details.projectDetails,
            _subject: `Propuesta de proyecto · ${details.name}`,
            _template: "table",
            _honey: details._honey,
          }),
        },
      );
      const result = await response.json();

      if (
        !response.ok ||
        result.success === false ||
        result.success === "false"
      ) {
        throw new Error("Form submission was rejected");
      }

      form.reset();
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <div className="site-shell" ref={appRef}>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Iván, inicio">
          IVÁN<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#perfil">Perfil</a>
          <a href="#experiencia">Recorrido</a>
          <a href="#skills">Tecnologías</a>
        </nav>
        <a className="header-contact" href="#contacto">
          Hablemos <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid-pattern" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-eyebrow">
              <span className="status-dot" />
              Portfolio profesional <span className="eyebrow-divider">/</span>{" "}
              Madrid, España
            </p>
            <h1 className="hero-title">
              <span>Ideas que</span>
              <span>
                se vuelven <em>inteligentes.</em>
              </span>
            </h1>
            <p className="hero-summary">
              System Developer Associate <span>·</span> Generative AI Developer
            </p>
            <div className="hero-affiliation">
              <span className="affiliation-label">En Accenture para</span>
              <ClientMarks />
            </div>
            <div className="hero-actions">
              <a className="button button--primary" href="#experiencia">
                Explorar mi trabajo{" "}
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="hero-scroll-link" href="#perfil">
                <span className="scroll-icon">
                  <ArrowDown size={14} aria-hidden="true" />
                </span>
                Desplázate para descubrir
              </a>
            </div>
            <div className="hero-index">
              <span>SOFTWARE</span>
              <span>IA GENERATIVA</span>
              <span>FINTECH</span>
            </div>
          </div>
          <div className="hero-art">
            <Suspense
              fallback={
                <div className="hero-scene" aria-hidden="true">
                  <div className="scene-fallback" />
                </div>
              }
            >
              <HeroScene />
            </Suspense>
            <div className="hero-art-caption">
              <span>UN UNIVERSO DE POSIBILIDADES</span>
              <Cpu size={15} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <div className="hero-stamp" aria-hidden="true">
              <span>BUILD</span>
              <span>WITH</span>
              <span>INTENT</span>
            </div>
          </div>
          <div className="hero-bottomline" aria-hidden="true">
            <span>IVÁN SORIA ÁLVAREZ</span>
            <span>DESLIZA PARA COMENZAR&nbsp; ↓</span>
          </div>
        </section>

        <section className="profile-section section-wrap" id="perfil">
          <SectionHeading
            number="01"
            title="QUIÉN SOY"
            detail="INGENIERÍA CON PROPÓSITO"
          />
          <div className="profile-grid">
            <div className="profile-identity" data-reveal>
              <p className="profile-pretitle">HOLA, SOY IVÁN</p>
              <h2>
                Tecnología
                <br />
                con <em>propósito.</em>
              </h2>
              <figure className="profile-portrait">
                <img
                  src="/imagen-perfil.jpeg"
                  alt="Retrato de Iván Soria Álvarez"
                  loading="lazy"
                />
                <figcaption>
                  <span>IVÁN SORIA ÁLVAREZ</span>
                  <span>MADRID, ES</span>
                </figcaption>
              </figure>
            </div>
            <div className="profile-body" data-reveal>
              <span className="profile-coordinate">40°25′ N &nbsp; / &nbsp; 03°42′ O</span>
              <p className="profile-lead">
                Desarrollo soluciones donde la ingeniería de software se cruza
                con la inteligencia artificial.
              </p>
              <p>
                Actualmente trabajo en Accenture para BBVA como System Developer
                Associate y Generative AI Developer. Mi día a día combina el
                framework interno Cells con tecnologías propias del entorno
                bancario como ASO, APX, LRA y LRBA.
              </p>
              <p>
                Me interesa trabajar con objetivos claros, entender las
                necesidades del equipo y desarrollar soluciones mantenibles.
              </p>
              <a className="text-link" href="#experiencia">
                Conoce mi enfoque <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <div className="profile-stats">
                <div>
                  <strong>Madrid</strong>
                  <span>ubicación</span>
                </div>
                <div>
                  <strong>Accenture</strong>
                  <span>empresa</span>
                </div>
                <div>
                  <strong>BBVA</strong>
                  <span>cliente actual</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="journey-section" id="experiencia">
          <div className="journey-pin">
            <div className="section-wrap journey-inner">
              <SectionHeading
                number="02"
                title="MI RECORRIDO"
                detail="DESLIZA PARA EXPLORAR"
                light
              />
              <div className="journey-heading">
                <div>
                  <p className="journey-pretitle">UN CAMPO, MUCHAS POSIBILIDADES</p>
                  <h2>
                    Construir para
                    <br />
                    <em>lo que viene.</em>
                  </h2>
                </div>
                <div className="journey-hint" aria-hidden="true">
                  <span>SCROLL</span>
                  <ArrowDown size={16} />
                </div>
              </div>
              <div
                className="journey-viewport"
                tabIndex={0}
                aria-label="Áreas de trabajo; desliza para explorar"
              >
                <div className="journey-track">
                  {focusAreas.map(
                    ({ number, icon: Icon, title, description, tags, visual, accent }) => (
                      <article
                        className={`journey-card journey-card--${accent}`}
                        key={number}
                      >
                        <div className="journey-card-top">
                          <span>{number} — 03</span>
                          <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <span className="journey-card-visual" aria-hidden="true">
                          {visual}
                        </span>
                        <div className="journey-card-copy">
                          <h3>{title}</h3>
                          <p>{description}</p>
                          <div className="focus-tags">
                            {tags.map((tag) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </article>
                    ),
                  )}
                  <article className="journey-card journey-card--outro">
                    <span className="outro-mark" aria-hidden="true">
                      IV.
                    </span>
                    <p className="journey-pretitle">LO IMPORTANTE</p>
                    <h3>
                      Resolver
                      <br />
                      lo que <em>importa.</em>
                    </h3>
                    <a className="text-link text-link--light" href="#contacto">
                      Hablemos de ideas <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="experience-section">
          <div className="section-wrap experience-inner">
            <SectionHeading
              number="03"
              title="EXPERIENCIA"
              detail="ACTUALIDAD"
              light
            />
            <div className="experience-layout">
              <div className="experience-intro" data-reveal>
                <p className="experience-kicker">01 — PRESENTE</p>
                <h2>
                  En el centro
                  <br />
                  de la <em>transformación.</em>
                </h2>
                <p className="experience-summary">
                  Desarrollo de software e IA generativa en el sector financiero.
                </p>
              </div>
              <article className="experience-entry" data-reveal>
                <div className="experience-role">
                  <ClientMarks compact />
                  <h3>
                    System Developer Associate
                    <br />
                    <span>Generative AI Developer</span>
                  </h3>
                  <p>
                    Desarrollo de software y exploración de casos de uso de IA
                    generativa dentro del entorno tecnológico de BBVA.
                  </p>
                </div>
                <span className="experience-symbol" aria-hidden="true">
                  <ArrowUpRight size={24} strokeWidth={1.4} />
                </span>
                <div className="experience-footnote">
                  <span>ENTORNO TECNOLÓGICO</span>
                  <span>CELLS · ASO · APX · LRA · LRBA</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-wrap">
            <SectionHeading
              number="04"
              title="TECNOLOGÍAS"
              detail="HERRAMIENTAS PARA CONSTRUIR"
              light
            />
            <div className="skills-heading" data-reveal>
              <h2>
                Ideas, código
                <br />
                y <em>posibilidades.</em>
              </h2>
              <p>
                Herramientas y ámbitos técnicos de mi experiencia profesional.
              </p>
            </div>
            <div className="skills-grid">
              {skillGroups.map(
                ({ number, icon: Icon, title, description, skills }) => (
                  <article className="skill-group" data-reveal key={number}>
                    <div className="skill-group-top">
                      <span>{number} / 03</span>
                      <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                    </div>
                    <div className="skill-group-content">
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                    <ul>
                      {skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div className="section-wrap contact-layout">
            <div className="contact-copy" data-reveal>
              <p className="contact-kicker">
                <span className="status-dot" /> CONTACTO PROFESIONAL
              </p>
              <h2>
                Lo siguiente
                <br />
                lo <em>construimos.</em>
              </h2>
              <p>
                Cuéntame el objetivo, el alcance y los plazos. Puedo colaborar
                en desarrollo web, integraciones, automatización e IA
                generativa.
              </p>
              <div className="contact-methods">
                <a href="tel:620224985">
                  <Phone size={18} aria-hidden="true" />
                  <span>
                    <small>LLÁMAME</small>620 224 985
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a href="mailto:angusjr003@gmail.com">
                  <Mail size={18} aria-hidden="true" />
                  <span>
                    <small>ESCRÍBEME</small>angusjr003@gmail.com
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
              <a
                className="contact-link"
                href="https://www.linkedin.com/in/iv%C3%A1n-soria-%C3%A1lvarez-a2a766263/"
                target="_blank"
                rel="noreferrer"
              >
                También en LinkedIn{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>

            <form
              className="contact-form"
              data-reveal
              onSubmit={handleContactSubmit}
            >
              <div className="contact-form-heading">
                <span>01 — EMPECEMOS</span>
                <p>Cuéntame un poco sobre tu proyecto.</p>
              </div>
              <input
                className="contact-honeypot"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className="contact-fields">
                <label>
                  Nombre
                  <input name="name" autoComplete="name" required />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </label>
              </div>
              <div className="contact-fields">
                <label>
                  Teléfono <span>(opcional)</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  Tipo de proyecto
                  <select name="projectType" defaultValue="" required>
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option>Desarrollo web</option>
                    <option>IA generativa</option>
                    <option>Automatización</option>
                    <option>API o integración</option>
                    <option>Otro proyecto</option>
                  </select>
                </label>
              </div>
              <label>
                ¿Qué te gustaría desarrollar?
                <textarea
                  name="projectDetails"
                  rows="4"
                  minLength="20"
                  required
                  placeholder="Objetivo, alcance y cualquier detalle útil…"
                />
              </label>
              <button
                className="contact-submit"
                type="submit"
                disabled={submitStatus === "sending"}
              >
                {submitStatus === "sending" ? "Enviando…" : "Enviar propuesta"}
                <Send size={16} aria-hidden="true" />
              </button>
              <p className="contact-form-note">
                El envío se procesa mediante{" "}
                <a
                  href="https://formsubmit.co/privacy.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  FormSubmit
                </a>
                .
              </p>
              <p
                className={`contact-form-feedback contact-form-feedback--${submitStatus}`}
                role={submitStatus === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {submitStatus === "success" &&
                  "El servicio ha aceptado tu propuesta. Gracias por escribirme."}
                {submitStatus === "error" &&
                  "No se pudo enviar ahora. Puedes llamarme o escribirme directamente."}
                {submitStatus === "sending" && "Enviando propuesta…"}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark" href="#inicio">
          IVÁN<span>.</span>
        </a>
        <span>Portfolio profesional · Madrid</span>
        <a href="#inicio">
          VOLVER ARRIBA <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}

export default App;
