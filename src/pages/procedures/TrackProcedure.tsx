import React, { useState } from 'react';
import { getProcedureByTrackingCode } from '../../services/api';
import { Procedure } from '../../types';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import StatusBadge from '../../components/ui/StatusBadge';
import { Search, FileText, Calendar, User, Building, Hash, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Hero from '../../components/ui/Hero';

const TrackProcedure: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [procedure, setProcedure] = useState<Procedure | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim()) return;

    setLoading(true);
    setError(null);
    setProcedure(null);

    try {
      const result = await getProcedureByTrackingCode(trackingCode.trim());
      if (result) {
        setProcedure(result);
      } else {
        setError('No se encontró ningún trámite con ese código de seguimiento');
      }
    } catch (err) {
      setError('Error al buscar el trámite. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'in_review':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <>
      <Hero
        title="Seguimiento de Trámites"
        subtitle="Consulte el estado actual e historial de sus trámites en proceso"
        image="https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg"
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Seguimiento de Trámite
          </h1>
          <p className="text-gray-600">
            Ingrese el código de seguimiento de su trámite para ver su estado actual
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 focus:ring-[#005bac] focus:border-[#005bac] block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Ingrese el código de seguimiento"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
              />
            </div>
            <Button type="submit" isLoading={loading}>
              <Search size={20} className="mr-2" />
              Buscar
            </Button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {procedure && (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {procedure.type}
                  </h2>
                  <div className="flex items-center mt-1">
                    <Hash size={16} className="text-gray-400 mr-1" />
                    <p className="text-sm text-gray-500">
                      Código: <span className="font-mono font-medium">{procedure.trackingCode}</span>
                    </p>
                  </div>
                </div>
                <StatusBadge status={procedure.status} size="lg" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <Building size={16} className="mr-2" />
                    Información de la Empresa
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-sm font-medium text-gray-900">
                      {procedure.companyName}
                    </p>
                    <p className="text-sm text-gray-600">NIT: {procedure.companyNit}</p>
                    <p className="text-sm text-gray-600">{procedure.address}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Fechas
                  </h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <p className="text-sm text-gray-600">
                      Solicitud: {new Date(procedure.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Última actualización: {new Date(procedure.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                  <FileText size={16} className="mr-2" />
                  Documentos Cargados
                </h3>
                <div className="bg-gray-50 rounded-md divide-y divide-gray-200">
                  {procedure.documents.map((doc, index) => (
                    <div key={index} className="p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText size={16} className="text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            Subido el {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Timeline */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Historial del Trámite</h3>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {procedure.comments.map((comment, commentIdx) => (
                      <li key={comment.id}>
                        <div className="relative pb-8">
                          {commentIdx !== procedure.comments.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                                {getStatusIcon(comment.type || 'info')}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {comment.text}
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                  Por: {comment.userName}
                                </p>
                              </div>
                              <div className="text-right text-xs whitespace-nowrap text-gray-500">
                                <time dateTime={comment.createdAt}>
                                  {new Date(comment.createdAt).toLocaleString()}
                                </time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Si tiene preguntas sobre su trámite, puede contactarnos al{' '}
            <a href="tel:+50224120200" className="text-[#005bac] hover:text-[#004a8f]">
              +502 2412-0200
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default TrackProcedure;