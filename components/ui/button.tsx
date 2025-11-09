import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { px } from "../utils";

const buttonVariants = cva(
  "inline-flex relative uppercase border font-mono cursor-pointer items-center font-medium has-[>svg]:px-3 justify-center gap-2 whitespace-nowrap font-medium ease-out transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_0,100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,0_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]",
  {
    variants: {
      variant: {
        // Default ahora usa la nueva paleta (primary azul) en el glow y elimina el hex antiguo
        default:
          "bg-background border-primary text-primary-foreground [&>[data-border]]:bg-primary [box-shadow:inset_0_0_54px_0px_var(--tw-shadow-color)] shadow-[#4690dc] hover:shadow-[#4aa7c2]/80",
        // Variante secundaria usando el azul claro
        secondary:
          "bg-secondary border-secondary text-secondary-foreground [&>[data-border]]:bg-secondary shadow-[#4aa7c2] hover:shadow-[#4690dc]/80",
        // Variante accent usando el teal
        accent:
          "bg-accent border-accent text-accent-foreground [&>[data-border]]:bg-accent shadow-[#42a37c] hover:shadow-[#4aa7c2]/70",
        // Variante outline minimalista usando borde primary y fondo transparente
        outline:
          "bg-transparent border-primary text-primary [&>[data-border]]:bg-primary shadow-none hover:bg-primary/10",
      },
      size: {
        default: "h-16 px-6 text-base",
        sm: "h-14 px-6 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  children,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  const polyRoundness = 16;
  const hypotenuse = polyRoundness * 2;
  const hypotenuseHalf = polyRoundness / 2 - 1.5;

  return (
    <Comp
      style={
        {
          "--poly-roundness": px(polyRoundness),
        } as React.CSSProperties
      }
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span
        data-border="top-left"
        style={
          {
            "--h": px(hypotenuse),
            "--hh": px(hypotenuseHalf),
          } as React.CSSProperties
        }
        className="absolute inline-block w-(--h) top-(--hh) left-(--hh) h-0.5 -rotate-45 origin-top -translate-x-1/2"
      />
      <span
        data-border="bottom-right"
        style={
          {
            "--h": px(hypotenuse),
            "--hh": px(hypotenuseHalf),
          } as React.CSSProperties
        }
        className="absolute w-(--h) bottom-(--hh) right-(--hh) h-0.5 -rotate-45 translate-x-1/2"
      />

      <Slottable>{children}</Slottable>
    </Comp>
  );
}

export { Button, buttonVariants };
