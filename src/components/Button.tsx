import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    border: "2px solid #FFD600",
    borderRadius: 24,
    padding: "12px 32px",
    fontWeight: 700,
    fontSize: 18,
    fontFamily: 'Changa, Outfit, sans-serif',
    cursor: "pointer",
    transition: "all 0.25s cubic-bezier(.4,2,.6,1)",
    boxShadow: "0 6px 32px #FFD60044, 0 2px 12px #007fff44",
    display: "inline-block",
    background: variant === "primary"
      ? "linear-gradient(90deg, #FFD600 0%, #FFF700 100%)"
      : "#232323",
    color: variant === "primary" ? "#232323" : "#FFD600",
    letterSpacing: 1,
    textTransform: "uppercase",
    position: "relative",
    overflow: "hidden",
    ...style,
  };

  const hoverStyle: React.CSSProperties = variant === "primary"
    ? {
        boxShadow: "0 12px 48px #FFD60088, 0 4px 24px #007fff44",
        transform: "scale(1.06)",
        background: "linear-gradient(90deg, #FFF700 0%, #FFD600 100%)",
        cursor: "url('/hand-pointer.svg'), pointer"
      }
    : {
        boxShadow: "0 6px 32px #23232388",
        transform: "scale(1.06)",
        background: "#232323",
        cursor: "url('/hand-pointer.svg'), pointer"
      };

  const [isHover, setIsHover] = React.useState(false);

  return (
    <button
      style={isHover ? { ...baseStyle, ...hoverStyle } : baseStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      {...props}
    >
      <span style={{ position: "relative", zIndex: 2 }}>{children}</span>
    </button>
  );
};

export default Button;