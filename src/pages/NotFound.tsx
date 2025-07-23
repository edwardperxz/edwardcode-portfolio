import React from "react";

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#181818",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        padding: "0 16px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(3rem, 10vw, 7rem)",
          fontWeight: 900,
          letterSpacing: "0.04em",
          marginBottom: 24,
          textShadow: "0 4px 32px #0008",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 16,
          letterSpacing: 1,
        }}
      >
        Esta página no existe
      </h2>
      <p
        style={{
          color: "#ccc",
          fontSize: 18,
          fontWeight: 400,
          marginBottom: 32,
          maxWidth: 420,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Lo sentimos, la página que buscas no se encuentra disponible o ha sido
        movida.
      </p>
      <a
        href="/"
        style={{
          background: "#ff6b1b",
          color: "#fff",
          borderRadius: 24,
          padding: "12px 32px",
          fontWeight: 600,
          fontSize: 18,
          textDecoration: "none",
          boxShadow: "0 2px 12px #ff6b1b44",
          transition: "background 0.2s",
          display: "inline-block",
        }}
      >
        Volver al inicio
      </a>
    </div>
  );
};

export default NotFound;