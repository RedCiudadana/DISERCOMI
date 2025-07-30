import React, { useState, useEffect } from 'react';
import { Shield, X, ExternalLink, Cookie, Info } from 'lucide-react';
import Button from './Button';
import { Link } from 'react-router-dom';

const GDPRBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('gdpr-accepted');
    if (!hasAccepted) {
      // Show after a small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('gdpr-accepted', 'all');
    localStorage.setItem('gdpr-accepted-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('gdpr-accepted', 'necessary');
    localStorage.setItem('gdpr-accepted-date', new Date().toISOString());
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('gdpr-accepted', 'rejected');
    localStorage.setItem('gdpr-accepted-date', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-large">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <Shield size={16} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    Protección de Datos Personales
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    DISERCOMI utiliza cookies y tecnologías similares para mejorar su experiencia, 
                    personalizar contenido y analizar el tráfico. Sus datos personales son procesados 
                    de acuerdo con la legislación guatemalteca y estándares internacionales de protección de datos.
                  </p>
                  
                  {showDetails && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 animate-slide-down">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Tipos de cookies que utilizamos:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li className="flex items-center">
                          <Cookie size={12} className="mr-2 text-primary-500" />
                          <strong>Necesarias:</strong> Esenciales para el funcionamiento del sitio
                        </li>
                        <li className="flex items-center">
                          <Cookie size={12} className="mr-2 text-secondary-500" />
                          <strong>Funcionales:</strong> Mejoran la experiencia del usuario
                        </li>
                        <li className="flex items-center">
                          <Cookie size={12} className="mr-2 text-success-500" />
                          <strong>Analíticas:</strong> Nos ayudan a entender cómo usa el sitio
                        </li>
                      </ul>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <Link 
                          to="/privacy" 
                          className="text-primary-600 hover:text-primary-700 flex items-center"
                        >
                          <ExternalLink size={12} className="mr-1" />
                          Política de Privacidad
                        </Link>
                        <Link 
                          to="/terms" 
                          className="text-primary-600 hover:text-primary-700 flex items-center"
                        >
                          <ExternalLink size={12} className="mr-1" />
                          Términos y Condiciones
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Info size={16} className="mr-1" />
                {showDetails ? 'Ocultar detalles' : 'Más información'}
              </button>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReject}
                  className="text-xs whitespace-nowrap"
                >
                  Rechazar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptNecessary}
                  className="text-xs whitespace-nowrap"
                >
                  Solo necesarias
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="text-xs whitespace-nowrap bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                >
                  Aceptar todas
                </Button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleReject}
              className="absolute top-2 right-2 lg:relative lg:top-0 lg:right-0 p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDPRBar;