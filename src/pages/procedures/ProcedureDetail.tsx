import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProcedures } from '../../context/ProcedureContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import StatusBadge from '../../components/ui/StatusBadge';
import { Procedure, ProcedureStep, StepStatus } from '../../types';
import { 
  ArrowLeft, Calendar, File as FilePdf, PenSquare, CreditCard, 
  Download, MessageSquare, Hash, AlertCircle, CheckCircle, 
  Clock, FileText, User, Building2 
} from 'lucide-react';
import ExpedienteAnalysis from '../../components/expediente/ExpedienteAnalysis';

const steps: { key: ProcedureStep; label: string; description: string }[] = [
  {
    key: 'ingreso',
    label: 'Ingreso del expediente',
    description: 'Recepción inicial de la documentación'
  },
  {
    key: 'asignacion',
    label: 'Asignación de número de expediente',
    description: 'Registro y asignación de identificador único'
  },
  {
    key: 'analisis',
    label: 'Análisis del expediente',
    description: 'Revisión técnica y legal de la documentación'
  },
  {
    key: 'revision',
    label: 'Revisión del proyecto de resolución',
    description: 'Evaluación de la propuesta de resolución'
  },
  {
    key: 'firma',
    label: 'Firma electrónica avanzada (FEA)',
    description: 'Firma digital de documentos oficiales'
  },
  {
    key: 'elaboracion',
    label: 'Elaboración y aprobación de resolución',
    description: 'Preparación del documento final'
  },
  {
    key: 'notificacion',
    label: 'Notificación de resolución',
    description: 'Comunicación oficial al solicitante'
  },
  {
    key: 'cierre',
    label: 'Cierre del expediente',
    description: 'Finalización y archivo del trámite'
  }
];

const ProcedureDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    loading, 
    error, 
    getProcedure, 
    updateStatus, 
    signProcedure, 
    payProcedure 
  } = useProcedures();
  
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [comment, setComment] = useState('');
  const [commentType, setCommentType] = useState<'info' | 'request' | 'followup'>('info');
  const [commentError, setCommentError] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'expediente'>('details');
  const [actionLoading, setActionLoading] = useState({
    sign: false,
    pay: false,
    comment: false
  });

  useEffect(() => {
    const fetchProcedure = async () => {
      if (id) {
        const data = await getProcedure(id);
        if (data) {
          setProcedure(data);
        }
      }
    };
    
    fetchProcedure();
  }, [id, getProcedure]);

  const handleStepUpdate = async (step: ProcedureStep, status: StepStatus['status']) => {
    if (!procedure) return;

    const updatedSteps = procedure.steps.map(s => 
      s.step === step ? { ...s, status, date: new Date().toISOString() } : s
    );

    // Update procedure with new steps
    const updatedProcedure = { ...procedure, steps: updatedSteps };
    setProcedure(updatedProcedure);

    // In a real app, this would make an API call to update the procedure
  };

  const getStepIcon = (status: StepStatus['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-300" />;
    }
  };

  if (loading && !procedure) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!procedure) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded">
          Trámite no encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-500 hover:text-gray-700 mr-4"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Detalle del Trámite</h1>
          <div className="flex items-center mt-1">
            <Hash size={16} className="text-gray-400 mr-1" />
            <p className="text-sm text-gray-500">
              Código: <span className="font-mono font-medium">{procedure.trackingCode}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <nav className="flex space-x-4" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-3 py-2 font-medium text-sm rounded-md ${
              activeTab === 'details'
                ? 'bg-[#005bac] text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Detalles del Trámite
          </button>
          <button
            onClick={() => setActiveTab('expediente')}
            className={`px-3 py-2 font-medium text-sm rounded-md ${
              activeTab === 'expediente'
                ? 'bg-[#005bac] text-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Análisis del Expediente
          </button>
        </nav>
      </div>

      {activeTab === 'details' ? (
        <>
          {/* Basic Information */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900">{procedure.type}</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{procedure.companyName}</p>
              </div>
              <StatusBadge status={procedure.status} size="lg" />
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Empresa</dt>
                  <dd className="mt-1 text-sm text-gray-900">{procedure.companyName}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">NIT</dt>
                  <dd className="mt-1 text-sm text-gray-900">{procedure.companyNit}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Dirección</dt>
                  <dd className="mt-1 text-sm text-gray-900">{procedure.address}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Sector</dt>
                  <dd className="mt-1 text-sm text-gray-900">{procedure.sector}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">Documentos</h3>
              <p className="mt-1 text-sm text-gray-500">
                Documentos adjuntos al trámite
              </p>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {procedure.documents.map((doc, index) => (
                  <li key={doc.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FilePdf className="h-5 w-5 text-gray-400" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Subido el {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(doc.url, '_blank')}
                      >
                        <Download size={16} className="mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps Timeline */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium text-gray-900">Estado del Trámite</h3>
              <p className="mt-1 text-sm text-gray-500">
                Seguimiento del proceso paso a paso
              </p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {steps.map((step, stepIdx) => {
                      const stepStatus = procedure.steps?.find(s => s.step === step.key)?.status || 'pending';
                      return (
                        <li key={step.key}>
                          <div className="relative pb-8">
                            {stepIdx !== steps.length - 1 ? (
                              <span
                                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                              />
                            ) : null}
                            <div className="relative flex space-x-3">
                              <div>
                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                  stepStatus === 'completed' ? 'bg-green-500' :
                                  stepStatus === 'in_progress' ? 'bg-blue-500' :
                                  'bg-gray-200'
                                }`}>
                                  {getStepIcon(stepStatus)}
                                </span>
                              </div>
                              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {step.label}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {step.description}
                                  </p>
                                </div>
                                {user?.role === 'admin' && (
                                  <div className="whitespace-nowrap text-right text-sm">
                                    <select
                                      value={stepStatus}
                                      onChange={(e) => handleStepUpdate(step.key, e.target.value as StepStatus['status'])}
                                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#005bac] focus:outline-none focus:ring-[#005bac] sm:text-sm"
                                    >
                                      <option value="pending">Pendiente</option>
                                      <option value="in_progress">En Proceso</option>
                                      <option value="completed">Completado</option>
                                    </select>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ExpedienteAnalysis
          procedureId={procedure.id}
          procedureType={procedure.type}
          evaluations={[]} // Add actual evaluations data
          stages={[]} // Add actual stages data
          onEvaluationUpdate={() => {}} // Add handlers
          onStageUpdate={() => {}} // Add handlers
        />
      )}
    </div>
  );
};

export default ProcedureDetail;