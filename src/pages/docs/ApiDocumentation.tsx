import React from 'react';
import { Check } from 'lucide-react';

const ApiDocumentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
      <p className="text-gray-600 mb-8">
        Esta documentación describe cómo integrar su aplicación con nuestra API de trámites.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Endpoints Disponibles</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Listar Trámites</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <code className="text-sm font-mono">GET /procedures-api</code>
              </div>
              <p className="text-gray-600 mb-4">Retorna una lista de todos los trámites con información básica.</p>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify({
                    id: "string",
                    tracking_code: "string",
                    type: "string",
                    status: "string",
                    company_name: "string",
                    company_nit: "string",
                    created_at: "string",
                    updated_at: "string"
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Obtener Trámite por ID</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <code className="text-sm font-mono">GET /procedures-api/:id</code>
              </div>
              <p className="text-gray-600 mb-4">Retorna información detallada de un trámite específico.</p>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify({
                    id: "string",
                    tracking_code: "string",
                    type: "string",
                    status: "string",
                    company_name: "string",
                    company_nit: "string",
                    address: "string",
                    sector: "string",
                    legal_rep_name: "string",
                    legal_rep_dpi: "string",
                    registro_mercantil: "string",
                    email: "string",
                    phone: "string",
                    created_at: "string",
                    updated_at: "string",
                    is_paid: "boolean",
                    is_signed: "boolean",
                    documents: [{
                      id: "string",
                      name: "string",
                      url: "string",
                      type: "string",
                      uploaded_at: "string"
                    }],
                    comments: [{
                      id: "string",
                      user_id: "string",
                      user_name: "string",
                      text: "string",
                      type: "string",
                      created_at: "string"
                    }]
                  }, null, 2)}
                </pre>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Buscar por Código de Seguimiento</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <code className="text-sm font-mono">GET /procedures-api/tracking/:code</code>
              </div>
              <p className="text-gray-600 mb-4">Busca un trámite por su código de seguimiento.</p>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  {JSON.stringify({
                    id: "string",
                    tracking_code: "string",
                    type: "string",
                    status: "string",
                    company_name: "string",
                    company_nit: "string",
                    created_at: "string",
                    updated_at: "string",
                    comments: [{
                      id: "string",
                      user_name: "string",
                      text: "string",
                      type: "string",
                      created_at: "string"
                    }]
                  }, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApiDocumentation;