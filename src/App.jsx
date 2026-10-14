import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
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

const ScrollWorldScene = lazy(() => import("./ScrollWorldScene.jsx"));

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
  const sceneProgress = useRef({ value: 0 });
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

        page.querySelectorAll("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            y: 38,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          });
        });

        const profileGrid = page.querySelector(".profile-grid");
        const profileHeading = page.querySelector(".profile-identity h2");
        const profilePortrait = page.querySelector(".profile-portrait");
        const profileCopy = page.querySelectorAll(".profile-body > *");
        const profileStats = page.querySelectorAll(".profile-stats > div");
        const hero = page.querySelector(".hero");
        const heroVisual = page.querySelector(".hero-visual-wrap");
        const heroStory = page.querySelector(".hero-story-copy");
        const focusGrid = page.querySelector(".focus-grid");
        const focusSection = page.querySelector(".focus-section");
        const focusTrack = page.querySelector(".focus-track");
        const focusCards = gsap.utils.toArray(".focus-card", page);
        const experienceSection = page.querySelector(".experience-section");
        const experienceInner = page.querySelector(".experience-inner");
        const experienceEntry = page.querySelector(".experience-entry");
        const skillsSection = page.querySelector(".skills-section");
        const skillsGrid = page.querySelector(".skills-grid");
        const skillsTrack = page.querySelector(".skills-track");
        const skillGroups = gsap.utils.toArray(".skill-group", page);
        const contactSection = page.querySelector(".contact-section");
        const contactCopy = page.querySelector(".contact-copy");
        const contactForm = page.querySelector(".contact-form");
        const focusIcons = focusCards
          .map((card) => card.querySelector(".focus-card-top svg"))
          .filter(Boolean);
        const focusTags = focusCards.flatMap((card) =>
          Array.from(card.querySelectorAll(".focus-tags span")),
        );
        const sectionMotion = gsap.matchMedia();
        sectionMotion.add("(min-width: 701px)", () => {
          const heroTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: hero,
              pin: hero,
              start: "top top",
              end: "+=1500",
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          heroTimeline
            .to(
              ".hero-copy",
              { yPercent: -38, autoAlpha: 0, duration: 0.24, ease: "none" },
              0,
            )
            .to(
              heroVisual,
              {
                width: "100vw",
                height: "100svh",
                right: 0,
                scale: 1.045,
                duration: 0.72,
                ease: "none",
              },
              0,
            )
            .to(
              ".hero-index, .hero-side-note, .hero-bottomline, .visual-caption, .visual-stamp",
              { autoAlpha: 0, duration: 0.16, ease: "none" },
              0.12,
            )
            .fromTo(
              heroStory,
              { y: 48, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.4, ease: "none" },
              0.43,
            )
            .to(
              ".hero-visual img",
              { scale: 1.14, duration: 0.8, ease: "none" },
              0.32,
            )
            .to(
              heroStory,
              { y: -36, autoAlpha: 0, duration: 0.25, ease: "none" },
              0.82,
            );

          const profileTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: profileGrid,
              pin: profileGrid,
              start: "top top+=90",
              end: "+=900",
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          profileTimeline
            .fromTo(
              profileHeading,
              { y: 42, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.22, ease: "none" },
              0,
            )
            .fromTo(
              profilePortrait,
              { y: 58, autoAlpha: 0, clipPath: "inset(12% 0 0)" },
              {
                y: 0,
                autoAlpha: 1,
                clipPath: "inset(0% 0 0)",
                duration: 0.42,
                ease: "none",
              },
              0.12,
            )
            .fromTo(
              profileCopy,
              { y: 26, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.42,
                stagger: 0.12,
                ease: "none",
              },
              0.18,
            );

          gsap.fromTo(
            profileStats,
            { y: 22, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".profile-stats",
                start: "top 86%",
                once: true,
              },
            },
          );

          const experienceTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: experienceSection,
            pin: experienceInner,
            start: "top top+=82",
            end: "+=650",
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          });
          experienceTimeline
          .fromTo(
            ".experience-heading h2",
            { x: -60, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.4, ease: "none" },
            0,
          )
          .fromTo(
            experienceEntry,
            { y: 65, autoAlpha: 0, clipPath: "inset(12% 0 0)" },
            {
              y: 0,
              autoAlpha: 1,
              clipPath: "inset(0% 0 0)",
              duration: 0.55,
              ease: "none",
            },
            0.18,
          )
          .fromTo(
            ".experience-symbol",
            { rotation: -90, scale: 0.65 },
            { rotation: 0, scale: 1, duration: 0.35, ease: "none" },
            0.38,
          )
          .fromTo(
            ".experience-footnote",
            { y: 20, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.35, ease: "none" },
            0.45,
          );

          const focusTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: focusSection,
            pin: focusSection,
            start: "top top",
            end: () =>
              `+=${Math.max(
                focusTrack.scrollWidth - focusGrid.clientWidth,
                window.innerHeight * 0.8,
              )}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          });
          focusTimeline
          .fromTo(
            focusTrack,
            { x: 0 },
            {
              x: () => -(focusTrack.scrollWidth - focusGrid.clientWidth),
              duration: 1,
              ease: "none",
            },
            0,
          )
          .fromTo(
            focusCards,
            { scale: 0.88, autoAlpha: 0.55 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.5,
              stagger: 0.14,
              ease: "none",
            },
            0,
          )
          .fromTo(
            focusIcons,
            { rotation: -28, scale: 0.7 },
              {
                rotation: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.12,
                ease: "none",
              },
              0.1,
            )
            .fromTo(
              focusTags,
              { y: 12, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.3,
                stagger: 0.025,
                ease: "none",
              },
              0.14,
            );

          const skillsTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: skillsSection,
              pin: skillsSection,
              start: "top top+=82",
              end: () =>
                `+=${Math.max(
                  skillsTrack.scrollWidth - skillGroups[0].offsetWidth,
                  window.innerHeight * 0.75,
                )}`,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          skillsTimeline
            .fromTo(
              skillsTrack,
              {
                x: () =>
                  Math.max(
                    (skillsGrid.clientWidth - skillGroups[0].offsetWidth) / 2,
                    0,
                  ),
              },
              {
                x: () =>
                  -(
                    skillsTrack.scrollWidth -
                    skillsGrid.clientWidth +
                    Math.max(
                      (skillsGrid.clientWidth - skillGroups[0].offsetWidth) /
                        2,
                      0,
                    )
                  ),
                duration: 1,
                ease: "none",
              },
              0,
            )
            .fromTo(
              skillGroups,
              { y: 16, autoAlpha: 0.55, scale: 0.94 },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.55,
                stagger: 0.16,
                ease: "none",
              },
              0,
            )
            .fromTo(
              skillGroups.map((group) => group.querySelector("h3")),
              { x: -24 },
              { x: 0, duration: 0.38, stagger: 0.14, ease: "none" },
              0.12,
            );

          const contactTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: contactSection,
              start: "top 78%",
              end: "center 48%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });
          contactTimeline
            .fromTo(
              contactCopy,
              { x: -70, autoAlpha: 0 },
              { x: 0, autoAlpha: 1, duration: 0.7, ease: "none" },
              0,
            )
            .fromTo(
              contactForm,
              { x: 70, autoAlpha: 0, clipPath: "inset(0 0 0 12%)" },
              {
                x: 0,
                autoAlpha: 1,
                clipPath: "inset(0 0 0 0)",
                duration: 0.7,
                ease: "none",
              },
              0,
            )
            .fromTo(
              ".contact-orbit--one",
              { rotation: -24, scale: 0.86 },
              { rotation: 0, scale: 1, duration: 1, ease: "none" },
              0,
            )
            .fromTo(
              ".contact-orbit--two",
              { rotation: 32, scale: 1.2 },
              { rotation: 0, scale: 1, duration: 1, ease: "none" },
              0,
            );
        });

        sectionMotion.add("(max-width: 700px)", () => {
          gsap.fromTo(
            [contactCopy, contactForm],
            { y: 34, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.16,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contactSection,
                start: "top 78%",
                once: true,
              },
            },
          );
          gsap.fromTo(
            [profileHeading, profilePortrait, ...profileCopy],
            { y: 32, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: profileGrid,
                start: "top 82%",
                once: true,
              },
            },
          );
          gsap.fromTo(
            profileStats,
            { y: 20, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".profile-stats",
                start: "top 88%",
                once: true,
              },
            },
          );
          gsap.fromTo(
            focusCards,
            { y: 42, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: focusGrid,
                start: "top 84%",
                once: true,
              },
            },
          );
          gsap.fromTo(
            skillGroups,
            { y: 36, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.14,
              ease: "power2.out",
              scrollTrigger: {
                trigger: skillsGrid,
                start: "top 84%",
                once: true,
              },
            },
          );
          gsap.fromTo(
            [contactCopy, contactForm],
            { y: 34, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.7,
              stagger: 0.16,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contactSection,
                start: "top 78%",
                once: true,
              },
            },
          );
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
        ScrollTrigger.create({
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            sceneProgress.current.value = self.progress;
          },
          onRefresh: (self) => {
            sceneProgress.current.value = self.progress;
          },
        });
        return () => sectionMotion.revert();
      },
      page,
    );

    return () => motion.revert();
  }, []);

  return (
    <div className="site-shell" ref={pageRef}>
      <Suspense fallback={null}>
        <ScrollWorldScene progress={sceneProgress} />
      </Suspense>
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
                alt=""
                aria-hidden="true"
                fetchPriority="high"
              />
              <div className="visual-caption">
                <span>SOFTWARE × IA GENERATIVA</span>
                <span>UN RECORRIDO DIGITAL</span>
              </div>
              <div className="visual-stamp" aria-hidden="true">
                <Sparkles size={22} strokeWidth={1.5} />
                <span>
                  Software
                  <br />
                  + IA
                </span>
              </div>
            </div>
            <div className="hero-side-note">
              Construyendo desde dentro{" "}
              <ArrowDown size={14} aria-hidden="true" />
            </div>
          </div>

          <div className="hero-story-copy" aria-hidden="true">
            <p>DISEÑO · INGENIERÍA · INTELIGENCIA ARTIFICIAL</p>
            <h2>
              Ideas que se
              <br />
              convierten en <em>producto.</em>
            </h2>
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
            <div className="profile-identity">
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
            <div className="profile-body">
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
        </section>

        <section className="experience-section" id="experiencia">
          <div className="section-wrap experience-inner">
            <div className="section-label section-label--dark" data-reveal>
              <span>02 / EXPERIENCIA</span>
              <span>ACTUALIDAD</span>
            </div>
            <div className="experience-heading">
              <h2>
                Experiencia <em>profesional</em>
              </h2>
              <p>
                Desarrollo de software e IA generativa en el sector financiero.
              </p>
            </div>
            <article className="experience-entry">
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
            <div className="experience-footnote">
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
            <div className="focus-track">
              {focusAreas.map(
                ({ number, icon: Icon, title, description, tags, className }) => (
                  <article
                    className={`focus-card ${className}`}
                    data-index={number}
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
            <div className="skills-track">
              {skillGroups.map(
                ({ number, icon: Icon, title, description, skills }) => (
                  <article
                    className="skill-group"
                    data-index={number}
                    key={number}
                  >
                    <div className="skill-group-top">
                      <span>{number} / 03</span>
                      <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
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
          <div
            className="contact-orbit contact-orbit--one"
            aria-hidden="true"
          />
          <div
            className="contact-orbit contact-orbit--two"
            aria-hidden="true"
          />
          <div className="section-wrap contact-layout">
            <div className="contact-copy">
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
