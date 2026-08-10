type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = "", priority = false }: BrandLogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand SVG wordmark
    <img
      src="/brand/logo/kitapix-logo.svg"
      alt="Kitapix"
      width={500}
      height={130}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`h-8 w-auto ${className}`}
    />
  );
}

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand SVG mark
    <img
      src="/brand/logo/kitapix-favicon.svg"
      alt=""
      width={130}
      height={130}
      decoding="async"
      className={`size-8 ${className}`}
      aria-hidden="true"
    />
  );
}
