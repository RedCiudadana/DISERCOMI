import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { Download, Filter, Search, Calendar, User, FileText, Info } from 'lucide-react';
import * as XLSX from 'xlsx';
import Hero from '../../components/ui/Hero';

interface BitacoraLog {
  id: string;
  timestamp: string;
  user_name: string;
  role: string;
  action_type: string;
  resource_type: string;
  resource_id: string;
  description: string;
  changes?: Record<string, any>;
  ip_address?: string;
  device_info?: string;
}

const BitacoraLogs: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<BitacoraLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: '',
  });
  const [actionTypeFilter, setActionTypeFilter] = useState('all');
  const [resourceTypeFilter, setResourceTypeFilter] = useState('all');
  
  // Modal state
  const [selectedLog, setSelectedLog] = useState<BitacoraLog | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      // TODO: Reemplazar con la consulta real al backend
      const response = await fetch('/api/bitacora');
      const data = await response.json();
      setLogs(data);
    } catch (err) {
      setError('Error al cargar los registros de bitácora');
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource_id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesActionType = actionTypeFilter === 'all' || log.action_type === actionTypeFilter;
    const matchesResourceType = resourceTypeFilter === 'all' || log.resource_type === resourceTypeFilter;
    
    const logDate = new Date(log.timestamp);
    const matchesDateRange = 
      (!dateRange.start || logDate >= new Date(dateRange.start)) &&
      (!dateRange.end || logDate <= new Date(dateRange.end));
    
    return matchesSearch && matchesActionType && matchesResourceType && matchesDateRange;
  });

  const exportToExcel = () => {
    const data = filteredLogs.map(log => ({
      'Fecha': new Date(log.timestamp).toLocaleString(),
      'Usuario': log.user_name,
      'Rol': log.role,
      'Acción': log.action_type,
      'Recurso': log.resource_type,
      'ID Recurso': log.resource_id,
      'Descripción': log.description,
      'IP': log.ip_address,
      'Dispositivo': log.device_info,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Bitácora");
    XLSX.writeFile(wb, "bitacora-actividad.xlsx");
  };

  const actionTypeColors: Record<string, string> = {
    'Login': 'bg-green-100 text-green-800',
    'Logout': 'bg-gray-100 text-gray-800',
    'View': 'bg-blue-100 text-blue-800',
    'Create': 'bg-purple-100 text-purple-800',
    'Update': 'bg-yellow-100 text-yellow-800',
    'Delete': 'bg-red-100 text-red-800',
    'State Change': 'bg-indigo-100 text-indigo-800',
    'Download': 'bg-cyan-100 text-cyan-800',
    'Error': 'bg-red-100 text-red-800',
    'Other': 'bg-gray-100 text-gray-800',
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Bitácora de Actividades"
        subtitle="Registro detallado de todas las acciones realizadas en el sistema"
        image="https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bitácora de Actividades</h1>
            <p className="mt-1 text-sm text-gray-500">
              Registro de todas las acciones realizadas en el sistema
            </p>
          </div>
          <Button
            onClick={exportToExcel}
            variant="outline"
          >
            <Download size={20} className="mr-2" />
            Exportar
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por usuario o descripción..."
                  className="pl-10 focus:ring-[#005bac] focus:border-[#005bac] block w-full rounded-md border-gray-300 shadow-sm"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex space-x-2">
                <div className="w-1/2">
                  <input
                    type="date"
                    className="focus:ring-[#005bac] focus:border-[#005bac] block w-full rounded-md border-gray-300 shadow-sm"
                    value={dateRange.start}
                    onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="date"
                    className="focus:ring-[#005bac] focus:border-[#005bac] block w-full rounded-md border-gray-300 shadow-sm"
                    value={dateRange.end}
                    onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
                  />
                </div>
              </div>

              <select
                className="focus:ring-[#005bac] focus:border-[#005bac] block w-full rounded-md border-gray-300 shadow-sm"
                value={actionTypeFilter}
                onChange={e => setActionTypeFilter(e.target.value)}
              >
                <option value="all">Todas las acciones</option>
                <option value="Login">Login</option>
                <option value="Logout">Logout</option>
                <option value="View">Visualización</option>
                <option value="Create">Creación</option>
                <option value="Update">Actualización</option>
                <option value="Delete">Eliminación</option>
                <option value="State Change">Cambio de Estado</option>
                <option value="Download">Descarga</option>
                <option value="Error">Error</option>
              </select>

              <select
                className="focus:ring-[#005bac] focus:border-[#005bac] block w-full rounded-md border-gray-300 shadow-sm"
                value={resourceTypeFilter}
                onChange={e => setResourceTypeFilter(e.target.value)}
              >
                <option value="all">Todos los recursos</option>
                <option value="Trámite">Trámites</option>
                <option value="Expediente">Expedientes</option>
                <option value="Usuario">Usuarios</option>
                <option value="Documento">Documentos</option>
                <option value="Sistema">Sistema</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha/Hora
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recurso
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Detalles
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.user_name}</div>
                      <div className="text-sm text-gray-500">{log.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${actionTypeColors[log.action_type]}`}>
                        {log.action_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.resource_type}</div>
                      <div className="text-sm text-gray-500">{log.resource_id}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {log.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.changes && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                        >
                          <Info size={16} className="mr-1" />
                          Ver
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Modal */}
        {selectedLog && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Detalles del Registro</h3>
              </div>
              <div className="px-6 py-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Usuario</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedLog.user_name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Rol</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedLog.role}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">IP</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedLog.ip_address || 'N/A'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Dispositivo</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedLog.device_info || 'N/A'}</dd>
                  </div>
                  {selectedLog.changes && (
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Cambios</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                          {JSON.stringify(selectedLog.changes, null, 2)}
                        </pre>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelectedLog(null)}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BitacoraLogs;