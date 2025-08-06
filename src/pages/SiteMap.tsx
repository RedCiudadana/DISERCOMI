import React from 'react';
import { Link } from 'react-router-dom';

const SiteMap: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mapa del Sitio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Trámites</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/procedures/new" className="text-[#005bac] hover:text-[#004a8f]">
                Iniciar Nuevo Trámite
              </Link>
            </li>
            <li>
              <Link to="/procedures" className="text-[#005bac] hover:text-[#004a8f]">
                Mis Trámites
              </Link>
            </li>
            <li>
              <Link to="/track" className="text-[#005bac] hover:text-[#004a8f]">
                Seguimiento de Trámite
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Administración</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="text-[#005bac] hover:text-[#004a8f]">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/expediente" className="text-[#005bac] hover:text-[#004a8f]">
                Análisis de Expedientes
              </Link>
            </li>
            <li>
              <Link to="/admin/bitacora" className="text-[#005bac] hover:text-[#004a8f]">
                Bitácora
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Documentación</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/disercomi" className="text-[#005bac] hover:text-[#004a8f]">
                Acerca de DISERCOMI
              </Link>
            </li>
            <li>
              <Link to="/documentation" className="text-[#005bac] hover:text-[#004a8f]">
                Documentación General
              </Link>
            </li>
            <li>
              <Link to="/process-flow" className="text-[#005bac] hover:text-[#004a8f]">
                Flujo del Proceso
              </Link>
            </li>
            {/* <li>
              <Link to="/api-docs" className="text-[#005bac] hover:text-[#004a8f]">
                API
              </Link>
            </li> */}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Autenticación</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/login" className="text-[#005bac] hover:text-[#004a8f]">
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-[#005bac] hover:text-[#004a8f]">
                Registrarse
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Legal</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="text-[#005bac] hover:text-[#004a8f]">
                Términos y Condiciones
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-[#005bac] hover:text-[#004a8f]">
                Política de Privacidad
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SiteMap;