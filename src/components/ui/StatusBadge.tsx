import React from 'react';
import { ProcedureStatus } from '../../types';

interface StatusBadgeProps {
  status: ProcedureStatus;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const statusConfig = {
    received: {
      label: 'Recibido',
      color: 'bg-gradient-to-r from-government-100 to-government-200 text-government-800 border border-government-300',
    },
    in_review: {
      label: 'En revisión',
      color: 'bg-gradient-to-r from-warning-100 to-warning-200 text-warning-800 border border-warning-300',
    },
    approved: {
      label: 'Aprobado',
      color: 'bg-gradient-to-r from-success-100 to-success-200 text-success-800 border border-success-300',
    },
    rejected: {
      label: 'Rechazado',
      color: 'bg-gradient-to-r from-error-100 to-error-200 text-error-800 border border-error-300',
    },
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const config = statusConfig[status];

  return (
    <span 
      className={`
        ${config.color} 
        ${sizeClasses[size]} 
        rounded-full font-semibold inline-flex items-center justify-center shadow-soft
        animate-scale-in
      `}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;