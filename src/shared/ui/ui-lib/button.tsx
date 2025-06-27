import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        branding:
          "bg-branding-primary-default text-black shadow-xl hover:bg-branding-primary-hover border border-border-button",
        destructive:
          "bg-destructive text-black shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-border-button bg-transparent text-black shadow-xs hover:bg-branding-primary-hover dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-branding-secondary-default text-black shadow-xs hover:bg-branding-secondary-hover border-button",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-[8px]",
        sm: "h-8 rounded-[8px] gap-1.5 px-3",
        lg: "h-10 rounded-[8px] px-6",
        icon: "w-10 h-10 rounded-[8px]",
      },
    },
    defaultVariants: {
      variant: "branding",
      size: "default",
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      children,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        className={cn(
          buttonVariants({ variant, size }),
          className,
        )}
        ref={ref}
        {...props}
      >
        {leftIcon}
        <Slottable>{children}</Slottable>
        {rightIcon}
      </Component>
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants, Button };
export type { ButtonProps };
