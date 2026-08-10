import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({
  id,
  label,
  error,
  className = "",
  disabled,
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-body-small font-medium text-foreground">
          {label}
        </label>
      ) : null}

      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        className={[
          "h-11 w-full rounded-medium border bg-surface px-3 text-body text-foreground",
          "placeholder:text-muted",
          "transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:border-accent",
          "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60",
          error ? "border-danger" : "border-border",
          className,
        ].join(" ")}
        {...props}
      />

      {error ? (
        <p id={inputId ? `${inputId}-error` : undefined} className="text-caption text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
