import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProcedures } from '../../context/ProcedureContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import FileUpload from '../../components/ui/FileUpload';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

type FormStep = 'businessInfo' | 'documents' | 'review' | 'confirmation';

const ProcedureForm: React.FC = () => {
  const navigate = useNavigate();
  const { createNewProcedure, loading, error } = useProcedures();
  
  const [currentStep, setCurrentStep] = useState<FormStep>('businessInfo');
  const [createdProcedure, setCreatedProcedure] = useState<Procedure | null>(null);
  const [legalConfirmation, setLegalConfirmation] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'Calificación para el Decreto 29-89',
    companyName: '',
    companyNit: '',
    address: '',
    sector: '',
    legalRepName: '',
    legalRepDPI: '',
    registroMercantil: '',
    email: '',
    phone: '',
  });
  
  const [documents, setDocuments] = useState({
    patenteComercio: null as File | null,
    rtu: null as File | null,
    dpi: null as File | null,
    estadosFinancieros: null as File | null,
    planInversion: null as File | null,
  });
  
  const [formErrors, setFormErrors] = useState({
    companyName: '',
    companyNit: '',
    address: '',
    sector: '',
    legalRepName: '',
    legalRepDPI: '',
    registroMercantil: '',
    email: '',
    phone: '',
    documents: '',
    patenteComercio: '',
    rtu: '',
    dpi: '',
    estadosFinancieros: '',
    planInversion: '',
  });
  
  const productiveSectors = [
    { value: 'industria', label: 'Industria' },
    { value: 'maquila', label: 'Maquila' },
    { value: 'manufactura', label: 'Manufactura' },
    { value: 'servicios', label: 'Servicios' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleFileChange = (type: keyof typeof documents, file: File | null) => {
    setDocuments(prev => ({ ...prev, [type]: file }));
    setFormErrors(prev => ({ ...prev, [type]: '' }));
  };

  const validateBusinessInfo = () => {
    let isValid = true;
    const errors = { ...formErrors };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{8,}$/;

    if (!formData.companyName) {
      errors.companyName = 'El nombre de la empresa es requerido';
      isValid = false;
    }

    if (!formData.companyNit) {
      errors.companyNit = 'El NIT de la empresa es requerido';
      isValid = false;
    }

    if (!formData.legalRepName) {
      errors.legalRepName = 'El nombre del representante legal es requerido';
      isValid = false;
    }

    if (!formData.legalRepDPI) {
      errors.legalRepDPI = 'El DPI del representante legal es requerido';
      isValid = false;
    }

    if (!formData.registroMercantil) {
      errors.registroMercantil = 'El número de registro mercantil es requerido';
      isValid = false;
    }

    if (!formData.address) {
      errors.address = 'La dirección es requerida';
      isValid = false;
    }

    if (!formData.sector) {
      errors.sector = 'El sector productivo es requerido';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    if (!formData.phone) {
      errors.phone = 'El número de teléfono es requerido';
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Ingrese un número de teléfono válido';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateDocuments = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!documents.patenteComercio) {
      errors.patenteComercio = 'La Patente de Comercio es requerida';
      isValid = false;
    }

    if (!documents.rtu) {
      errors.rtu = 'El RTU actualizado es requerido';
      isValid = false;
    }

    if (!documents.dpi) {
      errors.dpi = 'El DPI del Representante Legal es requerido';
      isValid = false;
    }

    if (!documents.estadosFinancieros) {
      errors.estadosFinancieros = 'Los Estados Financieros son requeridos';
      isValid = false;
    }

    if (!documents.planInversion) {
      errors.planInversion = 'El Plan de Inversión es requerido';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === 'businessInfo') {
      if (!validateBusinessInfo()) return;
      setCurrentStep('documents');
    } else if (currentStep === 'documents') {
      if (!validateDocuments()) return;
      setCurrentStep('review');
    }
  };

  const handleBack = () => {
    if (currentStep === 'documents') {
      setCurrentStep('businessInfo');
    } else if (currentStep === 'review') {
      setCurrentStep('documents');
    }
  };

  const handleSubmit = async () => {
    if (!legalConfirmation) {
      setFormErrors(prev => ({
        ...prev,
        legal: 'Debe confirmar que la información es correcta'
      }));
      return;
    }

    try {
      const allDocuments = Object.entries(documents)
        .filter(([_, file]) => file !== null)
        .map(([key, file]) => ({
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file!.name,
          url: URL.createObjectURL(file!),
          type: file!.type,
          uploadedAt: new Date().toISOString(),
        }));
      
      const newProcedure = await createNewProcedure({
        userId: 'default-user',
        type: formData.type,
        companyName: formData.companyName,
        companyNit: formData.companyNit,
        address: formData.address,
        sector: formData.sector,
        documents: allDocuments,
        isPaid: false,
        isSigned: false,
        legalRepName: formData.legalRepName,
        legalRepDPI: formData.legalRepDPI,
        registroMercantil: formData.registroMercantil,
        email: formData.email,
        phone: formData.phone,
      });
      
      setCreatedProcedure(newProcedure);
      setCurrentStep('confirmation');
    } catch (err) {
      // Error handled by ProcedureContext
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'businessInfo', label: 'Información Empresarial' },
      { key: 'documents', label: 'Documentos' },
      { key: 'review', label: 'Revisión' },
    ];
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center 
                    ${currentStep === step.key ? 'bg-[#005bac] text-white' : 
                      index < steps.findIndex(s => s.key === currentStep) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}
                  `}
                >
                  {index < steps.findIndex(s => s.key === currentStep) ? (
                    <Check size={20} />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="text-xs mt-2 font-medium text-gray-600">{step.label}</div>
              </div>
              
              {index < steps.length - 1 && (
                <div 
                  className={`
                    h-1 flex-1 mx-2
                    ${index < steps.findIndex(s => s.key === currentStep) ? 'bg-green-500' : 'bg-gray-200'}
                  `}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderBusinessInfoStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Información Empresarial</h2>
          <p className="text-gray-600 mb-6">
            Complete la información requerida para su solicitud de Calificación bajo el Decreto 29-89.
          </p>
        </div>
        
        <Input
          id="companyName"
          name="companyName"
          label="Nombre de la Empresa"
          value={formData.companyName}
          onChange={handleInputChange}
          error={formErrors.companyName}
          fullWidth
        />
        
        <Input
          id="companyNit"
          name="companyNit"
          label="NIT de la Empresa"
          value={formData.companyNit}
          onChange={handleInputChange}
          error={formErrors.companyNit}
          fullWidth
        />

        <Input
          id="legalRepName"
          name="legalRepName"
          label="Nombre del Representante Legal"
          value={formData.legalRepName}
          onChange={handleInputChange}
          error={formErrors.legalRepName}
          fullWidth
        />

        <Input
          id="legalRepDPI"
          name="legalRepDPI"
          label="DPI del Representante Legal"
          value={formData.legalRepDPI}
          onChange={handleInputChange}
          error={formErrors.legalRepDPI}
          fullWidth
        />

        <Input
          id="registroMercantil"
          name="registroMercantil"
          label="Número de Registro Mercantil"
          value={formData.registroMercantil}
          onChange={handleInputChange}
          error={formErrors.registroMercantil}
          fullWidth
        />
        
        <Input
          id="address"
          name="address"
          label="Dirección"
          value={formData.address}
          onChange={handleInputChange}
          error={formErrors.address}
          fullWidth
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Correo Electrónico"
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
          fullWidth
        />

        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Teléfono"
          value={formData.phone}
          onChange={handleInputChange}
          error={formErrors.phone}
          placeholder="+502 XXXX-XXXX"
          fullWidth
        />
        
        <Select
          id="sector"
          label="Sector Productivo"
          options={productiveSectors}
          value={formData.sector}
          onChange={(value) => handleSelectChange('sector', value)}
          error={formErrors.sector}
          fullWidth
        />
      </div>
    );
  };

  const renderDocumentsStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Documentos Requeridos</h2>
          <p className="text-gray-600 mb-6">
            Cargue los documentos necesarios para su trámite de calificación.
          </p>
        </div>
        
        <div className="space-y-6">
          <FileUpload
            label="Patente de Comercio"
            accept=".pdf"
            onChange={(files) => handleFileChange('patenteComercio', files[0] || null)}
            error={formErrors.patenteComercio}
            helperText="Formato PDF requerido"
          />

          <FileUpload
            label="RTU Actualizado"
            accept=".pdf"
            onChange={(files) => handleFileChange('rtu', files[0] || null)}
            error={formErrors.rtu}
            helperText="Formato PDF requerido"
          />

          <FileUpload
            label="DPI del Representante Legal"
            accept=".pdf,.jpg,.jpeg"
            onChange={(files) => handleFileChange('dpi', files[0] || null)}
            error={formErrors.dpi}
            helperText="Formato PDF o JPG requerido"
          />

          <FileUpload
            label="Estados Financieros"
            accept=".pdf"
            onChange={(files) => handleFileChange('estadosFinancieros', files[0] || null)}
            error={formErrors.estadosFinancieros}
            helperText="Formato PDF requerido"
          />

          <FileUpload
            label="Plan de Inversión"
            accept=".pdf"
            onChange={(files) => handleFileChange('planInversion', files[0] || null)}
            error={formErrors.planInversion}
            helperText="Formato PDF requerido"
          />
        </div>
      </div>
    );
  };

  const renderReviewStep = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Revisión de Solicitud</h2>
          <p className="text-gray-600 mb-6">
            Verifique que la información ingresada sea correcta antes de enviar su solicitud.
          </p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h3 className="font-medium text-lg text-gray-900">Información del Trámite</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Tipo de Trámite</p>
              <p className="text-base text-gray-900">{formData.type}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Nombre de la Empresa</p>
              <p className="text-base text-gray-900">{formData.companyName}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">NIT de la Empresa</p>
              <p className="text-base text-gray-900">{formData.companyNit}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Representante Legal</p>
              <p className="text-base text-gray-900">{formData.legalRepName}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">DPI Representante Legal</p>
              <p className="text-base text-gray-900">{formData.legalRepDPI}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Registro Mercantil</p>
              <p className="text-base text-gray-900">{formData.registroMercantil}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Dirección</p>
              <p className="text-base text-gray-900">{formData.address}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Sector Productivo</p>
              <p className="text-base text-gray-900">
                {productiveSectors.find(s => s.value === formData.sector)?.label || formData.sector}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
              <p className="text-base text-gray-900">{formData.email}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Teléfono</p>
              <p className="text-base text-gray-900">{formData.phone}</p>
            </div>
          </div>
          
          <h3 className="font-medium text-lg text-gray-900 mt-6">Documentos Cargados</h3>
          
          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
            {Object.entries(documents).map(([key, file]) => (
              <li key={key} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div className="w-0 flex-1 flex items-center">
                  <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="ml-2 flex-1 w-0 truncate">
                    {file?.name}
                  </span>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="font-medium text-gray-900">
                    {(file?.size ? (file.size / 1024 / 1024).toFixed(2) : 0)} MB
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <input
                  id="legal-confirmation"
                  name="legal-confirmation"
                  type="checkbox"
                  className="h-4 w-4 text-[#005bac] focus:ring-[#005bac] border-gray-300 rounded"
                  checked={legalConfirmation}
                  onChange={(e) => setLegalConfirmation(e.target.checked)}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="legal-confirmation" className="text-sm text-gray-700">
                  Confirmo que toda la información proporcionada es correcta y verídica. Entiendo que proporcionar información falsa puede resultar en sanciones legales.
                </label>
                {formErrors.legal && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.legal}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmationStep = () => {
    if (!createdProcedure) return null;
    
    return (
      <div className="text-center py-8">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <Check size={32} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">¡Solicitud Enviada!</h2>
        <p className="text-gray-600 mb-4">
          Su trámite ha sido recibido y está siendo procesado. Puede consultar el estado del mismo en su panel de trámites.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <p className="text-sm text-blue-800 font-medium mb-2">Código de Seguimiento:</p>
          <p className="text-2xl font-bold text-blue-900">{createdProcedure.trackingCode}</p>
          <p className="text-xs text-blue-700 mt-2">
            Guarde este código para dar seguimiento a su trámite
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate('/procedures/new')}
          >
            Iniciar Nuevo Trámite
          </Button>
          <Button
            onClick={() => navigate('/procedures')}
          >
            Ver Mis Trámites
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {currentStep !== 'confirmation' && (
        <>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Nuevo Trámite: {formData.type}
          </h1>
          <p className="text-gray-500 mb-8">
            Complete el formulario para iniciar su trámite de calificación bajo el Decreto 29-89.
          </p>
        </>
      )}
      
      {currentStep !== 'confirmation' && renderStepIndicator()}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white p-6 shadow rounded-lg">
        {currentStep === 'businessInfo' && renderBusinessInfoStep()}
        {currentStep === 'documents' && renderDocumentsStep()}
        {currentStep === 'review' && renderReviewStep()}
        {currentStep === 'confirmation' && renderConfirmationStep()}
        
        {currentStep !== 'confirmation' && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep !== 'businessInfo' && (
              <Button
                variant="outline"
                onClick={handleBack}
              >
                <ArrowLeft size={20} className="mr-2" />
                Anterior
              </Button>
            )}
            
            {currentStep === 'review' ? (
              <Button
                onClick={handleSubmit}
                isLoading={loading}
              >
                Enviar Solicitud
                <ArrowRight size={20} className="ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
              >
                Siguiente
                <ArrowRight size={20} className="ml-2" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcedureForm;