import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  // Determine where to redirect after login
  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    let isValid = true;
    const errors = {
      email: '',
      password: ''
    };

    if (!email) {
      errors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    if (!password) {
      errors.password = 'La contraseña es requerida';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login(email, password);
      navigate(from);
    } catch (err) {
      // Error will be handled by the AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <img 
            src="/Logos_Disercomi_WithType_5.png"
            alt="DISERCOMI"
            className="h-16"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Iniciar Sesión
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Acceda a su cuenta de DISERCOMI para gestionar sus trámites
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-large sm:rounded-2xl sm:px-10 border border-gray-200">
          {error && (
            <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-xl animate-slide-down">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-error-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              error={formErrors.email}
              icon={<Mail size={20} className="text-gray-400" />}
              fullWidth
              required
            />

            <div className="relative">
              <Input
                id="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={formErrors.password}
                icon={<Lock size={20} className="text-gray-400" />}
                fullWidth
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center mt-6"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
                  ¿Olvidó su contraseña?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={loading}
              className="shadow-soft hover:shadow-medium"
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  ¿No tiene una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                Crear cuenta nueva
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Credenciales de Demostración
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-soft">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <p className="text-blue-800 font-bold text-lg">
                    Credenciales de Demostración
                  </p>
                </div>
                <p className="text-blue-700 font-medium mb-4 text-base">
                  Para acceder al sistema, utilice estas credenciales:
                </p>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border-2 border-blue-300 shadow-medium">
                    <p className="text-blue-900 font-bold text-lg mb-1">
                      Email: disercomi@mineco.gob.gt
                    </p>
                    <p className="text-blue-800 font-semibold text-base">
                      Contraseña: disercomi
                    </p>
                  </div>
                </div>
                <p className="text-blue-600 text-sm mt-4 font-medium">
                  💡 Copie y pegue estas credenciales en los campos de arriba
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Al iniciar sesión, acepta nuestros{' '}
            <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
              Términos y Condiciones
            </Link>
            {' '}y{' '}
            <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
              Política de Privacidad
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;