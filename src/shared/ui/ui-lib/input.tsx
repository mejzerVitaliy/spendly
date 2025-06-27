import * as React from "react"

import { cn } from "@/shared/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  className?: string
  type: "text" | "password" | "email" | "number" | "tel" | "url",
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
}

function Input({ className, leftIcon, rightIcon, type, ...props }: InputProps) {
  return (
    <div className={cn('relative flex items-center gap-2', className)}>
      {leftIcon && <div className="absolute left-4">{leftIcon}</div>}

      <input
        type={type}
        data-slot="input"
        className= {cn(
          "selection:bg-black selection:text-text-secondary dark:bg-input/30 border-border-button flex h-10 w-full min-w-0 rounded-md border bg-background-input px-3 py-1 text-xl shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:outline-none placeholder:text-text-tertiary",
          rightIcon && "pr-10",
          leftIcon && "pl-10",
        )}
        {...props}
      />

      {rightIcon && <div className="absolute right-4">{rightIcon}</div>}
    </div>
  )
}

export { Input }
