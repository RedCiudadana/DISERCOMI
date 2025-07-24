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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Configuración de Supabase</h2>
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <p className="text-gray-600">
              Para comenzar, necesitará configurar su conexión a Supabase:
            </p>
            <ol className="list-decimal pl-6 space-y-4">
              <li className="text-gray-700">
                <strong>Crear proyecto en Supabase:</strong>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Visite <a href="https://supabase.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Supabase</a> y cree una nueva cuenta o inicie sesión</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Cree un nuevo proyecto desde el dashboard</span>
                  </li>
                </ul>
              </li>
              <li className="text-gray-700">
                <strong>Obtener credenciales:</strong>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-start">
                    <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>En la configuración del proyecto, busque la sección "API"</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Copie el "Project URL" y "anon public" key</span>
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </section>

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

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ejemplo de Integración</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <pre className="text-sm bg-gray-50 p-4 rounded-md overflow-x-auto">
{`// Configuración de Supabase
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

// Ejemplo de llamada a la API
const getProcedures = async () => {
  const response = await fetch(\`\${SUPABASE_URL}/functions/v1/procedures-api\`, {
    headers: {
      'Authorization': \`Bearer \${SUPABASE_ANON_KEY}\`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Error al obtener trámites');
  }
  
  return response.json();
};

// Uso del servicio
try {
  const procedures = await getProcedures();
  console.log('Trámites:', procedures);
} catch (error) {
  console.error('Error:', error);
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApiDocumentation;