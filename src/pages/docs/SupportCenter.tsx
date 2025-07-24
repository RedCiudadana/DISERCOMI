import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, HelpCircle, FileText, AlertCircle, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import Hero from '../../components/ui/Hero';
import Input from '../../components/ui/Input';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: '¿Cómo inicio un nuevo trámite?',
    answer: 'Para iniciar un nuevo trámite, haga clic en el botón "Nuevo Trámite" en la página principal o en su panel de trámites. Complete el formulario con la información requerida y adjunte los documentos necesarios.',
    category: 'general'
  },
  {
    id: 2,
    question: '¿Qué documentos necesito para el Decreto 29-89?',
    answer: 'Los documentos básicos incluyen: Patente de Comercio, RTU actualizado, DPI del representante legal, estados financieros y plan de inversión. Consulte la sección de requisitos específicos para más detalles.',
    category: 'documentos'
  },
  {
    id: 3,
    question: '¿Cuánto tiempo toma el proceso de calificación?',
    answer: 'El tiempo promedio de resolución es de 15 días hábiles, siempre que toda la documentación esté completa y correcta. Este plazo puede variar según la complejidad del caso.',
    category: 'proceso'
  },
  {
    id: 4,
    question: '¿Cómo puedo dar seguimiento a mi trámite?',
    answer: 'Use la opción "Seguimiento de Trámite" e ingrese su código de seguimiento. También puede acceder a su panel de trámites si tiene una cuenta registrada.',
    category: 'seguimiento'
  },
  {
    id: 5,
    question: '¿Qué hago si mi solicitud es rechazada?',
    answer: 'Si su solicitud es rechazada, recibirá una notificación con los motivos. Puede corregir la información o documentación señalada y volver a presentar la solicitud.',
    category: 'proceso'
  },
  {
    id: 6,
    question: '¿Cómo actualizo la información de mi empresa?',
    answer: 'Inicie sesión en su cuenta y vaya a la sección de "Perfil de Empresa". Allí podrá actualizar la información y documentos de su empresa.',
    category: 'general'
  }
];

const commonProblems = [
  {
    title: 'Documentos incompletos',
    description: 'Asegúrese de tener todos los documentos requeridos antes de iniciar el trámite.',
    solution: 'Revise la lista de documentos en la sección de requisitos y verifique que estén vigentes.'
  },
  {
    title: 'Error en el formulario',
    description: 'Datos incorrectos o campos faltantes en el formulario de solicitud.',
    solution: 'Complete todos los campos obligatorios y verifique la información antes de enviar.'
  },
  {
    title: 'Problemas de validación',
    description: 'Errores en la validación de DPI o NIT.',
    solution: 'Verifique que los números sean correctos y estén actualizados en los registros oficiales.'
  }
];

const SupportCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    return selectedCategory === 'all' 
      ? matchesSearch 
      : matchesSearch && faq.category === selectedCategory;
  });

  return (
    <>
      <Hero
        title="Centro de Ayuda"
        subtitle="Encuentre respuestas a sus preguntas y soluciones a problemas comunes"
        image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link 
            to="/process-flow"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Clock className="h-8 w-8 text-[#005bac] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Proceso Paso a Paso</h3>
            <p className="text-gray-600 mb-4">
              Guía detallada del proceso de trámites y requisitos.
            </p>
            <span className="text-[#005bac] flex items-center">
              Ver más <ArrowRight size={16} className="ml-1" />
            </span>
          </Link>

          <Link 
            to="/track"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <FileText className="h-8 w-8 text-[#005bac] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Seguimiento de Trámite</h3>
            <p className="text-gray-600 mb-4">
              Consulte el estado actual de su trámite.
            </p>
            <span className="text-[#005bac] flex items-center">
              Ver más <ArrowRight size={16} className="ml-1" />
            </span>
          </Link>

          <Link 
            to="/documentation"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <HelpCircle className="h-8 w-8 text-[#005bac] mb-4" />
            <h3 className="text-lg font-semibold mb-2">Documentación</h3>
            <p className="text-gray-600 mb-4">
              Acceda a guías y documentación detallada.
            </p>
            <span className="text-[#005bac] flex items-center">
              Ver más <ArrowRight size={16} className="ml-1" />
            </span>
          </Link>
        </div>

        {/* Search and Categories */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <div className="max-w-2xl mx-auto">
            <Input
              placeholder="Buscar en el centro de ayuda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="text-gray-400" />}
              fullWidth
            />
            
            <div className="flex flex-wrap gap-2 mt-4">
              {['all', 'general', 'documentos', 'proceso', 'seguimiento'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? 'bg-[#005bac] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Preguntas Frecuentes
          </h2>
          <div className="grid gap-6">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Problems */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Problemas Comunes y Soluciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commonProblems.map((problem, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {problem.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {problem.description}
                </p>
                <div className="bg-green-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <p className="text-green-700 text-sm">
                      <strong>Solución:</strong> {problem.solution}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesita más ayuda?
          </h2>
          <p className="text-gray-600 mb-6">
            Nuestro equipo de soporte está disponible para ayudarle
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="tel:+50224120200"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#005bac] hover:bg-[#004a8f]"
            >
              Llamar al +502 2412-0200
            </a>
            <a
              href="mailto:info@disercomi.gob.gt"
              className="inline-flex items-center px-6 py-3 border border-[#005bac] text-base font-medium rounded-md text-[#005bac] bg-white hover:bg-gray-50"
            >
              Enviar correo
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportCenter;