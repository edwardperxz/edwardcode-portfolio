import React, { useState, useEffect } from "react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws, FaGit, FaGitlab, FaFigma, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiSass, SiStorybook, SiDjango, SiFastapi, SiPostgresql, SiSqlite, SiMysql, SiSupabase, SiFirebase, SiRedis, SiRender, SiVercel, SiPythonanywhere, SiGithubactions, SiNotion, SiJira, SiShortcut, SiPostman } from "react-icons/si";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Card from "../components/Card";
import { useTranslation } from "react-i18next";

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
  { id: "section1", labelKey: "sections.section1.title" },           // Home
  { id: "technologies", labelKey: "sections.technologies.title" },   // Tech stack
  { id: "experience", labelKey: "sections.experience.title" },       // Experiencia profesional
  { id: "projects", labelKey: "sections.projects.title" },           // Proyectos realizados
  { id: "about", labelKey: "sections.about.title" },                 // Sobre mí
  { id: "contact", labelKey: "sections.contact.title" },             // Contáctame
];

const Home: React.FC = () => {
  const { t } = useTranslation();


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


  type ExpBgType = 'proactive' | 'ayudinga';
  const [expBg, setExpBg] = useState<ExpBgType>('proactive');

  // Función para scroll suave
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

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
				<div id="section1" ref={getSectionRef("section1")} className="scroll-mt-20 w-full flex justify-center items-center px-2 bg-black">
  <section className="w-full min-h-screen flex flex-col justify-center items-center bg-black py-8 md:py-16 text-center relative">
    {/* Título principal */}
    <h1 className="font-title text-4xl md:text-6xl font-extrabold mb-4 text-brand-accent text-center z-10">
      {t("sections.section1.title")}
    </h1>
    {/* Descripción corta */}
    <p className="font-outfit text-base md:text-2xl text-brand-block mb-6 text-center max-w-xl z-10">
      {t("role")}
    </p>
    {/* Disponible */}
    <p className="font-outfit text-sm md:text-lg text-green-400 mb-4 text-center z-10">
      {t("available")}
    </p>
    {/* CTA */}
    <Button
      onClick={scrollToProjects}
      className="inline-block bg-brand-accent text-black font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition w-full max-w-xs md:max-w-md"
    >
      {t("cta")}
    </Button>
  </section>
</div>
				{/* Tecnologías */}
		<div id="technologies" ref={getSectionRef("technologies")} className="scroll-mt-20 w-full flex justify-center items-center px-2">
  <section className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-background py-10 md:py-24 text-center">
    <h2 className="font-title text-5xl font-bold mb-16 text-white text-center tracking-tight drop-shadow-lg">Tech Stack</h2>
    <div className="w-full flex flex-col gap-10">
      {/* Frontend */}
      <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col gap-6 backdrop-blur-sm">
        <h3 className="font-title text-2xl font-bold text-brand-accent mb-2 flex items-center gap-2 tracking-wide">Frontend</h3>
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
        <h3 className="font-title text-2xl font-bold text-brand-accent mb-2 flex items-center gap-2 tracking-wide">Backend</h3>
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
        <h3 className="font-title text-2xl font-bold text-brand-accent mb-2 flex items-center gap-2 tracking-wide">Bases de Datos y Almacenamiento</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          <TechItem icon="postgresql" label="PostgreSQL" />
          <TechItem icon="sqlite" label="SQLite" />
          <TechItem icon="mysql" label="MySQL" />
          <TechItem icon="supabase" label="Supabase" />
          <TechItem icon="firebase" label="Firebase" />
          <TechItem icon="redis" label="Redis" />
        </div>
      </div>
      {/* Cloud & DevOps */}
      <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col gap-6 backdrop-blur-sm">
        <h3 className="font-title text-2xl font-bold text-brand-accent mb-2 flex items-center gap-2 tracking-wide">Cloud & DevOps</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          <TechItem icon="aws" label="AWS" />
          <TechItem icon="docker" label="Docker" />
          <TechItem icon="render" label="Render" />
          <TechItem icon="vercel" label="Vercel" />
          <TechItem icon="pythonanywhere" label="PythonAnywhere" />
          <TechItem icon="githubactions" label="Actions" />
        </div>
      </div>
      {/* Herramientas */}
      <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl p-8 flex flex-col gap-6 backdrop-blur-sm">
        <h3 className="font-title text-2xl font-bold text-brand-accent mb-2 flex items-center gap-2 tracking-wide">Control de Versiones y Herramientas</h3>
        <div className="flex flex-wrap gap-6 justify-center">
          <TechItem icon="git" label="Git" />
          <TechItem icon="gitlab" label="GitLab" />
          <TechItem icon="figma" label="Figma" />
          <TechItem icon="notion" label="Notion" />
          <TechItem icon="jira" label="Jira" />
          <TechItem icon="shortcut" label="Shortcut" />
          <TechItem icon="postman" label="Postman" />
        </div>
      </div>
    </div>
  </section>
</div>
				{/* Experiencia */}
<div ref={getSectionRef("experience")} id="experience" className="scroll-mt-20 w-full min-h-screen flex flex-col justify-center items-center bg-brand-background px-2">
  <div className="w-full min-h-screen flex flex-col justify-start items-center bg-brand-background py-10 md:py-0">
    {/* Fondo superior con imagen dinámica */}
    <div className="w-full h-[54vh] relative flex items-center justify-center overflow-hidden">
      <img
        src={expBg === 'proactive'
          ? 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
          : 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80'}
        alt="Fondo experiencia"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 transition-all duration-500"
        style={{ filter: 'brightness(0.7) blur(0px)' }}
      />
      {/* Degradado entre la imagen y el fondo sólido usando el color de background de Tailwind */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10" style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 100%)'}} />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-16 flex flex-col items-start z-20 max-w-xl">
        <h2 className="font-title text-7xl font-bold mb-4 text-white drop-shadow-lg">PROYECTOS</h2>
        <p className="font-outfit text-lg text-white mb-6 drop-shadow-lg max-w-md">
          Join us for an epic week of hiking, team-bonding and digital detoxing. This month, one-time only, in Kamchatka.
        </p>
        <Button
          variant="primary"
          style={{marginTop: 8}}
          onClick={() => window.open('https://proactivehealth.com', '_blank')}
        >Adventure <span className="text-xl">▶</span></Button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-background/80 via-transparent to-transparent z-5 pointer-events-none" />
    </div>
    {/* Cards alineadas abajo */}
    <div className="w-full flex flex-col items-center justify-center flex-1">
      <div className="flex flex-col md:flex-row gap-12 w-full justify-center items-center pb-8 md:pb-16 z-10">
        {/* Card Proactive */}
        <div
          onClick={() => setExpBg('proactive')}
          className={`cursor-pointer flex items-center justify-center h-full transition-all duration-300 ${expBg === 'proactive' ? 'z-10 -translate-y-8 scale-105 shadow-2xl' : 'z-0 translate-y-0 scale-100'}`}
          style={{ willChange: 'transform' }}
        >
          <Card
            image="/proactive.png"
            title="Proactive Health Technologies"
            description="Telemedicina"
            details="Plataforma SaaS de telemedicina, integración de APIs médicas en tiempo real, optimización de rendimiento con React y Tailwind CSS."
            tags={["React", "Tailwind", "API", "SaaS"]}
            linkLabel="Ver experiencia"
            popup={false}
          />
        </div>
        {/* Card Ayudinga */}
        <div
          onClick={() => setExpBg('ayudinga')}
          className={`cursor-pointer flex items-center justify-center h-full transition-all duration-300 ${expBg === 'ayudinga' ? 'z-10 -translate-y-8 scale-105 shadow-2xl' : 'z-0 translate-y-0 scale-100'}`}
          style={{ willChange: 'transform' }}
        >
          <Card
            image="/ayudinga.png"
            title="Fundación Ayudinga"
            description="Frontend / Scrum"
            details="Desarrollo de componentes escalables, vistas dinámicas y estilos consistentes en equipo Scrum."
            tags={["React", "Scrum", "Frontend"]}
            linkLabel="Ver experiencia"
            popup={false}
          />
        </div>
      </div>
    </div>
  </div>
</div>
				{/* Proyectos */}
		<div ref={getSectionRef("projects")} id="projects" className="scroll-mt-20 w-full flex justify-center items-center px-2">
  <section className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-background py-10 md:py-16 text-center">
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="font-title text-4xl md:text-5xl font-bold mb-4 text-brand-accent">
        {t('sections.projects.title')}
      </h2>
      <p className="font-outfit text-lg md:text-xl text-brand-text mb-8 text-center max-w-2xl">
        {t('sections.projects.description')}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-4xl mb-12 justify-items-center items-center text-center">
        <Card
          image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
          title="Alegator"
          description="Plataforma SaaS para gestionar torneos de debate"
          details="Tecnologías: Next.js, TypeScript, Tailwind CSS, Django, Supabase\nRepositorio GitHub\nJunio 2025"
          tags={["Next.js", "TypeScript", "Tailwind CSS", "Django", "Supabase"]}
          link="https://github.com/edwardperxz/alegator"
          linkLabel="Repositorio GitHub"
        />
        <Card
          image="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
          title="ChobekaBlogs"
          description="Plataforma web para compartir memes (formato red social)"
          details="Tecnologías: Django, HTML, JavaScript, Tailwind CSS, PostgreSQL, Celery, Redis\nVisitar sitio\nMayo 2025"
          tags={["Django", "HTML", "JavaScript", "Tailwind CSS", "PostgreSQL", "Celery", "Redis"]}
          link="https://chobekablogs.com"
          linkLabel="Visitar sitio"
        />
      </div>
      <Button className="bg-brand-accent text-brand-background font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all" onClick={() => window.location.href = '/projects'}>
        Ver todos los proyectos
      </Button>
    </div>
  </section>
</div>
				{/* Sobre mí */}
		<div ref={getSectionRef("about")} id="about" className="scroll-mt-20 w-full flex justify-center items-center px-2">
		  <section className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-background py-10 md:py-16 text-center">
			<div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full max-w-5xl">
			  <div className="bg-brand-background p-4 rounded-2xl border-4 border-brand-block relative flex flex-col items-center justify-center" style={{ minWidth: 320 }}>
				<img src="/edward.jpg" alt="Edward Pérez" className="w-64 h-72 object-cover rounded-xl shadow-lg" />
				<span className="absolute left-0 bottom-4 text-white font-bold text-2xl rotate-[-90deg] tracking-widest" style={{ letterSpacing: '0.2em' }}>EDWARD</span>
			  </div>
			  <div className="flex-1 text-left">
				<h2 className="font-title text-4xl md:text-5xl font-bold mb-4 text-brand-accent">Sobre mí</h2>
				<div className="font-outfit text-lg text-brand-text mb-6 max-w-xl">
				  <span className="font-bold text-brand-accent">💼 Perfil Profesional</span><br/>
				  Desarrollador Full Stack con más de 2 años de experiencia en desarrollo web y UI/UX. Apasionado por la tecnología, el trabajo en equipo y aportar valor real.<br/>
				</div>
				<div className="mb-6">
				  <h3 className="font-title text-xl md:text-2xl font-bold text-brand-accent mb-2">🎓 Educación</h3>
				  <div className="text-brand-text text-base md:text-lg font-outfit">
					<span className="font-bold">Universidad Tecnológica de Panamá</span><br/>
					Licenciatura en Desarrollo y Gestión de Software<br/>
					Chiriquí, Panamá · Mayo 2023 – Actualidad<br/>
					<br/>
					Instructor voluntario en Jóvenes en STEM: Programación en MicroPython, electrónica básica y ESP8266.
				  </div>
				</div>
				<div>
				  <h3 className="font-title text-xl md:text-2xl font-bold text-brand-accent mb-2">📜 Certificados</h3>
				  <div className="text-brand-text text-base md:text-lg font-outfit">
					Certificado en Gestión de Proyectos y Metodología Ágil<br/>
					Dell Volunteers Project Management Program · Mayo 2024 <a href="#" className="text-brand-accent underline">Ver certificado</a>
				  </div>
				</div>
			  </div>
			</div>
		  </section>
		</div>
				{/* Contáctame */}
		<div ref={getSectionRef("contact")} id="contact" className="scroll-mt-20 w-full flex justify-center items-center px-2">
<section className="w-full min-h-screen flex flex-col justify-center items-center bg-brand-accent py-10 md:py-16 text-center">
	<h2 className="font-title text-3xl md:text-5xl font-bold mb-8 text-brand-background">CONTÁCTAME</h2>
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