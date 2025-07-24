import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

interface CardProps {
  image: string;
  "image-bg"?: string;
  title: string;
  description?: string;
  details?: string;
  tags?: string[];
  link?: string;
  linkLabel?: string;
  popup?: boolean;
  date?: string;
}


// ProjectCard: sin modal, muestra toda la info
export const ProjectCard: React.FC<CardProps> = ({ image, title, description, details, tags, link, linkLabel }) => (
  <div className="bg-brand-block border-2 border-brand-block rounded-2xl shadow-2xl flex flex-col items-center justify-between w-[300px] min-h-[340px] max-w-[320px] p-0 relative mx-2">
    <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-full mt-8 mb-2 shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover rounded-full"
        style={{ minHeight: 80, maxHeight: 96 }}
      />
    </div>
    <div className="text-brand-background font-title text-xl md:text-2xl font-bold uppercase leading-tight mb-1 text-center">
      {title}
    </div>
    {description && (
      <div className="text-brand-background/80 text-xs font-mono mb-1 text-center px-2">
        {description}
      </div>
    )}
    {details && (
      <div className="text-brand-background/80 text-xs font-body mb-2 text-center px-2">
        {details}
      </div>
    )}
    {tags && (
      <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 mb-2 w-full px-2">
        {tags.map((tag, idx) => (
          <span key={idx} className="bg-brand-background text-brand-subtitle text-[11px] px-3 py-1 rounded-full font-mono tracking-wide text-center">
            {tag}
          </span>
        ))}
      </div>
    )}
    {link && linkLabel && linkLabel !== "#" && (
      <div className="flex justify-center w-full mt-2 mb-4">
        <Button
          variant="primary"
          style={{ margin: "0 auto", minWidth: 180, fontWeight: 700, fontSize: '1rem', borderRadius: 20 }}
          onClick={() => window.open(link, "_blank")}
        >
          {linkLabel || "Repositorio o Website"}
        </Button>
      </div>
    )}
    <div className="w-full h-2 bg-brand-accent rounded-b-2xl absolute bottom-0 left-0" />
  </div>
);

// ExperienceCard: con modal
export const ExperienceCard: React.FC<CardProps> = ({ image, title, description, details, tags, link, linkLabel }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const modal = open ? ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-2 sm:px-8" onClick={() => setOpen(false)}>
      <div
        className="bg-brand-background rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-2xl relative flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 bg-brand-block rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-brand-accent transition-all duration-200 hover:scale-110"
          style={{ boxShadow: '0 2px 12px #0004' }}
          onClick={() => setOpen(false)}
          aria-label="Cerrar"
        >
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <line x1="8" y1="8" x2="24" y2="24" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
            <line x1="24" y1="8" x2="8" y2="24" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </button>
        <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center overflow-hidden rounded-full mb-6 shadow-lg bg-brand-background">
          <img src={image} alt={title} className="w-full h-full object-cover rounded-full" />
        </div>
        <div className="text-brand-block font-title text-xl sm:text-2xl md:text-3xl font-extrabold uppercase mb-2 text-center tracking-wide">
          {title}
        </div>
        {description && (
          <div className="text-brand-block/80 text-base sm:text-lg font-mono mb-2 text-center">
            {description}
          </div>
        )}
        {details && (
          <div className="text-brand-block text-base sm:text-lg font-body mb-6 text-center leading-relaxed">
            {details}
          </div>
        )}
        {tags && (
          <div className="flex flex-wrap gap-3 justify-center mb-8 w-full">
            {tags.map((tag, idx) => (
              <button
                key={idx}
                className="bg-transparent border-2 border-brand-block text-brand-block font-mono px-4 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-brand-accent hover:text-black transition-all duration-200 cursor-pointer"
                type="button"
                onClick={() => window.location.href = `/projects?tech=${encodeURIComponent(tag.toLowerCase())}`}
                aria-label={`Ver proyectos de ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        {link && linkLabel && linkLabel !== "#" && (
          <div className="flex justify-center w-full mt-2 mb-4">
            <Button
              variant="primary"
              style={{ margin: "0 auto", minWidth: 220, fontWeight: 700, fontSize: '1.1rem', borderRadius: 20 }}
              onClick={() => window.open(link, "_blank")}
            >
              {linkLabel || "Repositorio o Website"}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div
        className="group bg-brand-background border border-brand-block rounded-2xl shadow-2xl flex flex-col items-center w-[320px] min-h-[420px] max-w-[320px] max-h-[420px] p-0 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-3xl relative"
        style={{ minWidth: 320, maxWidth: 320, minHeight: 420, maxHeight: 420 }}
        onClick={() => setOpen(true)}
      >
        <div className="w-full h-40 sm:h-48 md:h-52 flex items-center justify-center overflow-hidden rounded-t-2xl bg-brand-background">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-2xl"
            style={{ minHeight: 120, maxHeight: 208 }}
          />
        </div>
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-2 flex-1">
          {description && (
            <div className="text-brand-block text-xs sm:text-sm font-mono uppercase tracking-wider mb-1">
              {description}
            </div>
          )}
          <div className="text-brand-accent font-title text-lg sm:text-xl font-bold uppercase leading-tight">
            {title}
          </div>
          {tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, idx) => (
                <span key={idx} className="bg-[#232323] text-[#cccccc] text-xs px-3 py-1 rounded-full font-mono tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {modal}
    </>
  );
};