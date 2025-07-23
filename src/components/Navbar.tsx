import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  // Estado para mostrar/ocultar navbar según scroll
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 80) {
        setVisible(false); // Oculta al bajar
      } else {
        setVisible(true); // Muestra al subir
      }
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // Links para mobile (secciones de Home.tsx) en el orden solicitado
  const links = [
    { label: t("sections.section1.title"), href: "#section1" },         // Home
    { label: t("sections.technologies.title"), href: "#technologies" }, // Tech stack
    { label: t("sections.experience.title"), href: "#experience" },     // Experiencia profesional
    { label: t("sections.projects.title"), href: "#projects" },         // Proyectos realizados
    { label: t("sections.about.title"), href: "#about" },               // Sobre mí
    { label: t("sections.contact.title"), href: "#contact" },           // Contáctame
  ];

  // Navegación suave a la sección
  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const FlagBar: React.FC<{ type: "en" | "es" }> = ({ type }) => (
    <svg width="112" height="40" viewBox="0 0 112 40" className="absolute left-0 top-0 w-full h-full rounded-full">
      {type === "en" ? (
        <>
          <rect y="0" width="112" height="13.33" fill="#143C6B" />
          <rect y="13.33" width="112" height="13.34" fill="#fff" />
          <rect y="26.67" width="112" height="13.33" fill="#C8102E" />
        </>
      ) : (
        <>
          <rect y="0" width="112" height="13.33" fill="#C8102E" />
          <rect y="13.33" width="112" height="13.34" fill="#FFD600" />
          <rect y="26.67" width="112" height="13.33" fill="#C8102E" />
        </>
      )}
    </svg>
  );

  const LanguageSwitchBar: React.FC<{ value: string; onChange: (lang: string) => void }> = ({ value, onChange }) => (
    <div className="flex items-center justify-center gap-4 py-4">
      <span
        className={`text-base font-bold cursor-pointer ${value === "en" ? "text-brand-accent" : "text-gray-400"}`}
        onClick={() => onChange("en")}
      >
        EN
      </span>
      <div
        className="relative w-28 h-10 rounded-full flex items-center shadow cursor-pointer transition-all duration-300 overflow-hidden"
        style={{ background: "transparent" }}
        onClick={() => onChange(value === "en" ? "es" : "en")}
        aria-label="Cambiar idioma"
      >
        <FlagBar type={value === "en" ? "en" : "es"} />
        <div
          className="absolute top-0 transition-all duration-300"
          style={{
            left: value === "en" ? 0 : 72,
          }}
        >
          <div className="w-10 h-10 bg-brand-accent rounded-full shadow" />
        </div>
      </div>
      <span
        className={`text-base font-bold cursor-pointer ${value === "es" ? "text-brand-accent" : "text-gray-400"}`}
        onClick={() => onChange("es")}
      >
        ES
      </span>
    </div>
  );

  return (
    <nav className={`w-full fixed top-0 left-0 z-[100] px-6 py-4 flex items-center justify-between bg-brand-background shadow-lg transition-transform duration-500 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      {/* Logo SVG */}
      <div className="flex items-center gap-3">
        <img
          src="/favicon.svg"
          alt="Logo"
          className="bg-white w-10 h-10 rounded-xl shadow-lg border-2 border-brand-accent"
        />
        <span className="font-title text-2xl font-bold text-brand-accent tracking-wide select-none hidden md:inline">
          Edward Pérez
        </span>
      </div>
      {/* Botones de contacto en desktop */}
      <div className="hidden md:flex items-center gap-6">
        <a
          href="https://github.com/edwardperxz"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-brand-accent rounded-full px-4 py-2 font-bold text-base transition-all duration-200 hover:bg-brand-accent hover:text-black shadow flex items-center justify-center"
          aria-label="GitHub"
        >
          {/* GitHub icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.418 2.867 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.37-1.342-3.37-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.833.091-.646.349-1.088.635-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.274.098-2.656 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.295 2.748-1.025 2.748-1.025.546 1.382.202 2.402.1 2.656.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.135 20.174 22 16.426 22 12.012 22 6.484 17.523 2 12 2z"/>
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/edwardperxz/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-brand-accent rounded-full px-4 py-2 font-bold text-base transition-all duration-200 hover:bg-brand-accent hover:text-black shadow flex items-center justify-center"
          aria-label="LinkedIn"
        >
          {/* LinkedIn icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.002 3.601 4.604v5.592z"/>
          </svg>
        </a>
        <a
          href="https://wa.me/+50769882300"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-brand-accent rounded-full px-4 py-2 font-bold text-base transition-all duration-200 hover:bg-brand-accent hover:text-black shadow flex items-center justify-center"
          aria-label="WhatsApp"
        >
          {/* WhatsApp icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.004 2c-5.514 0-9.997 4.484-9.997 10 0 1.768.463 3.495 1.341 5.012l-1.406 5.137 5.273-1.384c1.473.805 3.137 1.235 4.789 1.235h.001c5.514 0 9.997-4.484 9.997-10s-4.483-10-9.998-10zm0 18.182c-1.497 0-2.963-.393-4.242-1.137l-.304-.18-3.129.822.835-3.049-.197-.314c-.818-1.304-1.25-2.797-1.25-4.324 0-4.411 3.584-8.004 7.997-8.004 4.412 0 7.997 3.593 7.997 8.004 0 4.411-3.585 8.004-7.997 8.004zm4.309-6.197c-.236-.118-1.396-.688-1.613-.767-.217-.079-.375-.118-.533.118-.158.236-.611.767-.749.925-.138.158-.276.177-.512.059-.236-.118-.996-.367-1.897-1.171-.701-.625-1.175-1.397-1.313-1.633-.138-.236-.015-.363.104-.481.107-.106.236-.276.355-.414.119-.138.158-.236.237-.394.079-.158.04-.296-.02-.414-.059-.118-.533-1.287-.729-1.762-.192-.462-.387-.399-.533-.406l-.454-.009c-.158 0-.414.059-.631.276-.217.217-.827.808-.827 1.971s.847 2.285.965 2.444c.118.158 1.668 2.551 4.045 3.478.566.195 1.007.312 1.352.399.568.144 1.085.124 1.494.075.456-.055 1.396-.571 1.594-1.123.197-.552.197-1.025.138-1.123-.059-.098-.217-.157-.454-.276z"/>
          </svg>
        </a>
        <LanguageSwitchBar value={i18n.language} onChange={lang => i18n.changeLanguage(lang)} />
      </div>
      {/* Botón menú hamburguesa solo en mobile */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          className="border-none bg-transparent p-0 m-0 flex items-center cursor-pointer"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect y="7" width="32" height="3" rx="1.5" fill="#fff" />
            <rect y="15" width="32" height="3" rx="1.5" fill="#fff" />
            <rect y="23" width="32" height="3" rx="1.5" fill="#fff" />
          </svg>
        </button>
      </div>
      {/* Menú lateral animado en mobile */}
      <div
        className={`
          fixed top-0 right-0 w-screen h-screen z-[200] flex flex-col items-center justify-center
          bg-brand-background/95 backdrop-blur-2xl
          transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}
        `}
      >
        {/* Fondo oscuro detrás del menú */}
        <div
          className={`
            fixed inset-0 bg-black/40 transition-opacity duration-500
            ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          onClick={() => setMenuOpen(false)}
        />
        {/* Contenido del menú */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-8 right-8 text-4xl font-title transition hover:scale-125 bg-brand-accent text-brand-background rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-brand-block"
            aria-label="Cerrar menú"
            style={{ cursor: "pointer" }}
          >
            ×
          </button>
          <nav>
            <ul className="list-none p-0 m-0">
              {links.map((link, idx) => (
                <li key={idx} className="my-8 text-center relative" style={{ minHeight: "2.5rem" }}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="font-title font-bold transition-colors duration-200 text-3xl text-white hover:text-brand-accent focus:text-brand-accent outline-none group"
                    style={{ letterSpacing: 1, textDecoration: "none" }}
                  >
                    {link.label}
                    <span className="absolute left-1/2 -translate-x-1/2 -top-12 px-4 py-2 rounded-xl bg-brand-block text-white font-title text-base shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      {link.label}
                    </span>
                  </button>
                </li>
              ))}
              <li className="my-8 text-center">
                {/* Language Switcher en menú lateral */}
                <LanguageSwitchBar value={i18n.language} onChange={lang => { i18n.changeLanguage(lang); }} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;