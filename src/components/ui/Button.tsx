import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-primary/30",
  secondary:
    "border border-border bg-surface text-foreground hover:bg-surface-muted focus-visible:ring-primary/20",
  ghost:
    "bg-transparent text-foreground hover:bg-surface-muted focus-visible:ring-primary/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-body-small",
  md: "h-11 px-4 text-body-small",
  lg: "h-12 px-6 text-body",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center rounded-medium font-semibold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
