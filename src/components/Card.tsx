import React, { useState } from "react";
import Button from "./Button";

interface CardProps {
  image: string;
  title: string;
  description?: string;
  details?: string;
  tags?: string[];
  link?: string;
  linkLabel?: string;
  popup?: boolean;
  date?: string;
}

const Card: React.FC<CardProps> = ({ image, title, description, details, tags, link, linkLabel, popup = true }) => {
  const [open, setOpen] = useState(false);

  if (!popup) {
    // Card tipo "flat" para experiencia, más cuadrada y corta
    return (
      <div className="bg-brand-block border-2 border-brand-block rounded-2xl shadow-2xl flex flex-col items-center justify-between w-[300px] h-[340px] p-0 relative mx-2" style={{minWidth:300, maxWidth:300, minHeight:340, maxHeight:340}}>
        {/* Imagen circular arriba */}
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden rounded-full bg-brand-background mt-8 mb-2 shadow-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-full"
            style={{ minHeight: 80, maxHeight: 96 }}
          />
        </div>
        {/* Título */}
        <div className="text-brand-background font-title text-xl md:text-2xl font-bold uppercase leading-tight mb-1 text-center">
          {title}
        </div>
        {/* Descripción */}
        {description && (
          <div className="text-brand-background/80 text-xs font-mono mb-1 text-center px-2">
            {description}
          </div>
        )}
        {/* Detalles */}
        {details && (
          <div className="text-brand-background/80 text-xs font-body mb-2 text-center px-2">
            {details}
          </div>
        )}
        {/* Tags */}
        {tags && (
          <div className="flex flex-wrap gap-1 justify-center mb-2">
            {tags.map((tag, idx) => (
              <span key={idx} className="bg-brand-background text-brand-subtitle text-[10px] px-2 py-1 rounded-full font-mono tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Línea inferior, color diferente por card */}
        <div className={`w-full h-2 ${linkLabel === "Ver experiencia" ? "bg-brand-accent" : "bg-brand-turquoise"} rounded-b-2xl absolute bottom-0 left-0`} />
      </div>
    );
  }

  // Card con pop-up
  return (
    <>
      <div
        className="group bg-brand-background border border-brand-block rounded-2xl shadow-2xl flex flex-col items-center w-full max-w-xs min-h-[340px] sm:min-h-[380px] md:max-w-sm lg:max-w-md xl:max-w-[320px] p-0 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-3xl relative"
        onClick={() => setOpen(true)}
      >
        <div className="w-full h-40 sm:h-48 md:h-52 bg-[#8D75BA] flex items-center justify-center overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover rounded-t-2xl"
            style={{ minHeight: 120, maxHeight: 208 }}
          />
        </div>
        <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex flex-col gap-2">
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
      {/* Pop-up grande */}
      {open && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-brand-background/90 backdrop-blur-sm px-2 animate-fade-in"
          style={{ animation: 'fadeIn 0.4s cubic-bezier(.4,2,.6,1)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-brand-background border-2 border-brand-block rounded-2xl shadow-2xl p-6 sm:p-10 max-w-xl w-full relative flex flex-col items-center"
            style={{ boxShadow: '0 8px 32px #0008' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-brand-block rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-brand-accent transition-all duration-200 hover:scale-110"
              style={{ boxShadow: '0 2px 12px #0004' }}
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <line x1="8" y1="8" x2="24" y2="24" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
                <line x1="24" y1="8" x2="8" y2="24" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </button>
            <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center overflow-hidden rounded-full mb-6 shadow-lg bg-brand-background">
              <img src={image} alt={title} className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="text-brand-accent font-title text-2xl sm:text-3xl font-extrabold uppercase mb-2 text-center tracking-wide">
              {title}
            </div>
            {description && (
              <div className="text-brand-block text-sm sm:text-base font-mono uppercase tracking-wider mb-3 text-center opacity-90">
                {description}
              </div>
            )}
            {details && (
              <div className="text-brand-block/80 text-base sm:text-lg font-body mb-6 text-center leading-relaxed">
                {details}
              </div>
            )}
            {/* Botón para ir al repositorio o website */}
            {link && (
              <div className="flex justify-center w-full mt-2 mb-4">
                <Button
                  variant="primary"
                  style={{ margin: "0 auto", minWidth: 200, fontWeight: 700, fontSize: '1.1rem' }}
                  onClick={() => window.open(link, "_blank")}
                >
                  {linkLabel || "Ver proyecto"}
                </Button>
              </div>
            )}
            {tags && (
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {tags.map((tag, idx) => (
                  <span key={idx} className="bg-brand-subtitle text-brand-background text-xs px-3 py-1 rounded-full font-mono tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {/* Línea inferior igual que el card exterior */}
            <div className={`w-full h-2 ${linkLabel === "Ver experiencia" ? "bg-brand-accent" : "bg-brand-accent"} rounded-b-2xl absolute bottom-0 left-0`} />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;