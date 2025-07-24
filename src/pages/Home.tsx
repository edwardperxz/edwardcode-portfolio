// Interfaces para datos de las secciones y cards
interface CardData {
  image: string;
  "image-bg"?: string;
  title: string;
  description: string;
  details: string;
  tags: string[];
  linkLabel: string;
  link: string;
  popup: boolean;
}

interface SectionExperience {
  title: string;
  description: string;
  list: CardData[];
}

interface SectionProjects {
  title: string;
  description: string;
  seeAll: string;
  list: CardData[];
}

interface Education {
  institution: string;
  degree: string;
  location: string;
  date: string;
}

interface Certificate {
  title: string;
  issuer: string;
  date?: string;
  url?: string;
  description?: string;
}

interface SectionAbout {
  title: string;
  description: string;
  education?: Education[];
  certificates?: Certificate[];
}

interface SectionContact {
  title: string;
  description: string;
  form: {
    name: string;
    email: string;
    message: string;
    send: string;
  };
}

interface Technologies {
  title: string;
  description: string;
  frontendTitle: string;
  backendTitle: string;
  databaseTitle: string;
  toolsTitle: string;
  tools: string[];
}

interface Sections {
  section1: {
    role: string;
    title: string;
    "title-menu": string;
    description: string;
  };
  technologies: Technologies;
  projects: SectionProjects;
  experience: SectionExperience;
  about: SectionAbout;
  contact: SectionContact;
}

import React, { useState, useEffect } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws, FaGit, FaGitlab, FaFigma, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiSass, SiStorybook, SiDjango, SiFastapi, SiPostgresql, SiSqlite, SiMysql, SiSupabase, SiFirebase, SiRedis, SiRender, SiVercel, SiPythonanywhere, SiGithubactions, SiNotion, SiJira, SiShortcut, SiPostman } from "react-icons/si";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { ProjectCard, ExperienceCard } from "../components/Card";
import { useTranslation } from 'react-i18next';

// Componente para cada tecnología
const techIcons = {
  html: <FaHtml5 className="w-8 h-8 text-[#e34f26]" />,
  css: <FaCss3Alt className="w-8 h-8 text-[#1572b6]" />,
  js: <FaJs className="w-8 h-8 text-[#f7df1e]" />,
  typescript: <SiTypescript className="w-8 h-8 text-[#3178c6]" />,
  react: <FaReact className="w-8 h-8 text-[#61dafb]" />,
  nextjs: <SiNextdotjs className="w-8 h-8 text-white" />,
  tailwind: <SiTailwindcss className="w-8 h-8 text-[#38bdf8]" />,
  sass: <SiSass className="w-8 h-8 text-[#cc6699]" />,
  storybook: <SiStorybook className="w-8 h-8 text-[#ff4785]" />,
  nodejs: <FaNodeJs className="w-8 h-8 text-[#339933]" />,
  python: <FaPython className="w-8 h-8 text-[#3776ab]" />,
  java: <FaJava className="w-8 h-8 text-[#007396]" />,
  django: <SiDjango className="w-8 h-8 text-[#092e20]" />,
  fastapi: <SiFastapi className="w-8 h-8 text-[#009688]" />,
  postgresql: <SiPostgresql className="w-8 h-8 text-[#336791]" />,
  sqlite: <SiSqlite className="w-8 h-8 text-[#003b57]" />,
  mysql: <SiMysql className="w-8 h-8 text-[#4479a1]" />,
  supabase: <SiSupabase className="w-8 h-8 text-[#3ecf8e]" />,
  firebase: <SiFirebase className="w-8 h-8 text-[#ffca28]" />,
  redis: <SiRedis className="w-8 h-8 text-[#dc382d]" />,
  aws: <FaAws className="w-8 h-8 text-[#ff9900]" />,
  docker: <FaDocker className="w-8 h-8 text-[#2496ed]" />,
  render: <SiRender className="w-8 h-8 text-[#0099e5]" />,
  vercel: <SiVercel className="w-8 h-8 text-white" />,
  pythonanywhere: <SiPythonanywhere className="w-8 h-8 text-[#306998]" />,
  githubactions: <SiGithubactions className="w-8 h-8 text-[#2088ff]" />,
  git: <FaGit className="w-8 h-8 text-[#f05032]" />,
  gitlab: <FaGitlab className="w-8 h-8 text-[#fc6d26]" />,
  figma: <FaFigma className="w-8 h-8 text-[#f24e1e]" />,
  notion: <SiNotion className="w-8 h-8 text-white" />,
  jira: <SiJira className="w-8 h-8 text-[#0052cc]" />,
  shortcut: <SiShortcut className="w-8 h-8 text-[#5e6ad2]" />,
  postman: <SiPostman className="w-8 h-8 text-[#ff6c37]" />,
};

type TechItemProps = {
  icon: keyof typeof techIcons;
  label: string;
};

function TechItem({ icon, label }: TechItemProps) {
  return (
  <div className="flex flex-col items-center gap-1 w-16">
    {techIcons[icon] || <span className="w-8 h-8 mb-1" />}
    <span className="text-xs text-white font-mono text-center whitespace-nowrap">{label}</span>
  </div>
  );
}

// Clases de color para los puntos de scroll según la nueva paleta
const scrollSections = [
  { id: "section1", labelKey: "sections.section1.title-menu" },
  { id: "technologies", labelKey: "sections.technologies.title" },
  { id: "projects", labelKey: "sections.projects.title" },
  { id: "experience", labelKey: "sections.experience.title" },
  { id: "about", labelKey: "sections.about.title" },
  { id: "contact", labelKey: "sections.contact.title" },
];

const Home: React.FC = () => {
  const { t } = useTranslation();
  // Datos dinámicos de cada sección
  const section1 = t('sections.section1', { returnObjects: true }) as Sections['section1'];
  const tech = t('sections.technologies', { returnObjects: true }) as Sections['technologies'];
  const projects = t('sections.projects', { returnObjects: true }) as SectionProjects;
  const experience = t('sections.experience', { returnObjects: true }) as SectionExperience;
  const about = t('sections.about', { returnObjects: true }) as SectionAbout;
  const contact = t('sections.contact', { returnObjects: true }) as SectionContact;


  // Refs para scroll
  const sectionIds = React.useMemo(
  () => ["section1", "experience", "technologies", "projects", "about", "contact"] as const,
  []
  );
  type SectionId = typeof sectionIds[number];
  const refsArray = React.useMemo(
  () => sectionIds.map(() => React.createRef<HTMLDivElement>()),
  [sectionIds]
  );
  const getSectionRef = (id: SectionId) => {
  const idx = sectionIds.indexOf(id);
  return refsArray[idx];
  };

  const [hovered, setHovered] = useState<string | null>(null);

  // Scroll automático
  const scrollToSection = (id: SectionId) => {
  getSectionRef(id).current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  };

  // Obtener visitas del backend al montar y mostrar en consola
  React.useEffect(() => {
  fetch("/api/visits")
    .then(res => res.json())
    .then(data => {
    if (typeof data.visits === "number") {
      console.log(`Visitas al portfolio: ${data.visits}`);
    }
    })
    .catch(() => {});
  }, []);

  useEffect(() => {
  // Llama al endpoint cada 14 minutos para mantener el backend activo y mostrar en consola
  const interval = setInterval(() => {
    fetch("/api/visits")
    .then(res => res.json())
    .then(data => {
      if (typeof data.visits === "number") {
      console.log(`Visitas al portfolio: ${data.visits}`);
      }
    })
    .catch(() => {});
  }, 840000); // 14 minutos en milisegundos

  return () => clearInterval(interval);
  }, []);


  type PrjBgType = 'alegator' | 'chobekablogs' | 'busnow' | 'livechat';
  const [prjBg, setprjBg] = useState<PrjBgType>('alegator');

  // Función para scroll suave

  return (
    <div className="bg-brand-background min-h-screen w-full max-w-full overflow-x-hidden flex flex-col items-center justify-center">
      <Navbar />
      {/* Scroll points: solo en md+ */}
      <div className="fixed top-1/2 right-2 md:right-8 z-50 md:flex flex-col gap-8 md:gap-12 -translate-y-1/2 pointer-events-none select-none hidden">
    {scrollSections.map((section) => (
      <button
      key={section.id}
      aria-label={t(section.labelKey)}
      onClick={() => scrollToSection(section.id as SectionId)}
      onMouseEnter={() => setHovered(section.id)}
      onMouseLeave={() => setHovered(null)}
      className={`relative group pointer-events-auto select-auto focus:outline-none transition-transform duration-200 ${hovered === section.id ? "scale-115" : "scale-100"}`}
      style={{ background: "none", border: "none" }}
      >
      <span
        className={`block transition-all duration-300 shadow-2xl ${section.id === hovered ? 'bg-brand-accent' : 'bg-brand-white'}`}
        style={{
        width: hovered === section.id ? 44 : 36,
        height: hovered === section.id ? 44 : 36,
        borderRadius: "50%",
        opacity: hovered === section.id ? 1 : 0.85,
        border: hovered === section.id ? "4px solid #fff" : "2px solid #cccccc",
        boxShadow: hovered === section.id ? `0 0 0 12px #3b3b3b, 0 4px 24px #0002` : "0 2px 8px #0001",
        filter: hovered === section.id ? "brightness(1.08)" : "none",
        transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
        }}
      />
      {hovered === section.id && (
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-4 py-2 rounded-xl bg-brand-accent text-black font-title text-base shadow-lg whitespace-nowrap animate-fade-in border border-white pointer-events-none">
        {t(section.labelKey)}
        </span>
      )}
      </button>
    ))}
    </div>
      <main className="overflow-x-hidden w-full flex flex-col items-center justify-center">
        {/* Home */}
        <div id="section1" ref={getSectionRef("section1")} className="scroll-mt-0 w-full flex justify-center items-center px-2 bg-black">
  <section className="w-full min-h-screen flex flex-col justify-center items-center bg-black py-8 md:py-16 text-center relative">
    {/* Título principal */}
    <h1 className="font-title text-4xl md:text-6xl font-extrabold mb-4 text-brand-accent text-center z-10">
      {section1.title}
    </h1>
    {/* Rol */}
    <p className="font-outfit text-base md:text-2xl text-brand-block mb-6 text-center max-w-xl z-10">
      {section1.role}
    </p>
    {/* Disponible */}
    <p className="font-outfit text-sm md:text-lg text-green-400 mb-4 text-center z-10">
      {t("available")}
    </p>
    {/* CTA */}
    <Button
      onClick={() => scrollToSection("contact")}
      className="inline-block bg-brand-accent text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition w-full max-w-xs md:max-w-md"
    >
      {t("cta")}
    </Button>
  </section>
</div>
        {/* Tecnologías */}
    <div id="technologies" ref={getSectionRef("technologies")} className="scroll-mt-0 w-full flex justify-center items-center px-2">
  <section className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-background py-10 md:py-24 text-center">
    <h2 className="font-title text-5xl font-bold mb-16 text-white text-center tracking-tight drop-shadow-lg">{tech.title}</h2>
    <p className="font-outfit text-lg text-brand-text mb-8 text-center max-w-2xl">
      {tech.description}
    </p>
    <div className="w-full flex flex-col gap-10">
      {/* Frontend */}
      <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col gap-6 backdrop-blur-sm">
        <h3 className="font-title text-2xl font-bold text-brand-accent mb-2 flex items-center gap-2 tracking-wide">{tech.frontendTitle}</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          <TechItem icon="html" label="HTML" />
          <TechItem icon="css" label="CSS" />
          <TechItem icon="js" label="JavaScript" />
          <TechItem icon="typescript" label="TypeScript" />
          <TechItem icon="react" label="React" />
          <TechItem icon="nextjs" label="Next.js" />
          <TechItem icon="tailwind" label="Tailwind CSS" />
          <TechItem icon="sass" label="Sass" />
          <TechItem icon="storybook" label="Storybook" />
        </div>
      </div>
      {/* Backend */}
      <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col gap-6 backdrop-blur-sm">
        <h3 className="font-title text-2xl font-bold text-brand-accent mb-2 flex items-center gap-2 tracking-wide">{tech.backendTitle}</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          <TechItem icon="nodejs" label="Node.js" />
          <TechItem icon="python" label="Python" />
          <TechItem icon="java" label="Java" />
          <TechItem icon="django" label="Django" />
          <TechItem icon="fastapi" label="FastAPI" />
        </div>
      </div>
      {/* Bases de Datos */}
      <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col gap-6 backdrop-blur-sm">
        <h3 className="font-title text-2xl font-bold text-brand-accent mb-2 flex items-center gap-2 tracking-wide">{tech.databaseTitle}</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          <TechItem icon="postgresql" label="PostgreSQL" />
          <TechItem icon="sqlite" label="SQLite" />
          <TechItem icon="mysql" label="MySQL" />
          <TechItem icon="supabase" label="Supabase" />
          <TechItem icon="firebase" label="Firebase" />
          <TechItem icon="redis" label="Redis" />
          <TechItem icon="githubactions" label="Actions" />
        </div>
      </div>
      {/* Herramientas */}
      <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col gap-6 backdrop-blur-sm">
        <h3 className="font-title text-2xl font-bold text-brand-accent mb-2 flex items-center gap-2 tracking-wide">{tech.toolsTitle}</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {tech.tools.map(tool => (
            <TechItem key={tool} icon={tool.toLowerCase() as keyof typeof techIcons} label={tool} />
          ))}
        </div>
      </div>
    </div>
  </section>
</div>
        {/* Proyectos */}
<div ref={getSectionRef("projects")} id="projects" className="scroll-mt-0 w-full min-h-screen flex flex-col justify-center items-center bg-brand-background px-2">
  <div className="w-full min-h-screen flex flex-col justify-start items-center bg-brand-background py-10 md:py-0">
    {/* Fondo superior con imagen dinámica */}
    <div className="w-full h-[54vh] relative flex items-center justify-center overflow-hidden">
      {(() => {
        const prjKeys = ['alegator', 'chobekablogs', 'busnow', 'livechat'] as const;
        const idx = prjKeys.indexOf(prjBg);
        const card = projects.list[idx] ?? projects.list[0];
        const bg = card["image-bg"] || card.image;
        return (
          <img
            src={bg}
            alt={card.title + ' background'}
            className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-all duration-500"
            style={{ filter: 'brightness(0.7) blur(0px)' }}
          />
        );
      })()}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10" style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 100%)'}} />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-16 flex flex-col items-start z-20 max-w-xl">
        {(() => {
          // Relacionar prjBg con el índice de la card
          const prjKeys = ['alegator', 'chobekablogs', 'busnow', 'livechat'] as const;
          const idx = prjKeys.indexOf(prjBg);
          const card = projects.list[idx] ?? projects.list[0];
          return <>
            <h2 className="font-title text-7xl font-bold mb-4 text-white drop-shadow-lg">{card.title}</h2>
            <p className="font-outfit text-lg text-white mb-6 drop-shadow-lg max-w-md">{card.details}</p>
            <Button
              variant="primary"
              style={{marginTop: 8}}
              onClick={() => window.open(card.link ?? "#", '_blank')}
            >
              {card.linkLabel} <span className="text-xl">▶</span>
            </Button>
          </>;
        })()}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-background/80 via-transparent to-transparent z-5 pointer-events-none" />
    </div>
    {/* Cards alineadas abajo */}
    <div className="w-full flex flex-col items-center justify-center flex-1 mt-6">
      <div className="w-full max-w-full xl:max-w-[1400px] px-0 sm:px-2 md:px-4 lg:px-8 xl:px-0">
        <div
          className="flex flex-row gap-4 sm:gap-6 md:gap-10 lg:gap-14 xl:gap-16 items-stretch justify-start md:justify-center overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-8 md:pb-16"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {projects.list.map((project, idx) => (
            <div
              key={project.title + idx}
              onClick={() => setprjBg((['alegator', 'chobekablogs', 'busnow', 'livechat'] as const)[idx])}
              className={`cursor-pointer flex items-center justify-center h-full transition-all duration-300 snap-center md:snap-none ${prjBg === (['alegator', 'chobekablogs', 'busnow', 'livechat'] as const)[idx] ? 'z-10 -translate-y-3 md:-translate-y-6 lg:-translate-y-4 scale-105 shadow-2xl' : 'z-0 translate-y-0 scale-100'}`}
              style={{
                willChange: 'transform',
                minWidth: '260px',
                maxWidth: '340px',
                width: 'clamp(260px,28vw,340px)',
              }}
            >
              <ProjectCard
                image={project.image}
                title={project.title}
                description={project.description}
                tags={project.tags}
              />
            </div>
          ))}
        </div>
      </div>
      <Button className="bg-brand-accent text-brand-background font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all mt-2 w-full max-w-xs lg:max-w-sm" onClick={() => window.location.href = '/projects'}>
        Ver todos los proyectos
      </Button>
    </div>
  </div>
</div>
        {/* Experiencias */}
    <div ref={getSectionRef("experience")} id="experience" className="scroll-mt-0 w-full flex justify-center items-center px-2">
  <section className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-background py-10 md:py-16 text-center">
    <div className="flex flex-col items-center justify-center w-full">
    <h2 className="font-title text-4xl md:text-5xl font-bold mb-4 text-brand-accent">
      {experience.title}
    </h2>
    <p className="font-outfit text-lg md:text-xl text-brand-text mb-8 text-center max-w-2xl">
      {experience.description}
    </p>
      {/* Cards de experiencia desde el JSON */}
      <div className="flex flex-col md:flex-row gap-12 w-full justify-center items-center pb-8 md:pb-16 z-10">
        {experience.list.map((exp) => (
          <div
            key={exp.title}
            className="flex-shrink-0"
            style={{
              width: 320,
              minWidth: 320,
              maxWidth: 320,
            }}
          >
            <ExperienceCard {...exp} />
          </div>
        ))}
      </div>
    </div>
  </section>
</div>
        {/* Sobre mí */}
    <div ref={getSectionRef("about")} id="about" className="scroll-mt-0 w-full flex justify-center items-center px-2">
      <section className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-background py-10 md:py-16 text-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-5xl">
        <div className="bg-brand-background p-4 rounded-2xl border-4 border-brand-block relative flex flex-col items-center justify-center" style={{ minWidth: 320 }}>
        <img src="/edward.jpg" alt="Edward Pérez" className="w-64 h-72 object-cover rounded-xl shadow-lg" />
        <span className="absolute left-0 bottom-4 text-white font-bold text-2xl rotate-[-90deg] tracking-widest" style={{ letterSpacing: '0.2em' }}>EDWARD</span>
        </div>
        <div className="flex-1 flex flex-col gap-6 sm:gap-8 text-left w-full">
          <h2 className="font-title text-3xl xs:text-4xl md:text-5xl font-extrabold mb-2 md:mb-4 text-brand-accent leading-tight drop-shadow-lg">{about.title}</h2>
          <div className="font-outfit text-base xs:text-lg md:text-xl text-brand-text mb-2 md:mb-4 max-w-2xl leading-relaxed sm:leading-normal">
            {about.description}
          </div>
          {/* Educación */}
          {Array.isArray(about.education) && about.education.length > 0 && (
            <div className="mb-2 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl md:text-3xl"></span>
                <h3 className="font-title text-lg xs:text-xl md:text-2xl font-bold text-brand-accent">Educación</h3>
              </div>
              <ul className="pl-2 flex flex-col gap-2">
                {about.education.map((edu: Education, idx: number) => (
                  <li key={idx} className="bg-white/5 rounded-xl px-3 py-2 text-brand-text text-sm xs:text-base md:text-lg shadow-sm border-l-4 border-brand-accent">
                    <span className="font-bold text-brand-accent">{edu.institution}</span><br/>
                    <span className="text-brand-text/90">{edu.degree}</span><br/>
                    <span className="text-brand-text/70">{edu.location} · {edu.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Certificados */}
          {Array.isArray(about.certificates) && about.certificates.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl md:text-3xl"></span>
                <h3 className="font-title text-lg xs:text-xl md:text-2xl font-bold text-brand-accent">Certificados</h3>
              </div>
              <ul className="pl-2 flex flex-col gap-2">
                {about.certificates.map((cert: Certificate, idx: number) => (
                  <li key={idx} className="bg-white/5 rounded-xl px-3 py-2 text-brand-text text-sm xs:text-base md:text-lg shadow-sm border-l-4 border-brand-accent">
                    <span className="font-bold text-brand-accent">{cert.title}</span><br/>
                    <span className="text-brand-text/90">{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</span>
                    {cert.url && cert.url !== '#' && (
                      <>
                        {' '}<a href={cert.url} className="text-brand-accent underline ml-1" target="_blank" rel="noopener noreferrer">Ver certificado</a>
                      </>
                    )}
                    {cert.description && (
                      <div className="text-xs xs:text-sm text-brand-text/80 mt-1">{cert.description}</div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      </section>
    </div>
        {/* Contáctame */}
    <div ref={getSectionRef("contact")} id="contact" className="scroll-mt-0 w-full flex justify-center items-center px-2">
<section className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-accent py-10 md:py-16 text-center">
    <h2 className="font-title text-3xl md:text-5xl font-bold mb-8 text-brand-background">{contact.title}</h2>
  <ContactForm accent />
</section>
    </div>
      </main>
    </div>
  );
};

export default Home;

// Formulario de contacto

function ContactForm({ accent = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (res.ok && data.status === "ok") {
        setSuccess("¡Mensaje enviado exitosamente!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError("Hubo un error al enviar el mensaje.");
      }
    } catch {
      setError("Hubo un error al enviar el mensaje.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl mx-auto flex flex-col gap-8 ${accent ? 'bg-brand-accent' : 'bg-brand-background'} p-4 sm:p-8 rounded-2xl border-none shadow-none`}>
      <div className="flex flex-col gap-8 w-full md:flex-row md:gap-8">
        <div className="flex-1 flex flex-col min-w-0">
          <label htmlFor="name" className={`font-bold mb-2 text-left ${accent ? 'text-brand-background' : 'text-white'}`}>NOMBRE *</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className={`bg-transparent border-b-2 border-brand-background ${accent ? 'text-brand-background' : 'text-white'} py-2 px-1 outline-none focus:border-brand-background transition-all`}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0 mt-6 md:mt-0">
          <label htmlFor="email" className={`font-bold mb-2 text-left ${accent ? 'text-brand-background' : 'text-white'}`}>EMAIL *</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`bg-transparent border-b-2 border-brand-background ${accent ? 'text-brand-background' : 'text-white'} py-2 px-1 outline-none focus:border-brand-background transition-all`}
          />
        </div>
      </div>
      <div className="flex flex-col mt-6">
        <label htmlFor="message" className={`font-bold mb-2 text-left ${accent ? 'text-brand-background' : 'text-white'}`}>MENSAJE *</label>
        <textarea
          id="message"
          required
          value={message}
          onChange={e => setMessage(e.target.value)}
          className={`bg-transparent border-2 border-brand-background ${accent ? 'text-brand-background' : 'text-white'} py-2 px-1 outline-none min-h-[100px] focus:border-brand-background transition-all resize-none`}
        />
      </div>
      <div className="flex flex-col items-center mt-4">
        {/* Usa el componente Button para el botón principal */}
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-brand-accent rounded-full px-4 py-2 font-bold text-base transition-all duration-200 w-full min-w-[180px] focus:outline-none flex items-center justify-center hover:bg-brand-accent hover:text-black border border-black"
        >
          {loading ? "Enviando..." : "ENVIAR MENSAJE"}
        </button>
        {success && <span className="text-green-400 mt-4">{success}</span>}
        {error && <span className="text-red-400 mt-4">{error}</span>}
        {/* Botones alternativos abajo */}
        <div className="flex flex-col items-center justify-center mt-4 gap-2">
          {/* "o" centrado arriba */}
          <span className="text-brand-background font-medium text-sm mb-2">o</span>
          <div className="flex flex-row gap-4 justify-center">
            <a
              href="https://wa.me/+50769882300"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-brand-accent rounded-full px-4 py-2 font-medium text-sm transition-all duration-200 hover:bg-brand-accent hover:text-black border border-black flex items-center justify-center"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/edwardperxz/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-brand-accent rounded-full px-4 py-2 font-medium text-sm transition-all duration-200 hover:bg-brand-accent hover:text-black border border-black flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </form>
  );
}