import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md'
}) => {
  const variantStyles = {
    default: 'bg-background-card border border-[var(--border-subtle)] rounded-xl',
    glass: 'glass-card backdrop-blur-glass',
    elevated: 'bg-background-card border border-[var(--border-subtle)] rounded-xl shadow-card'
  };
  
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  return (
    <div className={`${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-medium text-text-primary font-['JetBrains Mono'] tracking-[-0.02em] ${className}`}>
      {children}
    </h3>
  );
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`mt-4 pt-3 border-t border-[var(--border-subtle)] ${className}`}>
      {children}
    </div>
  );
};

export const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}> = ({ children, className = '', padding = 'md' }) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  
  return (
    <div className={`
      relative bg-background-card rounded-[var(--border-radius-xl)] border border-[var(--border-subtle)]
      shadow-[var(--glass-shadow)] backdrop-blur-[var(--glass-blur)] overflow-hidden
      ${paddingStyles[padding]} ${className}
    `}>
      <div className="absolute inset-0 bg-[var(--glass-gradient)] z-[-1]"></div>
      {children}
    </div>
  );
};
