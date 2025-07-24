import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProcedures } from '../../context/ProcedureContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import StatusBadge from '../../components/ui/StatusBadge';
import { ProcedureStatus } from '../../types';
import { PlusCircle, Search, FileText, Hash } from 'lucide-react';
import Hero from '../../components/ui/Hero';

const ProcedureList: React.FC = () => {
  const { user } = useAuth();
  const { procedures, loading, error, getUserProcedures } = useProcedures();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProcedureStatus | 'all'>('all');

  useEffect(() => {
    getUserProcedures();
  }, [getUserProcedures]);

  const filteredProcedures = procedures.filter(procedure => {
    const matchesSearch = 
      procedure.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
      procedure.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || procedure.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading && procedures.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" type="redciudadana" />
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Gestión de Trámites"
        subtitle="Administre y dé seguimiento a sus trámites en curso de manera eficiente y transparente"
        image="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mis Trámites</h1>
            <p className="mt-1 text-sm text-gray-500">
              Administre y de seguimiento a sus trámites en curso
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/procedures/new">
              <Button>
                <PlusCircle size={20} className="mr-2" />
                Nuevo Trámite
              </Button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar trámites..."
                  className="pl-10 focus:ring-[#005bac] focus:border-[#005bac] block w-full rounded-md border-gray-300 shadow-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="md:w-48">
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#005bac] focus:ring focus:ring-[#005bac] focus:ring-opacity-50"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value as ProcedureStatus | 'all')}
                >
                  <option value="all">Todos los estados</option>
                  <option value="received">Recibido</option>
                  <option value="in_review">En revisión</option>
                  <option value="approved">Aprobado</option>
                  <option value="rejected">Rechazado</option>
                </select>
              </div>
            </div>
          </div>

          {filteredProcedures.length === 0 ? (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay trámites</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'No se encontraron trámites con los filtros aplicados.'
                  : 'Aún no ha iniciado ningún trámite. Comience creando uno nuevo.'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link to="/procedures/new">
                  <Button>
                    <PlusCircle size={20} className="mr-2" />
                    Nuevo Trámite
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo de Trámite
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Empresa
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProcedures.map(procedure => (
                    <tr key={procedure.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{procedure.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Hash size={16} className="text-gray-400 mr-1" />
                          <span className="text-sm font-mono text-gray-900">{procedure.trackingCode}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{procedure.companyName}</div>
                        <div className="text-sm text-gray-500">{procedure.companyNit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(procedure.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(procedure.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={procedure.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          to={`/procedures/${procedure.id}`}
                          className="text-[#005bac] hover:text-[#004a8f]"
                        >
                          Ver detalles
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcedureList;