import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  label,
  variant = "primary",
  loading = false,
  fullWidth,
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  const baseClass = "relative inline-flex items-center justify-center h-10 px-4 rounded-field body-m transition-colors focus-ring";

  const variantClass: Record<typeof variant, string> = {
    primary: "bg-accent text-[#0E1A16] hover:bg-accentHover active:bg-accentActive",
    secondary: "bg-transparent text-accent border border-accent/50 hover:bg-bg2",
    tertiary: "bg-transparent text-text2 hover:text-text1",
  } as const;

  const disabledClass = disabled || loading ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={clsx(baseClass, variantClass[variant], disabledClass, fullWidth && "w-full", className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span className="absolute inset-x-0 top-0 h-0.5 bg-accent animate-pulse" aria-hidden />}
      <span className={clsx("flex items-center gap-2", loading && "opacity-80")}>{label}</span>
    </button>
  );
};
