import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactElement;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth = false, className = '', ...props }, ref) => {
    const baseStyles = "glass-input text-text-primary placeholder:text-text-secondary";
    const errorStyles = error ? "border-red-500 focus:ring-red-500" : "";
    const widthStyles = fullWidth ? "w-full" : "";
    const combinedStyles = `${baseStyles} ${errorStyles} ${widthStyles} ${className}`;
    
    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              {React.cloneElement(icon, { 
                className: `w-5 h-5 text-text-secondary ${icon.props.className || ''}`
              })}
            </div>
          )}
          
          <input
            ref={ref}
            className={`${combinedStyles} ${icon ? 'pl-10' : ''}`}
            {...props}
          />
        </div>
        
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;