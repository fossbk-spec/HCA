import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-amber-400 text-slate-950 hover:bg-amber-300",
      outline: "border border-slate-300 text-slate-900 hover:bg-slate-100",
      ghost: "text-slate-800 hover:bg-slate-100",
    },
    size: {
      default: "min-h-11 px-5 text-sm",
      sm: "min-h-9 px-4 text-sm",
      lg: "min-h-12 px-7 text-base",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export function Button({ className, variant, size, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
