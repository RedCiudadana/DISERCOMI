import React, { useState } from 'react';
import { FileText, CheckCircle, Clock, Users, Building2, FileCheck, Search, Filter, Play, ChevronDown, ChevronUp } from 'lucide-react';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Hero from '../../components/ui/Hero';
import { Link } from 'react-router-dom';

interface Procedure {
  id: number;
  name: string;
  description: string;
  documents: string[];
  steps: string[];
  estimatedTime: string;
  cost: string;
  decreto: string;
}

const procedures: Procedure[] = [
  {
    id: 1,
    name: 'Calificación para el Decreto 29-89',
    description: 'Ingreso formal al régimen de beneficios fiscales y aduaneros.',
    documents: ['Solicitud oficial', 'informe técnico-económico', 'RTU', 'DPI/nombramiento legal', 'planos', 'listado arancelario'],
    steps: [
      'Completar formulario en línea con información de la empresa',
      'Cargar documentos requeridos (RTU, DPI, estados financieros, etc.)',
      'Validación automática de datos con instituciones públicas',
      'Revisión técnica por parte de DISERCOMI',
      'Evaluación del plan de inversión y capacidad exportadora',
      'Emisión de resolución de calificación',
      'Notificación al solicitante'
    ],
    estimatedTime: '15-20 días hábiles',
    cost: 'Q. 500.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 2,
    name: 'Prórroga de inicio de operaciones',
    description: 'Ampliar plazo para comenzar operaciones exportadoras.',
    documents: ['Carta de solicitud', 'justificación', 'resolución anterior', 'cronograma'],
    steps: [
      'Presentar solicitud formal de prórroga',
      'Adjuntar justificación detallada del retraso',
      'Proporcionar nuevo cronograma de actividades',
      'Revisión de la solicitud por el área técnica',
      'Evaluación de la justificación presentada',
      'Emisión de resolución de prórroga'
    ],
    estimatedTime: '10-15 días hábiles',
    cost: 'Q. 200.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 3,
    name: 'Cambio de nombre de empresa',
    description: 'Actualizar nombre comercial.',
    documents: ['Escritura de cambio de nombre', 'solicitud firmada'],
    steps: [
      'Presentar solicitud de cambio de nombre',
      'Adjuntar escritura pública del cambio de denominación',
      'Verificación en Registro Mercantil',
      'Actualización en base de datos de DISERCOMI',
      'Emisión de nueva resolución con nombre actualizado'
    ],
    estimatedTime: '5-8 días hábiles',
    cost: 'Q. 150.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 4,
    name: 'Cambio de razón social',
    description: 'Actualizar nombre legal de la sociedad.',
    documents: ['Escritura pública inscrita', 'solicitud formal'],
    steps: [
      'Presentar solicitud formal de cambio',
      'Adjuntar escritura pública inscrita en Registro Mercantil',
      'Verificación de inscripción registral',
      'Actualización de datos en sistema DISERCOMI',
      'Emisión de resolución modificatoria'
    ],
    estimatedTime: '8-12 días hábiles',
    cost: 'Q. 200.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 5,
    name: 'Registro o cambio de representante legal',
    description: 'Actualizar información del representante ante DISERCOMI.',
    documents: ['Nombramiento vigente', 'DPI', 'acta de asamblea'],
    steps: [
      'Presentar solicitud de cambio de representante',
      'Adjuntar nombramiento vigente del nuevo representante',
      'Verificar DPI del nuevo representante con RENAP',
      'Validar facultades otorgadas en el nombramiento',
      'Actualizar información en base de datos',
      'Notificar cambio al nuevo representante'
    ],
    estimatedTime: '5-10 días hábiles',
    cost: 'Q. 100.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 6,
    name: 'Ampliación de actividad económica',
    description: 'Incluir nuevas actividades dentro del régimen.',
    documents: ['Descripción de actividades', 'justificación técnica', 'resolución actual'],
    steps: [
      'Solicitar ampliación de actividades',
      'Describir detalladamente las nuevas actividades',
      'Justificar técnicamente la ampliación',
      'Evaluación técnica de las nuevas actividades',
      'Verificar compatibilidad con el régimen',
      'Emisión de resolución modificatoria'
    ],
    estimatedTime: '15-20 días hábiles',
    cost: 'Q. 300.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 7,
    name: 'Adición de inciso arancelario - Materia Prima',
    description: 'Incluir nuevos insumos importables.',
    documents: ['Formato anexo', 'listado de insumos', 'uso técnico', 'resolución'],
    steps: [
      'Completar formato de solicitud de adición',
      'Listar detalladamente los nuevos insumos',
      'Describir el uso técnico de cada insumo',
      'Evaluación técnica de la necesidad',
      'Verificación arancelaria',
      'Emisión de resolución de adición'
    ],
    estimatedTime: '10-15 días hábiles',
    cost: 'Q. 250.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 8,
    name: 'Adición de inciso arancelario - Maquinaria y Equipo',
    description: 'Agregar maquinaria al listado autorizado.',
    documents: ['Formato anexo', 'cotización o ficha técnica', 'justificación'],
    steps: [
      'Presentar solicitud de adición de maquinaria',
      'Adjuntar fichas técnicas o cotizaciones',
      'Justificar la necesidad de la maquinaria',
      'Evaluación técnica del equipo solicitado',
      'Verificación de clasificación arancelaria',
      'Emisión de resolución de autorización'
    ],
    estimatedTime: '12-18 días hábiles',
    cost: 'Q. 400.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 9,
    name: 'Adición de inciso arancelario - Productos a exportar',
    description: 'Añadir nuevos productos terminados para exportación.',
    documents: ['Formato anexo', 'muestras o fichas de producto', 'mercado objetivo'],
    steps: [
      'Solicitar adición de nuevos productos',
      'Proporcionar muestras o fichas técnicas',
      'Identificar mercados objetivo',
      'Evaluación de viabilidad exportadora',
      'Verificación de clasificación arancelaria',
      'Emisión de resolución de autorización'
    ],
    estimatedTime: '10-15 días hábiles',
    cost: 'Q. 300.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 10,
    name: 'Incremento de unidades de maquinaria',
    description: 'Aumentar cantidades autorizadas de maquinaria.',
    documents: ['Formato anexo', 'razones de expansión', 'resolución previa'],
    steps: [
      'Presentar solicitud de incremento',
      'Justificar razones de la expansión',
      'Proporcionar plan de crecimiento',
      'Evaluación de la justificación',
      'Verificación de capacidad instalada',
      'Emisión de resolución modificatoria'
    ],
    estimatedTime: '8-12 días hábiles',
    cost: 'Q. 200.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 11,
    name: 'Cambio de dirección - Planta o Centro de Operaciones',
    description: 'Actualizar ubicación física de la planta.',
    documents: ['Contrato de arrendamiento', 'croquis', 'resolución previa'],
    steps: [
      'Notificar cambio de dirección',
      'Adjuntar contrato de arrendamiento o escritura',
      'Proporcionar croquis de ubicación',
      'Inspección de nuevas instalaciones (si aplica)',
      'Verificación de condiciones operativas',
      'Actualización en resolución vigente'
    ],
    estimatedTime: '10-15 días hábiles',
    cost: 'Q. 250.00',
    decreto: 'Decreto 29-89'
  },
  {
    id: 12,
    name: 'Registro de dirección fiscal',
    description: 'Registrar nueva dirección ante MINECO.',
    documents: ['Carta de solicitud', 'comprobante de domicilio'],
    steps: [
      'Presentar solicitud de registro',
      'Adjuntar comprobante de domicilio fiscal',
      'Verificación de la dirección',
      'Actualización en base de datos',
      'Confirmación del registro'
    ],
    estimatedTime: '3-5 días hábiles',
    cost: 'Q. 50.00',
    decreto: 'Decreto 65-89'
  },
  {
    id: 13,
    name: 'Registro de oficinas administrativas',
    description: 'Actualizar oficinas centrales o administrativas.',
    documents: ['Carta', 'ubicación', 'resolución vigente'],
    steps: [
      'Solicitar registro de oficinas',
      'Proporcionar dirección exacta',
      'Adjuntar comprobante de domicilio',
      'Verificación de la información',
      'Actualización en registros',
      'Confirmación del cambio'
    ],
    estimatedTime: '5-8 días hábiles',
    cost: 'Q. 100.00',
    decreto: 'Decreto 65-89'
  },
  {
    id: 14,
    name: 'Registro de dirección de notificaciones',
    description: 'Registrar nuevo domicilio legal de notificaciones.',
    documents: ['Carta de solicitud', 'dirección y contacto actualizado'],
    steps: [
      'Presentar solicitud de cambio',
      'Proporcionar nueva dirección de notificaciones',
      'Actualizar datos de contacto',
      'Verificación de la información',
      'Actualización en sistema',
      'Confirmación del cambio'
    ],
    estimatedTime: '3-5 días hábiles',
    cost: 'Q. 50.00',
    decreto: 'Decreto 65-89'
  },
  {
    id: 15,
    name: 'Cancelación de resolución',
    description: 'Renuncia voluntaria a beneficios del Decreto 29-89.',
    documents: ['Carta de solicitud', 'acta de cierre o disolución'],
    steps: [
      'Presentar solicitud de cancelación',
      'Adjuntar acta de cierre o disolución',
      'Verificar cumplimiento de obligaciones',
      'Revisión de estado de cuenta',
      'Emisión de resolución de cancelación',
      'Cierre definitivo del expediente'
    ],
    estimatedTime: '15-20 días hábiles',
    cost: 'Q. 100.00',
    decreto: 'Decreto 65-89'
  },
  {
    id: 16,
    name: 'Transferencia de materia prima',
    description: 'Pasar insumos a otra empresa calificada.',
    documents: ['Formato anexo', 'resolución de ambas empresas', 'factura'],
    steps: [
      'Solicitar autorización de transferencia',
      'Verificar calificación de empresa receptora',
      'Adjuntar factura de transferencia',
      'Evaluación de la operación',
      'Autorización de la transferencia',
      'Actualización de inventarios'
    ],
    estimatedTime: '8-12 días hábiles',
    cost: 'Q. 150.00',
    decreto: 'Decreto 65-89'
  },
  {
    id: 17,
    name: 'Transferencia de maquinaria y equipo',
    description: 'Traspasar activos productivos entre beneficiarios.',
    documents: ['Formato anexo', 'resolución vigente', 'motivo de transferencia'],
    steps: [
      'Presentar solicitud de transferencia',
      'Justificar motivo de la transferencia',
      'Verificar calificación de ambas empresas',
      'Evaluación técnica de la operación',
      'Autorización de transferencia',
      'Actualización de registros'
    ],
    estimatedTime: '10-15 días hábiles',
    cost: 'Q. 300.00',
    decreto: 'Decreto 65-89'
  },
  {
    id: 18,
    name: 'Notificación de enajenación de activos',
    description: 'Informar venta o baja de maquinaria o equipo.',
    documents: ['Factura de venta', 'resolución original', 'formato anexo'],
    steps: [
      'Notificar enajenación de activos',
      'Adjuntar factura de venta o documento de baja',
      'Proporcionar detalles del activo',
      'Verificación de la operación',
      'Actualización de inventario autorizado',
      'Confirmación de la notificación'
    ],
    estimatedTime: '5-8 días hábiles',
    cost: 'Q. 100.00',
    decreto: 'Decreto 65-89'
  },
  {
    id: 19,
    name: 'Notificación de subcontratación',
    description: 'Avisar que otra empresa realizará parte del proceso productivo.',
    documents: ['Formato anexo', 'contrato o convenio', 'RTU de subcontratada'],
    steps: [
      'Notificar subcontratación',
      'Adjuntar contrato o convenio',
      'Verificar RTU de empresa subcontratada',
      'Evaluación del proceso subcontratado',
      'Autorización de la subcontratación',
      'Registro de la operación'
    ],
    estimatedTime: '8-12 días hábiles',
    cost: 'Q. 200.00',
    decreto: 'Decreto 65-89'
  },
  {
    id: 20,
    name: 'Notificación de complementariedad',
    description: 'Informar operación conjunta con otra empresa beneficiaria.',
    documents: ['Formato anexo', 'resolución de ambas', 'descripción de actividades'],
    steps: [
      'Notificar operación de complementariedad',
      'Describir actividades complementarias',
      'Verificar calificación de ambas empresas',
      'Evaluación de la operación conjunta',
      'Autorización de complementariedad',
      'Registro de la operación'
    ],
    estimatedTime: '10-15 días hábiles',
    cost: 'Q. 250.00',
    decreto: 'Decreto 65-89'
  },
  {
    id: 21,
    name: 'Presentación de boleta estadística',
    description: 'Reporte mensual de operaciones a DISERCOMI/SAT.',
    documents: ['Formulario oficial', 'datos productivos y de exportación'],
    steps: [
      'Completar formulario estadístico mensual',
      'Proporcionar datos de producción',
      'Incluir información de exportaciones',
      'Verificación de consistencia de datos',
      'Procesamiento de la información',
      'Confirmación de recepción'
    ],
    estimatedTime: '1-3 días hábiles',
    cost: 'Gratuito',
    decreto: 'Decreto 65-89'
  },
  {
    id: 22,
    name: 'Recalificación de empresa',
    description: 'Solicitar ingreso nuevamente tras revocatoria o suspensión.',
    documents: ['Igual que la calificación inicial', 'constancia de cumplimiento'],
    steps: [
      'Presentar solicitud de recalificación',
      'Adjuntar documentación completa actualizada',
      'Demostrar cumplimiento de observaciones previas',
      'Evaluación integral de la empresa',
      'Verificación de corrección de deficiencias',
      'Emisión de nueva resolución de calificación'
    ],
    estimatedTime: '20-30 días hábiles',
    cost: 'Q. 750.00',
    decreto: 'Decreto 65-89'
  }
];

const categories = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'registration', label: 'Registro y Calificación' },
  { value: 'modification', label: 'Modificaciones' },
  { value: 'address', label: 'Cambios de Dirección' },
  { value: 'transfer', label: 'Transferencias' },
  { value: 'notification', label: 'Notificaciones' },
  { value: 'cancellation', label: 'Cancelación' }
];

const decretos = [
  { value: 'all', label: 'Todos los decretos' },
  { value: 'Decreto 29-89', label: 'Decreto 29-89' },
  { value: 'Decreto 65-89', label: 'Decreto 65-89' },
];

const ProcessFlow: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDecreto, setSelectedDecreto] = useState('all');
  const [expandedProcedures, setExpandedProcedures] = useState<Set<number>>(new Set());

  const toggleProcedureExpansion = (procedureId: number) => {
    const newExpanded = new Set(expandedProcedures);
    if (newExpanded.has(procedureId)) {
      newExpanded.delete(procedureId);
    } else {
      newExpanded.add(procedureId);
    }
    setExpandedProcedures(newExpanded);
  };

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch =
      procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      procedure.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDecreto =
      selectedDecreto === 'all' || procedure.decreto === selectedDecreto;

    if (selectedCategory === 'all') return matchesSearch && matchesDecreto;

    const categoryMatches = {
      registration: [1, 22],
      modification: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      address: [11, 12, 13, 14],
      transfer: [16, 17],
      notification: [18, 19, 20, 21],
      cancellation: [15]
    };

    return (
      matchesSearch &&
      matchesDecreto &&
      categoryMatches[selectedCategory as keyof typeof categoryMatches]?.includes(procedure.id)
    );
  });

  return (
    <>
      <Hero
        title="Proceso de Trámites"
        subtitle="Conozca el flujo completo de los trámites y sus requisitos específicos"
        image="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Catálogo de Trámites DISERCOMI
          </h1>
          <p className="text-lg text-gray-600">
            Consulte los requisitos y procesos para cada tipo de trámite disponible.
          </p>
        </div>

        <div className="bg-white shadow-soft rounded-2xl overflow-hidden mb-8 border border-gray-200 animate-slide-up">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Input
                  id="search"
                  placeholder="Buscar trámites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Search size={20} className="text-gray-400" />}
                  fullWidth
                />
              </div>
              <Select
                options={categories}
                value={selectedCategory}
                onChange={(value) => setSelectedCategory(value)}
                fullWidth
              />
              <Select
                options={decretos}
                value={selectedDecreto}
                onChange={(value) => setSelectedDecreto(value)}
                fullWidth
              />
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {filteredProcedures.map((procedure, index) => (
                <div
                  key={procedure.id}
                  className="group border border-gray-200 rounded-xl p-6 hover:border-primary-300 hover:shadow-medium transition-all duration-300 bg-white hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-secondary-50/50 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3 group-hover:scale-110 transition-transform duration-300">
                          {procedure.id}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                          {procedure.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed">{procedure.description}</p>
                      
                      {/* Basic Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-primary-50 rounded-lg p-3 border border-primary-200">
                          <div className="flex items-center text-primary-700 mb-1">
                            <Clock size={16} className="mr-2" />
                            <span className="text-sm font-semibold">Tiempo estimado</span>
                          </div>
                          <p className="text-sm text-primary-800 font-medium">{procedure.estimatedTime}</p>
                        </div>
                        {/* <div className="bg-success-50 rounded-lg p-3 border border-success-200">
                          <div className="flex items-center text-success-700 mb-1">
                            <FileText size={16} className="mr-2" />
                            <span className="text-sm font-semibold">Costo</span>
                          </div>
                          <p className="text-sm text-success-800 font-medium">{procedure.cost}</p>
                        </div> */}
                        <div className="bg-secondary-50 rounded-lg p-3 border border-secondary-200">
                          <div className="flex items-center text-secondary-700 mb-1">
                            <FileCheck size={16} className="mr-2" />
                            <span className="text-sm font-semibold">Documentos</span>
                          </div>
                          <p className="text-sm text-secondary-800 font-medium">{procedure.documents.length} requeridos</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <Link to="/procedures/new" className="flex-1">
                          <Button 
                            fullWidth 
                            className="group/btn bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                          >
                            <Play size={16} className="mr-2 transition-transform group-hover/btn:scale-110" />
                            Iniciar Trámite
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => toggleProcedureExpansion(procedure.id)}
                          className="sm:w-auto"
                        >
                          {expandedProcedures.has(procedure.id) ? (
                            <>
                              <ChevronUp size={16} className="mr-2" />
                              Ocultar detalles
                            </>
                          ) : (
                            <>
                              <ChevronDown size={16} className="mr-2" />
                              Ver detalles
                            </>
                          )}
                        </Button>
                      </div>

                      {/* Expanded Details */}
                      {expandedProcedures.has(procedure.id) && (
                        <div className="space-y-6 pt-4 border-t border-gray-200 animate-slide-down">
                          {/* Steps */}
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <CheckCircle size={18} className="mr-2 text-primary-500" />
                              Pasos del proceso
                            </h4>
                            <div className="space-y-3">
                              {procedure.steps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start bg-gray-50 rounded-lg p-4 border border-gray-200">
                                  <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 flex-shrink-0 mt-0.5">
                                    {stepIndex + 1}
                                  </div>
                                  <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Documents */}
                          <div>
                        <h4 className="text-sm font-semibold text-gray-700 flex items-center">
                          <FileText size={16} className="mr-2 text-primary-500" />
                          Documentos requeridos:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {procedure.documents.map((doc, index) => (
                              <div key={index} className="flex items-center text-sm text-gray-600 bg-white rounded-lg px-3 py-2 border border-gray-200">
                              <CheckCircle size={14} className="mr-2 text-success-500 flex-shrink-0" />
                              <span>{doc}</span>
                            </div>
                          ))}
                        </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProcedures.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron trámites</h3>
                <p className="text-gray-500">
                  Intente ajustar los filtros de búsqueda para encontrar el trámite que necesita.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessFlow;