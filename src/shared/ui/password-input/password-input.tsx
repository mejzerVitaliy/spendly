'use client'

import { EyeClosedIcon, EyeIcon } from "lucide-react"
import { Input } from "../ui-lib"
import { useState } from "react";

const PasswordInput = ({ className, ...props }: Omit<React.ComponentProps<"input">, "type">) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(currentState => !currentState);

  const type = isPasswordVisible ? 'text' : 'password';
  const Icon = isPasswordVisible ? EyeClosedIcon : EyeIcon;

  return (
    <Input
      className={className}
      type={type} 
      {...props} 
      rightIcon={
        <Icon
          className="cursor-pointer"
          onClick={togglePasswordVisibility}
        />
      }
    />
  )
}

export {PasswordInput}