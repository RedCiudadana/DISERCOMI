import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Music2, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <img 
                src="/Logos_Disercomi_WithType_5.png"
                alt="MINECO"
                className="h-12 filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6">
              Dirección de Servicios al Comercio y a la Inversión. 
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/minecogt" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/MINECOGT" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.tiktok.com/@minecogt" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Music2 size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Enlaces Útiles</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/procedures" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Catálogo de Trámites
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Seguimiento de Trámite
                </Link>
              </li>
              <li>
                <Link to="/disercomi" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Acerca de DISERCOMI
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Mapa del Sitio
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Ayuda
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Cuenta</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/bitacora" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Bitácora
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-400">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-400 mr-2 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  8a. Avenida 10-43, Zona 1, Ciudad de Guatemala Guatemala, CA 
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">+502 2412-0200</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-400 mr-2 flex-shrink-0" />
                <span className="text-gray-300">info@disercomi.gob.gt</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} DISERCOMI - Ministerio de Economía de Guatemala. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;