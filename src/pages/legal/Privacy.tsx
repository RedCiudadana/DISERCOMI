import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad y Seguridad</h1>
      
      <div className="prose max-w-none space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Protección de Datos</h2>
          <p>
            DISERCOMI implementa medidas de seguridad técnicas y organizativas para proteger sus datos personales, incluyendo:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Encriptación de datos sensibles</li>
            <li>Autenticación de dos factores</li>
            <li>Monitoreo continuo de seguridad</li>
            <li>Respaldos periódicos de información</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recopilación de Información</h2>
          <p>
            Recopilamos la siguiente información para procesar sus trámites:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Datos de identificación personal</li>
            <li>Información empresarial</li>
            <li>Documentos legales</li>
            <li>Registros de actividad en la plataforma</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Uso de la Información</h2>
          <p>
            Su información será utilizada exclusivamente para:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Procesar sus trámites</li>
            <li>Verificar su identidad</li>
            <li>Comunicar actualizaciones importantes</li>
            <li>Cumplir con requisitos legales</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seguridad de la Plataforma</h2>
          <p>
            Nuestra plataforma implementa las siguientes medidas de seguridad:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Certificados SSL/TLS para conexiones seguras</li>
            <li>Firewalls y sistemas de detección de intrusiones</li>
            <li>Auditorías regulares de seguridad</li>
            <li>Actualizaciones periódicas de seguridad</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Derechos del Usuario</h2>
          <p>
            Usted tiene derecho a:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Acceder a sus datos personales</li>
            <li>Solicitar correcciones de información inexacta</li>
            <li>Solicitar la eliminación de sus datos</li>
            <li>Recibir una copia de sus datos</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Privacy;