import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Layers3,
  Mail,
  Phone,
  Send,
  Workflow,
} from "lucide-react";
import "./portfolio.css";

const focusAreas = [
  {
    number: "01",
    icon: BrainCircuit,
    title: "IA generativa",
    description:
      "Exploro cómo llevar la IA generativa al trabajo real: con foco en utilidad, contexto y una experiencia que tenga sentido.",
    tags: ["Generative AI", "LLMs", "Experimentación"],
  },
  {
    number: "02",
    icon: Layers3,
    title: "Ecosistema Cells",
    description:
      "Desarrollo sobre Cells, el framework interno de BBVA, trabajando dentro de un ecosistema tecnológico propio y modular.",
    tags: ["Cells", "Framework interno", "BBVA"],
  },
  {
    number: "03",
    icon: Code2,
    title: "Plataformas bancarias",
    description:
      "Trabajo con tecnologías internas como ASO, APX, LRA y LRBA para dar soporte a soluciones del sector financiero.",
    tags: ["ASO", "APX", "LRA", "LRBA"],
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

function App() {
  const [submitStatus, setSubmitStatus] = useState("idle");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    document.documentElement.classList.add("scroll-motion-ready");
    const revealElements = [
      ...document.querySelectorAll("[data-scroll-reveal]"),
    ];
    let frameId;

    const updateScrollEffects = () => {
      frameId = undefined;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      document.documentElement.style.setProperty(
        "--scroll-progress",
        String(Math.min(Math.max(progress, 0), 1)),
      );

      revealElements.forEach((element) => {
        if (element.classList.contains("is-visible")) return;
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.88 && bounds.bottom > 0) {
          element.classList.add("is-visible");
        }
      });
    };

    const scheduleScrollEffects = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();
    window.addEventListener("scroll", scheduleScrollEffects, { passive: true });
    window.addEventListener("resize", scheduleScrollEffects);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleScrollEffects);
      window.removeEventListener("resize", scheduleScrollEffects);
      document.documentElement.classList.remove("scroll-motion-ready");
      document.documentElement.style.removeProperty("--scroll-progress");
    };
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
    <div className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Iván, inicio">
          IVÁN<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#perfil">Perfil</a>
          <a href="#experiencia">Experiencia</a>
          <a href="#enfoque">Enfoque</a>
          <a href="#skills">Skills</a>
        </nav>
        <a className="header-contact" href="#contacto">
          Hablemos <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grid-pattern" aria-hidden="true" />
          <div className="hero-content" data-scroll-reveal>
            <p className="hero-eyebrow">
              <span className="status-dot" />
              Portfolio profesional <span className="eyebrow-divider">/</span>{" "}
              Madrid
            </p>
            <h1 className="hero-title">
              <span>Generative AI</span>
              <span>
                Developer<span className="title-period">.</span>
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
                Ver experiencia{" "}
                <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <a className="hero-scroll-link" href="#perfil">
                <span className="scroll-icon">
                  <ArrowDown size={14} aria-hidden="true" />
                </span>
                Descubre mi perfil
              </a>
            </div>
          </div>

          <figure className="hero-visual" data-scroll-reveal>
            <img
              src="/79391832d4adf2092652f6d5ebe77a29.jpg"
              alt="Composición abstracta sobre tecnología e inteligencia artificial"
              fetchPriority="high"
            />
            <div className="hero-visual-wash" aria-hidden="true" />
            <div className="hero-visual-topline">
              <span>SOFTWARE</span>
              <span className="hero-visual-index">01 — 04</span>
            </div>
            <div className="hero-visual-caption">
              <span>Ingeniería con intención.</span>
              <span className="caption-orbit" aria-hidden="true">
                +
              </span>
            </div>
          </figure>

          <div className="hero-bottomline" aria-hidden="true">
            <span>DESARROLLO</span>
            <span>INTELIGENCIA ARTIFICIAL</span>
            <span>SECTOR FINANCIERO</span>
          </div>
        </section>

        <section className="ticker" aria-label="Tecnologías">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-set" key={copy} aria-hidden={copy === 1}>
                <span>GENERATIVE AI</span>
                <i />
                <span>CELLS</span>
                <i />
                <span>ASO</span>
                <i />
                <span>APX</span>
                <i />
                <span>LRA</span>
                <i />
                <span>LRBA</span>
                <i />
              </div>
            ))}
          </div>
        </section>

        <section className="profile-section section-wrap" id="perfil">
          <div className="section-heading" data-scroll-reveal>
            <span className="section-number">01</span>
            <span className="section-kicker">QUIÉN SOY</span>
            <span className="section-rule" />
            <span className="section-aside">UN PERFIL EN MOVIMIENTO</span>
          </div>
          <div className="profile-grid">
            <div className="profile-identity" data-scroll-reveal>
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
            <div className="profile-body" data-scroll-reveal>
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
              <a className="text-link" href="#enfoque">
                Áreas de trabajo <ArrowUpRight size={16} aria-hidden="true" />
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

        <section className="experience-section" id="experiencia">
          <div className="section-wrap experience-inner">
            <div
              className="section-heading section-heading--light"
              data-scroll-reveal
            >
              <span className="section-number">02</span>
              <span className="section-kicker">EXPERIENCIA</span>
              <span className="section-rule" />
              <span className="section-aside">ACTUALIDAD</span>
            </div>
            <div className="experience-intro" data-scroll-reveal>
              <h2>
                Experiencia
                <br />
                <em>profesional.</em>
              </h2>
              <p>
                Desarrollo de software e IA generativa en el sector financiero.
              </p>
            </div>
            <article className="experience-entry" data-scroll-reveal>
              <div className="experience-date">
                <span>ACTUALIDAD</span>
                <span>01 — PRESENTE</span>
              </div>
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
              <div className="experience-symbol" aria-hidden="true">
                <ArrowUpRight size={24} strokeWidth={1.4} />
              </div>
            </article>
            <div className="experience-footnote" data-scroll-reveal>
              <span>TECNOLOGÍAS DEL ENTORNO</span>
              <span>CELLS · ASO · APX · LRA · LRBA</span>
            </div>
          </div>
        </section>

        <section className="focus-section section-wrap" id="enfoque">
          <div className="section-heading" data-scroll-reveal>
            <span className="section-number">03</span>
            <span className="section-kicker">ENFOQUE</span>
            <span className="section-rule" />
            <span className="section-aside">DONDE PONGO LA ENERGÍA</span>
          </div>
          <div className="section-intro" data-scroll-reveal>
            <h2>
              Áreas de <em>trabajo.</em>
            </h2>
            <p>
              Desarrollo de software, plataformas internas e inteligencia
              artificial generativa.
            </p>
          </div>
          <div className="focus-grid">
            {focusAreas.map(({ number, icon: Icon, title, description, tags }) => (
              <article
                className="focus-card"
                data-scroll-reveal
                key={number}
              >
                <div className="focus-card-top">
                  <span>{number} / 03</span>
                  <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <div className="focus-card-content">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <div className="focus-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-wrap">
            <div
              className="section-heading section-heading--light"
              data-scroll-reveal
            >
              <span className="section-number">04</span>
              <span className="section-kicker">SKILLS</span>
              <span className="section-rule" />
              <span className="section-aside">HERRAMIENTAS PARA CONSTRUIR</span>
            </div>
            <div className="skills-heading" data-scroll-reveal>
              <h2>
                Tecnologías y <em>competencias.</em>
              </h2>
              <p>
                Herramientas y ámbitos técnicos de mi experiencia profesional.
              </p>
            </div>
            <div className="skills-grid">
              {skillGroups.map(
                ({ number, icon: Icon, title, description, skills }) => (
                  <article
                    className="skill-group"
                    data-scroll-reveal
                    key={number}
                  >
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
            <div className="contact-copy" data-scroll-reveal>
              <div className="contact-kicker">
                <span className="status-dot" /> CONTACTO PROFESIONAL
              </div>
              <h2>
                ¿Tienes un
                <br />
                <em>proyecto?</em>
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
              data-scroll-reveal
              onSubmit={handleContactSubmit}
            >
              <div className="contact-form-heading">
                <span>DESCRIBE TU PROYECTO</span>
                <p>Indica el tipo de trabajo y los detalles principales.</p>
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
