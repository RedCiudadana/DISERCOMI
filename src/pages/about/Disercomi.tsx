import React from 'react';
import { Building2, Target, Eye, Gift, Clock, Shield, MapPin } from 'lucide-react';
import Hero from '../../components/ui/Hero';

const Disercomi: React.FC = () => {
  return (
    <>
      <Hero
        title="Acerca de DISERCOMI"
        subtitle="Dirección de Servicios al Comercio y a la Inversión - Facilitando el desarrollo económico de Guatemala"
        image="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Acerca de DISERCOMI */}
        <section className="mb-16 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4">
                <Building2 size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Acerca de la DISERCOMI</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              La Dirección de Servicios al Comercio y a la Inversión (DISERCOMI) es una unidad especializada del 
              Ministerio de Economía de Guatemala, dedicada a facilitar y promover el comercio exterior y la inversión 
              en el país a través de servicios eficientes y modernos.
            </p>
          </div>
        </section>

        {/* Servicios quie presta */}
        <section className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mr-4">
                <Gift size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Servicios que presta</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Building2 size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Maquiladora</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Maquiladora y/o exportadora bajo el régimen de admisión temporal
                </p>
              </div>

              <div className="group bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Building2 size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Productora</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Productora bajo el régimen de admisión temporal
                </p>
              </div>

              <div className="group bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Gift size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Prestadora de servicios</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Prestadora de servicios
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Marco Legal */}
        <section className="mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Marco Legal y Competencias</h2>
            <div className="space-y-6">
              

              <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-xl p-6 border border-secondary-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">DISERCOMI opera bajo:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <strong>Decreto 29-89:</strong> Ley de Fomento y Desarrollo de la Actividad Exportadora y de Maquila
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <strong>Decreto 65-89:</strong> Ley de Zonas Francas
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Que sustenta su existencia y competencia:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <strong>Acuerdo Gubernativo 211-2019:</strong> Reglamento Orgánico Interno del Ministerio de Economía
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      <strong>Acuerdo Ministerial 762-2019:</strong> Estructura Orgánica Interna Complementaria a la Estructura establecida en el Reglamento Orgánico Interno
                    </span>
                  </li>
                </ul>
              </div>
              
            </div>
          </div>
        </section>

        {/* Facilitación del Comercio Exterior */}
        <section className="mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Facilitación del Comercio Exterior</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              DISERCOMI se enfoca en simplificar y agilizar los procesos relacionados con el comercio exterior, 
              proporcionando servicios digitales modernos que reducen tiempos, eliminan barreras burocráticas 
              y facilitan la participación de las empresas guatemaltecas en los mercados internacionales.
            </p>
          </div>
        </section>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                  <Target size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Misión</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Somos una unidad ágil, responsable, eficaz y eficiente, que contribuye a fortalecer la atención 
                a los requerimientos que demanden los beneficiarios de las leyes de fomento a la inversión y empleo.
              </p>
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200 h-full">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mr-4">
                  <Eye size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Visión Institucional</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Ser una unidad del Ministerio de Economía que coadyuve al crecimiento de la economía del país, 
                promoviendo el desarrollo de los sectores industrial y de servicios, por medio de las leyes de 
                fomento a la inversión y empleo.
              </p>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <section className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-white rounded-2xl shadow-soft p-8 border border-gray-200">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mr-4">
                <Gift size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Beneficios</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Clock size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Acceso 24/7</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Acceso 24/7 a la plataforma de comercio exterior. Nuestra plataforma está disponible en todo momento, 
                  facilitando el ingreso de las solicitudes de trámites.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <Shield size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Servicios Seguros</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Servicios ágiles y seguros. Atención ágil en horas hábiles con medidas de seguridad avanzadas 
                  para proteger la información.
                </p>
              </div>

              <div className="group bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200 hover:shadow-medium transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Sin Desplazamientos</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Reducción de tiempos y eliminación de desplazamientos físicos. Optimiza tus procesos evitando 
                  la necesidad de visitas físicas a nuestras instalaciones, lo que ahorra tiempo y recursos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 rounded-2xl p-8 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
            </div>
            
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Descubra cómo DISERCOMI puede ayudar a su empresa a crecer en los mercados internacionales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/procedures/new"
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-large hover:shadow-xl"
                >
                  Iniciar Trámite
                </a>
                <a 
                  href="/track"
                  className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
                >
                  Seguimiento
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Disercomi;