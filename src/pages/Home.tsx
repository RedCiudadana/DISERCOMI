import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, Clock, CreditCard, ArrowRight, Shield, Zap, Globe, Users, Play, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import Button from '../components/ui/Button';
import LoginModal from '../components/auth/LoginModal';

const Home: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Gestione sus trámites de exportación digitalmente",
      subtitle: "Plataforma oficial de DISERCOMI para la gestión de trámites exportadores y servicios al comercio e inversión.",
      image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
      cta: "Iniciar Trámite",
      ctaLink: "/procedures/new",
      gradient: "from-primary-900 via-primary-800 to-secondary-900"
    },
    {
      title: "Seguimiento en tiempo real de sus procesos",
      subtitle: "Consulte el estado de sus trámites las 24 horas del día, los 7 días de la semana desde cualquier dispositivo.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
      cta: "Seguir Trámite",
      ctaLink: "/track",
      gradient: "from-secondary-900 via-secondary-800 to-primary-900"
    },
    {
      title: "Validación automática con instituciones públicas",
      subtitle: "Verificamos sus datos con SAT, RENAP y Registro Mercantil en tiempo real para agilizar sus trámites.",
      image: "https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg",
      cta: "Conocer Más",
      ctaLink: "/process-flow",
      gradient: "from-primary-800 via-secondary-800 to-primary-900"
    }
  ];

  const features = [
    {
      icon: FileText,
      title: 'Solicitud Digital',
      description: 'Complete formularios en línea sin necesidad de desplazarse físicamente.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: CheckCircle,
      title: 'Validación Automática',
      description: 'Verificamos sus datos con instituciones públicas en tiempo real.',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: Clock,
      title: 'Seguimiento en Tiempo Real',
      description: 'Consulte el estado de sus trámites en cualquier momento.',
      color: 'from-primary-600 to-primary-700'
    },
    {
      icon: CreditCard,
      title: 'Pagos en Línea',
      description: 'Realice pagos de forma segura a través de nuestra plataforma.',
      color: 'from-secondary-600 to-secondary-700'
    }
  ];

  const procedures = [
    {
      title: 'Inscripción como Exportador',
      description: 'Registre su empresa como exportadora y acceda a los beneficios del comercio internacional.',
      icon: Globe,
      gradient: 'from-primary-500 to-primary-600'
    },
    {
      title: 'Certificado de Origen',
      description: 'Obtenga su certificado de origen para bienes exportados bajo acuerdos comerciales.',
      icon: Shield,
      gradient: 'from-secondary-500 to-secondary-600'
    },
    {
      title: 'Licencia de Exportación',
      description: 'Solicite licencias para exportar productos regulados a mercados internacionales.',
      icon: Zap,
      gradient: 'from-primary-600 to-secondary-600'
    }
  ];

  const stats = [
    { number: '15', label: 'Días promedio', sublabel: 'de procesamiento' },
    { number: '24/7', label: 'Disponibilidad', sublabel: 'del sistema' },
    { number: '100%', label: 'Digital', sublabel: 'sin papeles' },
    { number: '500+', label: 'Empresas', sublabel: 'registradas' }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides Container */}
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}>
                {/* Background Image with Parallax Effect */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    transform: index === currentSlide ? 'scale(1.05)' : 'scale(1.1)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
                </div>

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat animate-pulse-soft"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
                  <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
                  <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
                </div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-4xl">
                    <div className={`transition-all duration-1000 delay-300 ${
                      index === currentSlide 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 translate-y-8'
                    }`}>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                          {slide.title}
                        </span>
                      </h1>
                      <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-3xl">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link to={slide.ctaLink}>
                          <Button 
                            size="xl"
                            className="group shadow-large hover:shadow-xl bg-white text-primary-600 hover:bg-blue-50"
                          >
                            {slide.cta}
                            <ArrowRight size={24} className="ml-3 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                        {/* <Link to="/track">
                          <Button 
                            variant="outline" 
                            size="xl"
                            className="border-white/30 hover:bg-white/10 backdrop-blur-sm"
                          >
                            <Play size={20} className="mr-2" />
                            Ver Demo
                          </Button>
                        </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 group"
          >
            <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-1" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-4 flex items-center">
          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 group"
          >
            <ChevronRight size={24} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-white to-blue-200 transition-all duration-6000 ease-linear"
            style={{ 
              width: `${((currentSlide + 1) / heroSlides.length) * 100}%`,
              animation: 'progressBar 6s linear infinite'
            }}
          />
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-800 font-semibold">{stat.label}</div>
                <div className="text-gray-600 text-sm">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simplificamos sus trámites
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nuestra plataforma digital le permite realizar trámites de forma sencilla, segura y sin complicaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 border border-gray-200 hover:border-primary-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISERCOMI Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Servicios DISERCOMI
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Acceda a nuestros servicios especializados y herramientas de análisis estadístico
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 border border-gray-200 hover:border-primary-200 animate-slide-up">
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft mx-auto">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-primary-700 transition-colors text-center">
                Opinión Ciudadana
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                Comparta su experiencia y ayúdenos a mejorar nuestros servicios
              </p>
              <div className="text-center">
                <a
                  href="https://www.mineco.gob.gt/despacho-y-viceministerios/viceministerio-de-inversion-y-competencia/direccion-de-servicios-al-comercio-y-la-inversion#mineco-api-custom-1206-particle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium group/btn"
                >
                  Dar Opinión
                  <ArrowRight size={20} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 border border-gray-200 hover:border-secondary-200 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-secondary-500 to-secondary-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft mx-auto">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-secondary-700 transition-colors text-center">
                Boleta Estadística 2024
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                Visualice datos estadísticos interactivos del comercio exterior
              </p>
              <div className="text-center">
                <a
                  href="https://app.powerbi.com/view?r=eyJrIjoiMjc0ZjVmNTItM2ZhMS00NzE3LThhNTEtNjcxOGIzZDE2NjNiIiwidCI6ImJhNzllNzM5LTE4ZmItNGNmOS04OWM5LWM3NWYzYjBlNDFlZSIsImMiOjR9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium group/btn"
                >
                  Ver Dashboard
                  <ArrowRight size={20} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 border border-gray-200 hover:border-success-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-success-500 to-success-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft mx-auto">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-success-700 transition-colors text-center">
                Reporte Estadístico 2024
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6 text-center">
                Descargue el reporte completo de la boleta estadística
              </p>
              <div className="text-center">
                <a
                  href="https://www.mineco.gob.gt/images/viceministerio_inversion_competencia/direccion_servicio_al_comercio/Boleta_estadistica_2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium group/btn"
                >
                  Descargar PDF
                  <ArrowRight size={20} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular procedures section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trámites Populares</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore nuestros trámites más solicitados y comience su proceso en línea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {procedures.map((procedure, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-large transition-all duration-300 border border-gray-200 hover:border-primary-200 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`h-2 bg-gradient-to-r ${procedure.gradient}`}></div>
                <div className="p-8">
                  <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r ${procedure.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                    <procedure.icon size={20} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-primary-700 transition-colors">
                    {procedure.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {procedure.description}
                  </p>
                  <Link to="/procedures/new">
                    <Button variant="outline" fullWidth className="group/btn">
                      Iniciar Trámite
                      <ArrowRight size={20} className="ml-2 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborators section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Colaboradores</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Esta plataforma es posible gracias a la colaboración de instituciones comprometidas con el desarrollo económico de Guatemala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center animate-slide-up">
              <p className="text-lg font-semibold text-gray-700 mb-6">Un proyecto de:</p>
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-200">
                <img 
                  src="https://mineco.gob.gt/images/logos/Logo_Mineco_2024.png"
                  alt="Ministerio de Economía"
                  className="max-h-24 mx-auto"
                />
              </div>
            </div>
            <div className="text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-lg font-semibold text-gray-700 mb-6">Gracias al apoyo de:</p>
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-200">
                <img 
                  src="https://www.redciudadana.org/assets/img/red/LOGO-RED_NEGRO.png"
                  alt="Red Ciudadana"
                  className="max-h-24 mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between animate-fade-in">
            <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para comenzar?</h2>
              <p className="text-xl text-blue-100 max-w-2xl">
                Inicie su trámite hoy y gestione sus procesos de exportación de forma digital.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/procedures/new">
                <Button 
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-blue-50 shadow-large hover:shadow-xl"
                >
                  Iniciar Trámite
                </Button>
              </Link>
              <Link to="/track">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Seguimiento
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Home;