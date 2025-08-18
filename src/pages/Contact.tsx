import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, Building } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Hero from '../components/ui/Hero';

const Contacto: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
 
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = 'El asunto es requerido';
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'El mensaje es requerido';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    if (!validateForm()) return;

    setIsSubmitting(true);
   
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
   
    setIsSubmitting(false);
    setIsSubmitted(true);
   
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <>
      <Hero
        title="¡Contáctanos!"
        subtitle="Estamos aquí para escucharte y ayudarte en todo lo que podamos"
        image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
      />
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              En DISERCOMI, nos esforzamos por mantener una interacción abierta y accesible con nuestros usuarios.
              Si tienes alguna pregunta, comentario o necesitas asistencia, no dudes en ponerte en contacto con nosotros.
              Estamos aquí para escucharte y ayudarte en todo lo que podamos.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Puedes contactarnos utilizando la información proporcionada a continuación. Ya sea a través del teléfono,
              correo electrónico o visitándonos en nuestra ubicación, estamos disponibles para atenderte.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Apreciamos la oportunidad de servirte y esperamos poder satisfacer tus necesidades de la mejor manera posible.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Información de Contacto</h2>
           
            <div className="space-y-8">
              {/* Address */}
              <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Dirección</h3>
                    <p className="text-gray-600 leading-relaxed">
                      8 avenida 10-43 zona 1, 3 Nivel<br />
                      Ciudad de Guatemala, Guatemala
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Teléfono</h3>
                    <p className="text-gray-600 mb-2">
                      <a href="tel:+50224120200" className="text-primary-600 hover:text-primary-700 font-medium">
                        +502 2412-0200 Ext. 3101
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      Línea directa para consultas y soporte
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-success-500 to-success-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Horarios de Atención</h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Lunes a Viernes:</strong> 8:00 AM - 4:00 PM
                    </p>
                    <p className="text-sm text-gray-500">
                      Atención presencial y telefónica
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-warning-500 to-warning-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Correo Electrónico</h3>
                    <p className="text-gray-600 mb-2">
                      <a href="mailto:info@disercomi.gob.gt" className="text-primary-600 hover:text-primary-700 font-medium">
                        info@disercomi.gob.gt
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">
                      Respuesta en 24-48 horas hábiles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:+50224120200"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium"
              >
                <Phone size={20} className="mr-2" />
                Llamar Ahora
              </a>
              <a
                href="mailto:info@disercomi.gob.gt"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-300 text-primary-700 hover:bg-primary-50 hover:border-primary-400 font-semibold rounded-xl transition-all duration-200"
              >
                <Mail size={20} className="mr-2" />
                Enviar Email
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-3">
                  <MessageSquare size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Envíanos un Mensaje</h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-gray-600">
                    Gracias por contactarnos. Te responderemos pronto.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      id="name"
                      name="name"
                      label="Nombre Completo"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={formErrors.name}
                      icon={<User size={20} className="text-gray-400" />}
                      required
                      fullWidth
                    />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      label="Correo Electrónico"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={formErrors.email}
                      icon={<Mail size={20} className="text-gray-400" />}
                      required
                      fullWidth
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      id="company"
                      name="company"
                      label="Empresa (Opcional)"
                      value={formData.company}
                      onChange={handleInputChange}
                      icon={<Building size={20} className="text-gray-400" />}
                      fullWidth
                    />

                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      label="Teléfono (Opcional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                      icon={<Phone size={20} className="text-gray-400" />}
                      placeholder="+502 XXXX-XXXX"
                      fullWidth
                    />
                  </div>

                  <Input
                    id="subject"
                    name="subject"
                    label="Asunto"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={formErrors.subject}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    fullWidth
                  />

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-soft ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 focus:shadow-medium transition-all duration-200"
                      placeholder="Describe tu consulta o comentario..."
                      required
                    />
                    {formErrors.message && (
                      <p className="mt-2 text-sm text-error-600 animate-slide-down">{formErrors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    className="shadow-soft hover:shadow-medium"
                  >
                    <Send size={20} className="mr-2" />
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-200 animate-fade-in">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">¿Necesitas Ayuda Inmediata?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Si tienes una consulta urgente sobre un trámite en proceso, puedes usar nuestro sistema de seguimiento
              o contactar directamente a nuestro equipo de soporte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/track"
                className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-200 shadow-soft hover:shadow-medium border border-primary-200"
              >
                Seguimiento de Trámite
              </a>
              <a
                href="/support"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-200 shadow-soft hover:shadow-medium"
              >
                Centro de Ayuda
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacto;