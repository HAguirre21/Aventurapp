import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-[#00A8CC] hover:bg-[#0077B6] text-white shadow-soft hover:shadow-medium',
    secondary: 'bg-[#FFD166] hover:bg-[#ffc533] text-[#343A40] shadow-soft hover:shadow-medium',
    outline: 'border-2 border-[#00A8CC] text-[#00A8CC] hover:bg-[#00A8CC] hover:text-white',
    danger: 'bg-[#EF476F] hover:bg-[#d63d62] text-white shadow-soft hover:shadow-medium',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 rounded-[8px]',
    md: 'px-4 py-2.5 rounded-[8px]',
    lg: 'px-6 py-3.5 rounded-[8px]',
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
