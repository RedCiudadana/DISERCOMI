import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos y Condiciones</h1>
      
      <div className="prose max-w-none space-y-6 text-gray-600">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar la plataforma de DISERCOMI, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos, no debe utilizar este servicio.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Uso del Servicio</h2>
          <p>
            La plataforma está diseñada para facilitar trámites relacionados con el comercio exterior y la inversión. Los usuarios se comprometen a:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Proporcionar información verdadera y actualizada</li>
            <li>Mantener la confidencialidad de sus credenciales de acceso</li>
            <li>Utilizar el servicio de manera legal y apropiada</li>
            <li>No interferir con la seguridad o funcionalidad del sistema</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Privacidad y Datos Personales</h2>
          <p>
            DISERCOMI se compromete a proteger su privacidad y manejar sus datos personales de acuerdo con la legislación vigente. La información proporcionada será utilizada únicamente para los fines específicos del trámite solicitado.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Responsabilidades</h2>
          <p>
            Los usuarios son responsables de:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>La veracidad de la información proporcionada</li>
            <li>El uso apropiado de la plataforma</li>
            <li>Mantener actualizada su información de contacto</li>
            <li>Cumplir con los requisitos y plazos establecidos</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Modificaciones</h2>
          <p>
            DISERCOMI se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en la plataforma.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;