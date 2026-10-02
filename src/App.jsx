import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Layers3,
  MoveUpRight,
  Mail,
  Phone,
  Send,
  Sparkles,
  Workflow,
} from "lucide-react";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

const focusAreas = [
  {
    number: "01",
    icon: BrainCircuit,
    title: "IA generativa",
    description:
      "Exploro cómo llevar la IA generativa al trabajo real: con foco en utilidad, contexto y una experiencia que tenga sentido.",
    tags: ["Generative AI", "LLMs", "Experimentación"],
    className: "focus-card--lime",
  },
  {
    number: "02",
    icon: Layers3,
    title: "Ecosistema Cells",
    description:
      "Desarrollo sobre Cells, el framework interno de BBVA, trabajando dentro de un ecosistema tecnológico propio y modular.",
    tags: ["Cells", "Framework interno", "BBVA"],
    className: "focus-card--violet",
  },
  {
    number: "03",
    icon: Code2,
    title: "Plataformas bancarias",
    description:
      "Trabajo con tecnologías internas como ASO, APX, LRA y LRBA para dar soporte a soluciones del sector financiero.",
    tags: ["ASO", "APX", "LRA", "LRBA"],
    className: "focus-card--orange",
  },
];

const skillGroups = [
  {
    number: "01",
    icon: Code2,
    title: "Desarrollo",
    description:
      "Interfaces, lógica de aplicación e integración con servicios.",
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
    description:
      "Generación de pipelines y desarrollo sobre plataformas internas.",
    skills: ["Pipelines", "Cells", "ASO", "APX", "LRA", "LRBA"],
  },
];

function App() {
  const pageRef = useRef(null);
  const [submitStatus, setSubmitStatus] = useState("idle");

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

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const motion = gsap.matchMedia();
    motion.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap.from(".hero-eyebrow", {
          y: 18,
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.15,
          ease: "power2.out",
        });
        gsap.from(".hero-title-line", {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
          delay: 0.25,
          ease: "power4.out",
        });
        gsap.from(".hero-summary, .hero-actions", {
          y: 20,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.12,
          delay: 0.7,
          ease: "power2.out",
        });
        gsap.from(".hero-visual", {
          clipPath: "inset(12% 0 12% 0)",
          autoAlpha: 0,
          duration: 1.1,
          delay: 0.2,
          ease: "power3.inOut",
        });

        gsap.utils.toArray("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 38,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          });
        });

        gsap.utils.toArray("[data-parallax]").forEach((frame) => {
          const image = frame.querySelector("img");
          if (!image) return;

          gsap.to(image, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: frame,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });

        gsap.to(".scroll-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
        const story = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "+=1800",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        story
          .to(
            ".hero-copy",
            { yPercent: -15, autoAlpha: 0, duration: 0.22, ease: "none" },
            0,
          )
          .to(
            ".hero-visual-wrap",
            {
              top: 0,
              right: 0,
              width: "100vw",
              height: "100svh",
              margin: 0,
              transform: "none",
              duration: 0.42,
              ease: "none",
            },
            0,
          )
          .to(
            ".hero-visual",
            { height: "100svh", minHeight: 0, duration: 0.42, ease: "none" },
            0,
          )
          .to(".hero-visual img", { scale: 1.12, duration: 1, ease: "none" }, 0)
          .to(
            ".hero-bottomline, .hero-index, .hero-side-note, .visual-caption",
            {
              autoAlpha: 0,
              duration: 0.12,
            },
            0.04,
          )
          .fromTo(
            ".hero-story > p",
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.16,
              ease: "none",
            },
            0.28,
          )
          .fromTo(
            ".hero-story-line--one",
            { autoAlpha: 0, y: 90 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.22,
              ease: "none",
            },
            0.33,
          )
          .to(
            ".hero-story-line--one",
            { autoAlpha: 0, y: -55, duration: 0.18, ease: "none" },
            0.55,
          )
          .to(
            ".hero-story > p",
            { autoAlpha: 0, duration: 0.12, ease: "none" },
            0.55,
          )
          .fromTo(
            ".hero-story-line--two",
            { autoAlpha: 0, y: 90 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.22,
              ease: "none",
            },
            0.57,
          )
          .to(
            ".hero-story-line--two",
            { autoAlpha: 0, y: -35, duration: 0.15, ease: "none" },
            0.8,
          )
          .fromTo(
            ".hero-story-caption",
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.18,
              ease: "none",
            },
            0.84,
          );
      },
      page,
    );

    return () => motion.revert();
  }, []);

  return (
    <div className="site-shell" ref={pageRef}>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Iván, inicio">
          IVÁN<span className="wordmark-dot">.</span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#perfil">Perfil</a>
          <a href="#experiencia">Experiencia</a>
          <a href="#skills">Skills</a>
        </nav>
        <a className="header-contact" href="#contacto">
          Hablemos <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </header>

      <main>
        <section className="hero section-wrap" id="inicio">
          <div className="hero-copy">
            <p className="hero-eyebrow">
              <span /> Portfolio profesional · Madrid
            </p>
            <h1 className="hero-title">
              <span className="hero-title-line">Generative AI</span>
              <span className="hero-title-line">
                Developer<span className="title-period">.</span>
              </span>
            </h1>
            <p className="hero-summary">
              System Developer Associate <span>|</span> Generative AI Developer
            </p>
            <div className="hero-actions">
              <a className="button button--light" href="#experiencia">
                Ver experiencia <ArrowDownRight size={17} aria-hidden="true" />
              </a>
              <span className="hero-location">
                Accenture <i /> cliente BBVA
              </span>
            </div>
          </div>

          <div className="hero-visual-wrap">
            <div className="hero-index">
              01 <span>/ 03</span>
            </div>
            <div className="hero-visual">
              <img
                src="/79391832d4adf2092652f6d5ebe77a29.jpg"
                alt="Espacio de oficina en Madrid"
                fetchPriority="high"
              />
              <div className="visual-wash" />
              <div className="hero-story" aria-hidden="true">
                <p>ACCENTURE · MADRID</p>
                <h2 className="hero-story-line hero-story-line--one">
                  Desarrollo
                  <br />
                  <em>de software</em>
                </h2>
                <h2 className="hero-story-line hero-story-line--two">
                  IA generativa
                  <br />
                  <em>en banca</em>
                </h2>
                <span className="hero-story-caption">
                  ACCENTURE · PROYECTO BBVA
                </span>
              </div>
              <div className="visual-caption">
                <span>ACCENTURE MADRID · OFICINA</span>
                <span>40°25' N&nbsp; 3°42' W</span>
              </div>
              <div className="visual-stamp" aria-hidden="true">
                <Sparkles size={22} strokeWidth={1.5} />
                <span>
                  Madrid
                  <br />
                  España
                </span>
              </div>
            </div>
            <div className="hero-side-note">
              Construyendo desde dentro{" "}
              <ArrowDown size={14} aria-hidden="true" />
            </div>
          </div>

          <div className="hero-bottomline">
            <span>Desarrollo · IA generativa · Banca</span>
            <a href="#perfil" aria-label="Desplazarse a la sección de perfil">
              <ArrowDown size={17} />
            </a>
            <span>Scroll para descubrir</span>
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
          <div className="section-label" data-reveal>
            <span>01 / QUIÉN SOY</span>
            <span>UN PERFIL EN MOVIMIENTO</span>
          </div>
          <div className="profile-grid">
            <div className="profile-identity" data-reveal>
              <h2>
                Sobre <em>mí</em>
              </h2>
              <figure className="profile-portrait" data-parallax>
                <img
                  src="/imagen-perfil.jpeg"
                  alt="Retrato de Iván Soria Álvarez"
                  loading="lazy"
                />
                <figcaption>IVÁN SORIA ÁLVAREZ</figcaption>
              </figure>
            </div>
            <div className="profile-body" data-reveal>
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
                Áreas de trabajo <MoveUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="profile-stats" data-reveal>
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
        </section>

        <section className="experience-section" id="experiencia">
          <div className="section-wrap experience-inner">
            <div className="section-label section-label--dark" data-reveal>
              <span>02 / EXPERIENCIA</span>
              <span>ACTUALIDAD</span>
            </div>
            <div className="experience-heading" data-reveal>
              <h2>
                Experiencia <em>profesional</em>
              </h2>
              <p>
                Desarrollo de software e IA generativa en el sector financiero.
              </p>
            </div>
            <article className="experience-entry" data-reveal>
              <div className="experience-date">
                <span>ACTUALIDAD</span>
                <span>01 — PRESENTE</span>
              </div>
              <div className="experience-role">
                <p className="experience-company">
                  ACCENTURE <span>×</span> BBVA
                </p>
                <h3>
                  System Developer Associate
                  <br />
                  Generative AI Developer
                </h3>
                <p>
                  Desarrollo de software y exploración de casos de uso de IA
                  generativa dentro del entorno tecnológico de BBVA.
                </p>
              </div>
              <div className="experience-symbol" aria-hidden="true">
                <ArrowUpRight size={27} strokeWidth={1.2} />
              </div>
            </article>
            <div className="experience-footnote" data-reveal>
              <span>TECNOLOGÍAS DEL ENTORNO</span>
              <span>CELLS · ASO · APX · LRA · LRBA</span>
            </div>
          </div>
        </section>

        <section className="focus-section section-wrap" id="enfoque">
          <div className="section-label" data-reveal>
            <span>03 / ENFOQUE</span>
            <span>DONDE PONGO LA ENERGÍA</span>
          </div>
          <div className="focus-intro" data-reveal>
            <h2>
              Áreas de <em>trabajo</em>
            </h2>
            <p>
              Desarrollo de software, plataformas internas e inteligencia
              artificial generativa.
            </p>
          </div>
          <div className="focus-grid">
            {focusAreas.map(
              ({ number, icon: Icon, title, description, tags, className }) => (
                <article
                  className={`focus-card ${className}`}
                  data-reveal
                  key={number}
                >
                  <div className="focus-card-top">
                    <span>{number} / 03</span>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
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
              ),
            )}
          </div>
        </section>

        <section className="skills-section section-wrap" id="skills">
          <div className="section-label" data-reveal>
            <span>04 / SKILLS</span>
            <span>HERRAMIENTAS PARA CONSTRUIR</span>
          </div>
          <div className="skills-heading" data-reveal>
            <h2>
              Tecnologías y<br />
              <em>competencias</em>
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
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul>
                    {skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="contact-section" id="contacto">
          <div
            className="contact-orbit contact-orbit--one"
            aria-hidden="true"
          />
          <div
            className="contact-orbit contact-orbit--two"
            aria-hidden="true"
          />
          <div className="section-wrap contact-layout">
            <div className="contact-copy" data-reveal>
              <div className="contact-kicker">
                <span /> CONTACTO PROFESIONAL
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
              onSubmit={handleContactSubmit}
              data-reveal
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
          IVÁN<span className="wordmark-dot">.</span>
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
