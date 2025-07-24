import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]';
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3',
  };
  
  const variantStyles = {
    primary: 'bg-gradient-to-r from-government-600 to-government-700 hover:from-government-700 hover:to-government-800 text-white shadow-soft hover:shadow-medium focus:ring-government-500',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white shadow-soft hover:shadow-medium focus:ring-secondary-500',
    outline: 'border-2 border-government-300 text-government-700 hover:bg-government-50 hover:border-government-400 focus:ring-government-500 bg-white',
    ghost: 'text-government-700 hover:bg-government-50 hover:text-government-800 focus:ring-government-500',
    danger: 'bg-gradient-to-r from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 text-white shadow-soft hover:shadow-medium focus:ring-error-500',
    success: 'bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white shadow-soft hover:shadow-medium focus:ring-success-500'
  };
  
  const widthStyle = fullWidth ? 'w-full' : '';
  
  const loadingOrDisabledStyle = (isLoading || disabled) 
    ? 'opacity-70 cursor-not-allowed transform-none hover:scale-100' 
    : '';

  return (
    <button
      className={`
        ${baseStyle}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${widthStyle}
        ${loadingOrDisabledStyle}
        ${className}
      `}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      ) : null}
      {children}
    </button>
  );
};

export default Button;