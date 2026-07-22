import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "font-body text-xs tracking-[2px] font-bold uppercase inline-flex shrink-0 items-center justify-center border transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-gold text-charcoal border-gold hover:bg-gold-hover hover:border-gold-hover",
        outline: "border-border bg-transparent text-primary-text hover:border-gold hover:text-gold",
        secondary: "bg-surface-elevated text-primary-text border-border hover:bg-surface hover:text-primary-text",
        ghost: "border-transparent bg-transparent text-primary-text hover:text-gold",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-gold underline-offset-4 hover:underline border-transparent bg-transparent",
      },
      size: {
        default: "h-[50px] px-7 gap-2",
        sm: "h-[40px] px-5 gap-1.5 text-[10px] tracking-[2px]",
        lg: "h-[56px] px-9 gap-2.5 text-xs tracking-[2.5px]",
        icon: "size-[50px]",
        "icon-sm": "size-[40px]",
        "icon-lg": "size-[56px]",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  fullWidth,
  loading,
  asChild,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants> & { loading?: boolean; fullWidth?: boolean; asChild?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      render={asChild ? undefined : undefined}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
        </svg>
      ) : (
        props.children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
