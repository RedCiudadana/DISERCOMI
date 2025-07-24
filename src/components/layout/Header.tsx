import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import LoginModal from '../auth/LoginModal';
import { Menu, X, LogOut, User, HelpCircle } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-soft sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="https://mineco.gob.gt/images/logos/Logo_Mineco_2024.png"
                alt="MINECO"
                className="h-12 transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X size={24} className="text-gray-600" />
            ) : (
              <Menu size={24} className="text-gray-600" />
            )}
          </button>

          <nav className={`
            absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto
            bg-white/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none
            shadow-large md:shadow-none border-b border-gray-200 md:border-none
            ${isMenuOpen ? 'block animate-slide-down' : 'hidden'} md:block
            transition-all duration-200
          `}>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 p-4 md:p-0">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-government-600 font-medium px-3 py-2 rounded-lg hover:bg-government-50 transition-all duration-200"
              >
                Inicio
              </Link>
              <Link 
                to="/process-flow" 
                className="text-gray-700 hover:text-government-600 font-medium px-3 py-2 rounded-lg hover:bg-government-50 transition-all duration-200"
              >
                Proceso
              </Link>
              <Link 
                to="/disercomi" 
                className="text-gray-700 hover:text-government-600 font-medium px-3 py-2 rounded-lg hover:bg-government-50 transition-all duration-200"
              >
                DISERCOMI
              </Link>
              <Link 
                to="/track" 
                className="text-gray-700 hover:text-government-600 font-medium px-3 py-2 rounded-lg hover:bg-government-50 transition-all duration-200"
              >
                Seguimiento
              </Link>
              <Link 
                to="/support" 
                className="text-gray-700 hover:text-government-600 font-medium flex items-center px-3 py-2 rounded-lg hover:bg-government-50 transition-all duration-200"
              >
                <HelpCircle size={16} className="mr-1" />
                Ayuda
              </Link>
              {user?.role === 'admin' && (
                <>
                  <Link 
                    to="/admin" 
                    className="text-gray-700 hover:text-government-600 font-medium px-3 py-2 rounded-lg hover:bg-government-50 transition-all duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/admin/expediente" 
                    className="text-gray-700 hover:text-government-600 font-medium px-3 py-2 rounded-lg hover:bg-government-50 transition-all duration-200"
                  >
                    Expedientes
                  </Link>
                </>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-government-600 p-2 rounded-xl hover:bg-government-50 transition-all duration-200 group"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-government-500 to-secondary-500 flex items-center justify-center text-white font-semibold shadow-soft group-hover:shadow-medium transition-all duration-200">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-gray-200 py-1 animate-scale-in">
                    <Link
                      to="/admin/profile"
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-government-50 hover:text-government-600 flex items-center transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User size={16} className="mr-3" />
                      Mi Perfil
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-error-50 hover:text-error-600 flex items-center transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button onClick={() => setIsLoginModalOpen(true)} size="md">
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
};

export default Header;