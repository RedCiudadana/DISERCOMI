import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import Button from './Button';
import Input from './Input';

const FeedbackButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setFeedback('');
      setEmail('');
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 bg-[#005bac] text-white px-2 py-6 rounded-l-lg shadow-lg transform hover:translate-x-1 transition-transform z-50"
      >
        <div className="flex flex-col items-center gap-2">
          <MessageSquare size={20} />
          <div className="vertical-text text-sm font-medium whitespace-nowrap [writing-mode:vertical-lr] transform rotate-180">
            Ayúdanos a mejorar
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">¡Gracias por su feedback!</h3>
                <p className="text-gray-500">Su comentario nos ayudará a mejorar nuestros servicios.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Envíenos sus comentarios</h2>
                <p className="text-gray-600 mb-6">
                  Sus comentarios nos ayudan a mejorar nuestros servicios. ¿Qué podemos hacer mejor?
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Correo electrónico (opcional)"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Su comentario
                    </label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={4}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#005bac] focus:ring focus:ring-[#005bac] focus:ring-opacity-50"
                      placeholder="Describa su experiencia o sugerencia..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    isLoading={loading}
                  >
                    Enviar comentario
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;