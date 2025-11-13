import React from "react";

type BrandMarkProps = {
  variant?: "watermark" | "divider" | "inline" | "icon" | "bullet";
  className?: string;
  title?: string;
  alt?: string; // used only for inline
  parallaxRatio?: number; // optional scroll parallax strength for watermark
};

/**
 * Reusable brand emblem component.
 * - watermark: decorative large faded emblem (aria-hidden)
 * - divider: small horizontal accent
 * - inline: accessible inline emblem (img)
 */
export const BrandMark: React.FC<BrandMarkProps> = ({
  variant = "watermark",
  className = "",
  title = "Medialityc Emblem",
  alt = "Medialityc",
  parallaxRatio = 0,
}) => {
  // Simple parallax effect for watermark/icon usage
  const [offset, setOffset] = React.useState(0);
  React.useEffect(() => {
    if (!parallaxRatio) return;
    let rAF: number;
    const handle = () => {
      setOffset(window.scrollY * parallaxRatio);
      rAF = requestAnimationFrame(handle);
    };
    rAF = requestAnimationFrame(handle);
    return () => cancelAnimationFrame(rAF);
  }, [parallaxRatio]);

  if (variant === "inline") {
    return (
      <img
        src="/brand/logo.svg"
        alt={alt}
        title={title}
        className={"inline-block select-none " + className}
        loading="lazy"
        aria-hidden={alt === "" ? true : undefined}
      />
    );
  }
  if (variant === "divider") {
    return (
      <div
        aria-hidden
        className={"flex w-full items-center justify-center my-10 " + className}
      >
        <div className="relative h-8 w-32 opacity-60">
          <img
            src="/brand/logo.svg"
            alt=""
            aria-hidden
            className="object-contain w-full h-full opacity-70 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/30 to-transparent blur" />
        </div>
      </div>
    );
  }
  if (variant === "icon") {
    return (
      <svg
        aria-hidden
        viewBox="0 0 48 48"
        className={"inline-block " + className}
        style={
          parallaxRatio ? { transform: `translateY(${offset}px)` } : undefined
        }
      >
        <circle cx="24" cy="24" r="23" fill="currentColor" fillOpacity={0.08} />
        <path
          d="M24 31.2c3.9 0 7.2-3.27 7.2-7.3 0-4.03-3.3-7.3-7.2-7.3-3.9 0-7.2 3.27-7.2 7.3 0 4.03 3.3 7.3 7.2 7.3Z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (variant === "bullet") {
    return (
      <span
        aria-hidden
        className={
          "inline-flex items-center justify-center rounded-md bg-primary/10 text-primary " +
          (className || "h-6 w-6")
        }
        style={
          parallaxRatio ? { transform: `translateY(${offset}px)` } : undefined
        }
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <circle
            cx="12"
            cy="12"
            r="11"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 16.4c2.4 0 4.4-2.01 4.4-4.48 0-2.47-2-4.48-4.4-4.48s-4.4 2.01-4.4 4.48c0 2.47 2 4.48 4.4 4.48Z"
            fill="currentColor"
          />
        </svg>
      </span>
    );
  }
  // watermark
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none select-none " +
        (className || "absolute inset-0 flex items-center justify-center")
      }
      style={
        parallaxRatio ? { transform: `translateY(${offset}px)` } : undefined
      }
    >
      <img
        src="/brand/logo.svg"
        alt=""
        aria-hidden
        className="w-[760px] max-w-[85%] opacity-[0.045] md:opacity-[0.065] blur-[1px]"
      />
    </div>
  );
};
