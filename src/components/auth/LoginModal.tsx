import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { X, Mail, Lock } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-2xl shadow-large w-full max-w-md max-h-[90vh] overflow-y-auto p-8 relative animate-scale-in border border-gray-200 mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 z-10"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Lock size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="text-gray-600 mt-2">Acceda a su cuenta de DISERCOMI</p>
        </div>

        {error && (
          <div className="mb-4 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-xl animate-slide-down">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            label="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="disercomi@mineco.gob.gt"
            icon={<Mail size={20} className="text-gray-400" />}
            required
            fullWidth
          />

          <Input
            id="password"
            type="password"
            label="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={20} className="text-gray-400" />}
            required
            fullWidth
          />

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
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Credenciales de Demostración
              </span>
            </div>
          </div>

          <div className="mt-4 text-center">
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
    </div>
  );
};

export default LoginModal;