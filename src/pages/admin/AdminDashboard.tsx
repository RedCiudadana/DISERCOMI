import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProcedures } from '../../context/ProcedureContext';
import { ProcedureStatus } from '../../types';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import StatusBadge from '../../components/ui/StatusBadge';
import { Search, Filter, BarChart3, PieChart, ArrowUpDown, Download, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart as RePieChart, Pie, Cell } from 'recharts';
import { FixedSizeList as List } from 'react-window';
import * as XLSX from 'xlsx';
import Hero from '../../components/ui/Hero';

const ITEMS_PER_PAGE = 10;

const AdminDashboard: React.FC = () => {
  const { procedures, loading, error, getAllProcedures } = useProcedures();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProcedureStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'company'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    getAllProcedures();
  }, [getAllProcedures]);

  // Memoize statistics calculation
  const stats = useMemo(() => ({
    total: procedures.length,
    received: procedures.filter(p => p.status === 'received').length,
    inReview: procedures.filter(p => p.status === 'in_review').length,
    approved: procedures.filter(p => p.status === 'approved').length,
    rejected: procedures.filter(p => p.status === 'rejected').length,
  }), [procedures]);

  // Memoize filtered procedures
  const filteredProcedures = useMemo(() => {
    return procedures.filter(procedure => {
      const matchesSearch = 
        procedure.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
        procedure.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        procedure.companyNit.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || procedure.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [procedures, searchTerm, statusFilter]);

  // Memoize sorted procedures
  const sortedProcedures = useMemo(() => {
    return [...filteredProcedures].sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        const companyA = a.companyName.toLowerCase();
        const companyB = b.companyName.toLowerCase();
        return sortOrder === 'asc'
          ? companyA.localeCompare(companyB)
          : companyB.localeCompare(companyA);
      }
    });
  }, [filteredProcedures, sortBy, sortOrder]);

  // Memoize paginated procedures
  const paginatedProcedures = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProcedures.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProcedures, currentPage]);

  const totalPages = Math.ceil(sortedProcedures.length / ITEMS_PER_PAGE);

  const exportToExcel = useCallback(async () => {
    try {
      setIsExporting(true);
      const data = procedures.map(procedure => ({
        'Tipo de Trámite': procedure.type,
        'Empresa': procedure.companyName,
        'Fecha': new Date(procedure.createdAt).toLocaleDateString(),
        'Estado': procedure.status
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Trámites");
      XLSX.writeFile(wb, "reporte-tramites.xlsx");
    } finally {
      setIsExporting(false);
    }
  }, [procedures]);

  const toggleSort = useCallback((field: 'date' | 'company') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  }, [sortBy, sortOrder]);

  // Memoize chart data
  const chartData = useMemo(() => {
    const monthlyStats = procedures.reduce((acc, proc) => {
      const month = new Date(proc.createdAt).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      monthly: Object.entries(monthlyStats).map(([month, count]) => ({
        month,
        trámites: count
      })),
      pie: [
        { name: 'Recibidos', value: stats.received, color: '#3B82F6' },
        { name: 'En Revisión', value: stats.inReview, color: '#F59E0B' },
        { name: 'Aprobados', value: stats.approved, color: '#10B981' },
        { name: 'Rechazados', value: stats.rejected, color: '#EF4444' }
      ]
    };
  }, [procedures, stats]);

  const ProcedureRow = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const procedure = paginatedProcedures[index];
    if (!procedure) return null;

    return (
      <tr key={procedure.id} className="hover:bg-gray-50" style={style}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">{procedure.type}</div>
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
    );
  }, [paginatedProcedures]);

  if (loading && procedures.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Panel Administrativo"
        subtitle="Gestione y monitoree todos los trámites desde un solo lugar"
        image="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries({
            'Total Trámites': stats.total,
            'Recibidos': stats.received,
            'En Revisión': stats.inReview,
            'Aprobados': stats.approved
          }).map(([label, value]) => (
            <div key={label} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900">{label}</h3>
              <p className="text-3xl font-bold text-[#005bac] mt-2">{value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Trámites por Mes</h3>
            <BarChart width={500} height={300} data={chartData.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="trámites" fill="#3B82F6" />
            </BarChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Distribución por Estado</h3>
            <RePieChart width={400} height={300}>
              <Pie
                data={chartData.pie}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.pie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RePieChart>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar trámites..."
                className="w-full px-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <select
              className="px-4 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as ProcedureStatus | 'all');
                setCurrentPage(1);
              }}
            >
              <option value="all">Todos los estados</option>
              <option value="received">Recibido</option>
              <option value="in_review">En revisión</option>
              <option value="approved">Aprobado</option>
              <option value="rejected">Rechazado</option>
            </select>
            <Button
              onClick={exportToExcel}
              disabled={isExporting}
              isLoading={isExporting}
            >
              <Download size={20} className="mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Procedures Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => toggleSort('date')}
                  >
                    <div className="flex items-center">
                      Fecha
                      <ArrowUpDown size={16} className="ml-1" />
                    </div>
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
                {paginatedProcedures.map((procedure) => (
                  <ProcedureRow
                    key={procedure.id}
                    index={paginatedProcedures.indexOf(procedure)}
                    style={{}}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <Button
                onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando{' '}
                  <span className="font-medium">
                    {((currentPage - 1) * ITEMS_PER_PAGE) + 1}
                  </span>
                  {' '}a{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * ITEMS_PER_PAGE, sortedProcedures.length)}
                  </span>
                  {' '}de{' '}
                  <span className="font-medium">{sortedProcedures.length}</span>
                  {' '}resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                        ${currentPage === page
                          ? 'z-10 bg-[#005bac] border-[#005bac] text-white'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }
                      `}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;