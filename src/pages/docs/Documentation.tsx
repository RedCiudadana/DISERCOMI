import React from 'react';
import { Link } from 'react-router-dom';

const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Documentación del Sistema</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trámite de Calificación - Decreto 29-89</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              El sistema permite gestionar el proceso de calificación para obtener beneficios fiscales y aduaneros bajo el régimen de fomento a la exportación.
            </p>
            
            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Proceso del Trámite</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-600">
              <li>
                <strong>Solicitud en línea:</strong> Complete el formulario con la información de su empresa y representante legal.
              </li>
              <li>
                <strong>Validación automática:</strong> El sistema verifica automáticamente:
                <ul className="list-disc pl-6 mt-2">
                  <li>RTU de la empresa con SAT</li>
                  <li>DPI del representante legal con RENAP</li>
                  <li>Estado jurídico en Registro Mercantil</li>
                </ul>
              </li>
              <li>
                <strong>Revisión técnica:</strong> DISERCOMI evalúa la documentación y requisitos.
              </li>
              <li>
                <strong>Resolución:</strong> Se emite la resolución final del trámite.
              </li>
            </ol>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Documentos Requeridos</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Patente de Comercio</li>
              <li>RTU actualizado</li>
              <li>DPI del Representante Legal</li>
              <li>Estados Financieros</li>
              <li>Plan de Inversión</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Seguimiento del Trámite</h3>
            <p className="text-gray-600 mb-4">
              Cada solicitud recibe un código único de seguimiento que permite:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Consultar el estado actual del trámite</li>
              <li>Ver el historial de cambios y comentarios</li>
              <li>Recibir notificaciones de actualizaciones</li>
              <li>Descargar documentos y resoluciones</li>
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">¿Cuánto tiempo toma el proceso?</h3>
              <p className="text-gray-600">
                El tiempo promedio de resolución es de 15 días hábiles, siempre que toda la documentación esté completa y correcta.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">¿Qué sucede si mi solicitud es rechazada?</h3>
              <p className="text-gray-600">
                Recibirá una notificación con los motivos del rechazo y podrá corregir la información o documentación para volver a presentar la solicitud.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">¿Cómo actualizo mi información?</h3>
              <p className="text-gray-600">
                Puede actualizar la información de su empresa y representante legal a través del panel de control una vez que haya iniciado sesión.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;