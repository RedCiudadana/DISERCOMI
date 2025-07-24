import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { CheckCircle, XCircle, AlertCircle, Clock, User, FileText } from 'lucide-react';

interface ExpedienteAnalysisProps {
  procedureId: string;
  procedureType: string;
  evaluations: any[];
  stages: any[];
  onEvaluationUpdate: (evaluation: any) => void;
  onStageUpdate: (stage: any) => void;
}

const ExpedienteAnalysis: React.FC<ExpedienteAnalysisProps> = ({
  procedureId,
  procedureType,
  onEvaluationUpdate,
  onStageUpdate,
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'legal' | 'technical' | 'timeline'>('legal');

  // Dummy data for legal checklist
  const legalChecklist = {
    legalExistence: true,
    rtuStatus: true,
    notarialDocs: false,
    legalRepresentation: true,
    observations: 'Pendiente actualización de documentos notariales'
  };

  // Dummy data for technical checklist
  const technicalChecklist = {
    minimumInvestment: {
      declaredAmount: 500000,
      requiredAmount: 250000,
      isValid: true
    },
    requiredDocs: {
      businessPlan: {
        status: 'delivered',
        comments: 'Plan de negocios completo y detallado'
      },
      financialStatements: {
        status: 'incomplete',
        comments: 'Faltan notas a los estados financieros'
      },
      technicalStudy: {
        status: 'delivered',
        comments: 'Estudio técnico aprobado'
      }
    },
    observations: 'Se requiere actualización de estados financieros'
  };

  // Dummy data for timeline
  const timelineStages = [
    {
      id: '1',
      name: 'Recepción de documentos',
      startDate: '2025-03-01T10:00:00Z',
      endDate: '2025-03-01T11:00:00Z',
      status: 'completed',
      assignedTo: {
        name: 'María García',
        role: 'Recepción'
      },
      comments: ['Documentación completa recibida']
    },
    {
      id: '2',
      name: 'Análisis Legal',
      startDate: '2025-03-02T09:00:00Z',
      status: 'in_progress',
      assignedTo: {
        name: 'Juan Pérez',
        role: 'Asesor Legal'
      },
      comments: ['Revisión de documentos notariales en proceso']
    },
    {
      id: '3',
      name: 'Análisis Técnico',
      status: 'pending',
      comments: []
    }
  ];

  const userCanEvaluate = user?.role === 'evaluator' || user?.role === 'legal' || user?.role === 'admin';

  const renderLegalChecklist = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {[
          { key: 'legalExistence', label: 'Verificación de existencia legal' },
          { key: 'rtuStatus', label: 'Cumplimiento de RTU actualizado' },
          { key: 'notarialDocs', label: 'Documentos notariales válidos' },
          { key: 'legalRepresentation', label: 'Nombramiento del Representante Legal' },
        ].map(({ key, label }) => (
          <div key={key} className="flex items-start p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              checked={legalChecklist[key as keyof typeof legalChecklist] as boolean}
              onChange={() => {}}
              className="h-4 w-4 text-[#005bac] focus:ring-[#005bac] border-gray-300 rounded"
              disabled={!userCanEvaluate}
            />
            <div className="ml-3">
              <label className="text-sm font-medium text-gray-900">{label}</label>
              <textarea
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#005bac] focus:ring focus:ring-[#005bac] focus:ring-opacity-50 text-sm"
                rows={2}
                placeholder="Observaciones..."
                value={legalChecklist.observations}
                onChange={() => {}}
                disabled={!userCanEvaluate}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTechnicalChecklist = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Inversión Mínima</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Monto Declarado</label>
            <input
              type="number"
              value={technicalChecklist.minimumInvestment.declaredAmount}
              onChange={() => {}}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#005bac] focus:ring focus:ring-[#005bac] focus:ring-opacity-50"
              disabled={!userCanEvaluate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Monto Requerido</label>
            <input
              type="number"
              value={technicalChecklist.minimumInvestment.requiredAmount}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {technicalChecklist.minimumInvestment.isValid ? (
            <div className="flex items-center text-green-700">
              <CheckCircle size={20} className="mr-2" />
              <span>Cumple con la inversión mínima requerida</span>
            </div>
          ) : (
            <div className="flex items-center text-red-700">
              <XCircle size={20} className="mr-2" />
              <span>No cumple con la inversión mínima requerida</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Documentos Requeridos</h3>
        <div className="space-y-4">
          {Object.entries(technicalChecklist.requiredDocs).map(([docKey, doc]) => (
            <div key={docKey} className="flex items-start">
              <select
                value={doc.status}
                onChange={() => {}}
                className="block rounded-md border-gray-300 shadow-sm focus:border-[#005bac] focus:ring focus:ring-[#005bac] focus:ring-opacity-50"
                disabled={!userCanEvaluate}
              >
                <option value="delivered">Entregado</option>
                <option value="incomplete">Incompleto</option>
                <option value="missing">No entregado</option>
              </select>
              <div className="ml-3 flex-1">
                <label className="block text-sm font-medium text-gray-900">
                  {docKey.split(/(?=[A-Z])/).join(' ')}
                </label>
                <textarea
                  value={doc.comments}
                  onChange={() => {}}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#005bac] focus:ring focus:ring-[#005bac] focus:ring-opacity-50 text-sm"
                  rows={2}
                  placeholder="Observaciones..."
                  disabled={!userCanEvaluate}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Observaciones Generales</h3>
        <textarea
          value={technicalChecklist.observations}
          onChange={() => {}}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#005bac] focus:ring focus:ring-[#005bac] focus:ring-opacity-50"
          rows={4}
          placeholder="Ingrese sus observaciones..."
          disabled={!userCanEvaluate}
        />
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="flow-root">
      <ul className="-mb-8">
        {timelineStages.map((stage, stageIdx) => (
          <li key={stage.id}>
            <div className="relative pb-8">
              {stageIdx !== timelineStages.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                    stage.status === 'completed' ? 'bg-green-500' :
                    stage.status === 'in_progress' ? 'bg-blue-500' :
                    'bg-gray-400'
                  }`}>
                    {stage.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : stage.status === 'in_progress' ? (
                      <Clock className="h-5 w-5 text-white" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-white" />
                    )}
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{stage.name}</p>
                    {stage.assignedTo && (
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <User size={16} className="mr-1.5" />
                        <span>{stage.assignedTo.name}</span>
                      </div>
                    )}
                    {stage.comments.length > 0 && (
                      <div className="mt-2">
                        {stage.comments.map((comment, idx) => (
                          <p key={idx} className="text-sm text-gray-500">{comment}</p>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    {stage.startDate && (
                      <time dateTime={stage.startDate}>
                        {new Date(stage.startDate).toLocaleDateString()}
                      </time>
                    )}
                    {stage.endDate && (
                      <>
                        {' - '}
                        <time dateTime={stage.endDate}>
                          {new Date(stage.endDate).toLocaleDateString()}
                        </time>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          {[
            { id: 'legal', label: 'Análisis Legal' },
            { id: 'technical', label: 'Análisis Técnico' },
            { id: 'timeline', label: 'Línea de Tiempo' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`
                w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-[#005bac] text-[#005bac]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'legal' && renderLegalChecklist()}
        {activeTab === 'technical' && renderTechnicalChecklist()}
        {activeTab === 'timeline' && renderTimeline()}
      </div>
    </div>
  );
};

export default ExpedienteAnalysis;