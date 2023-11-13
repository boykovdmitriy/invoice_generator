import React from "react";
import clsx from "clsx";

type ButtonProps<T extends React.ElementType = "button"> =
  React.ComponentPropsWithRef<T> & {
    variant?: "green" | "blue" | "red";
    size?: "sm" | "md" | "lg";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
    component?: T;
  };

const Button = <T extends React.ElementType = "button">({
  variant = "green",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  className,
  children,
  component: Component = "button",
  ...props
}: ButtonProps<T>) => {
  const baseStyle =
    "font-medium rounded-md focus:outline-none transition ease-in-out duration-150";
  const sizeStyle = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  } as const;

  const colorStyle = {
    green: "bg-green-500 hover:bg-green-600 text-white",
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
  };

  const buttonClass = clsx(
    baseStyle,
    sizeStyle[size],
    colorStyle[variant],
    disabled ? "opacity-50 cursor-not-allowed" : "hover:shadow-md",
    className
  );

  return (
    <Component
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
