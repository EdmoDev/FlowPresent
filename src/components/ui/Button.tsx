import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all rounded-[var(--border-radius-md)]";
  
  const variantStyles = {
    primary: "bg-[#2D68FF] hover:bg-[#2D68FF]/90 text-white",
    secondary: "bg-black/5 text-text-primary border border-[var(--border-subtle)] hover:bg-black/10",
    glass: "border-[1.5px] border-[var(--border-subtle)] bg-button-gradient text-text-secondary hover:text-text-primary backdrop-blur-glass",
    outline: "border border-[var(--border-subtle)] text-text-secondary hover:bg-black/5"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5 font-['JetBrains Mono'] tracking-[-0.02em]",
    md: "text-sm px-4 py-2 gap-2 font-['JetBrains Mono'] tracking-[-0.02em]",
    lg: "text-base px-5 py-2.5 gap-2.5 font-['JetBrains Mono'] tracking-[-0.02em]"
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};

export default Button;
