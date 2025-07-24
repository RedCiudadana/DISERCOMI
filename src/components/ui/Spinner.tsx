import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  type?: 'default' | 'redciudadana';
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md',
  type = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (type === 'redciudadana') {
    return (
      <div className={`${sizeClasses[size]} animate-pulse-soft`}>
        <img 
          src="https://redciudadana.org/assets/img/red/loader.gif" 
          alt="Cargando..."
          className="w-full h-full"
        />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center">
      <div 
        className={`
          ${sizeClasses[size]} 
          border-4 border-government-200 border-t-government-600
          rounded-full animate-spin
        `}
        role="status"
        aria-label="Cargando"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};

export default Spinner;