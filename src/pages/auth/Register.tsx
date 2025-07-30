import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Loader, Building, User, MapPin, Eye, EyeOff } from 'lucide-react';
import { validateDPI, validateNIT } from '../../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  
  const [currentStep, setCurrentStep] = useState<'company' | 'representative' | 'account'>('company');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    // Company Information
    companyName: '',
    companyNit: '',
    address: '',
    zone: '',
    municipality: '',
    department: '',
    postalCode: '',
    
    // Legal Representative
    representativeName: '',
    representativeNit: '',
    
    // Account Information
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [formErrors, setFormErrors] = useState({
    companyName: '',
    companyNit: '',
    address: '',
    zone: '',
    municipality: '',
    department: '',
    postalCode: '',
    representativeName: '',
    representativeNit: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: ''
  });
  
  const [validating, setValidating] = useState({
    companyNit: false,
    representativeNit: false
  });
  
  const [validationResults, setValidationResults] = useState({
    companyNit: null as null | { isValid: boolean; companyName?: string; status?: string },
    representativeNit: null as null | { isValid: boolean; name?: string; status?: string }
  });

  // Guatemala departments and municipalities
  const departments = [
    { value: 'guatemala', label: 'Guatemala' },
    { value: 'alta-verapaz', label: 'Alta Verapaz' },
    { value: 'baja-verapaz', label: 'Baja Verapaz' },
    { value: 'chimaltenango', label: 'Chimaltenango' },
    { value: 'chiquimula', label: 'Chiquimula' },
    { value: 'el-progreso', label: 'El Progreso' },
    { value: 'escuintla', label: 'Escuintla' },
    { value: 'huehuetenango', label: 'Huehuetenango' },
    { value: 'izabal', label: 'Izabal' },
    { value: 'jalapa', label: 'Jalapa' },
    { value: 'jutiapa', label: 'Jutiapa' },
    { value: 'peten', label: 'Petén' },
    { value: 'quetzaltenango', label: 'Quetzaltenango' },
    { value: 'quiche', label: 'Quiché' },
    { value: 'retalhuleu', label: 'Retalhuleu' },
    { value: 'sacatepequez', label: 'Sacatepéquez' },
    { value: 'san-marcos', label: 'San Marcos' },
    { value: 'santa-rosa', label: 'Santa Rosa' },
    { value: 'solola', label: 'Sololá' },
    { value: 'suchitepequez', label: 'Suchitepéquez' },
    { value: 'totonicapan', label: 'Totonicapán' },
    { value: 'zacapa', label: 'Zacapa' }
  ];

  const municipalities = {
    guatemala: [
      { value: 'guatemala', label: 'Guatemala' },
      { value: 'santa-catarina-pinula', label: 'Santa Catarina Pinula' },
      { value: 'san-jose-pinula', label: 'San José Pinula' },
      { value: 'san-jose-del-golfo', label: 'San José del Golfo' },
      { value: 'palencia', label: 'Palencia' },
      { value: 'chinautla', label: 'Chinautla' },
      { value: 'san-pedro-ayampuc', label: 'San Pedro Ayampuc' },
      { value: 'mixco', label: 'Mixco' },
      { value: 'san-pedro-sacatepequez', label: 'San Pedro Sacatepéquez' },
      { value: 'san-juan-sacatepequez', label: 'San Juan Sacatepéquez' },
      { value: 'san-raymundo', label: 'San Raymundo' },
      { value: 'chuarrancho', label: 'Chuarrancho' },
      { value: 'fraijanes', label: 'Fraijanes' },
      { value: 'amatitlan', label: 'Amatitlán' },
      { value: 'villa-nueva', label: 'Villa Nueva' },
      { value: 'villa-canales', label: 'Villa Canales' },
      { value: 'san-miguel-petapa', label: 'San Miguel Petapa' }
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is modified
    setFormErrors(prev => ({ ...prev, [name]: '' }));
    
    // Clear validation results when NIT is modified
    if (name === 'companyNit') {
      setValidationResults(prev => ({ ...prev, companyNit: null }));
    } else if (name === 'representativeNit') {
      setValidationResults(prev => ({ ...prev, representativeNit: null }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateCompanyNit = async () => {
    if (!formData.companyNit) {
      setFormErrors(prev => ({ ...prev, companyNit: 'El NIT de la empresa es requerido' }));
      return false;
    }
    
    try {
      setValidating(prev => ({ ...prev, companyNit: true }));
      const response = await validateNIT(formData.companyNit);
      setValidationResults(prev => ({ ...prev, companyNit: response.nit || null }));
      
      if (!response.nit?.isValid) {
        setFormErrors(prev => ({ ...prev, companyNit: 'NIT no encontrado o inválido' }));
        return false;
      }
      
      // If validation is successful, auto-fill company name if empty
      if (response.nit?.companyName && !formData.companyName) {
        setFormData(prev => ({ ...prev, companyName: response.nit!.companyName! }));
      }
      
      return true;
    } catch (err) {
      setFormErrors(prev => ({ ...prev, companyNit: 'Error al validar NIT' }));
      return false;
    } finally {
      setValidating(prev => ({ ...prev, companyNit: false }));
    }
  };

  const validateRepresentativeNit = async () => {
    if (!formData.representativeNit) {
      setFormErrors(prev => ({ ...prev, representativeNit: 'El NIT del representante es requerido' }));
      return false;
    }
    
    try {
      setValidating(prev => ({ ...prev, representativeNit: true }));
      const response = await validateDPI(formData.representativeNit);
      setValidationResults(prev => ({ ...prev, representativeNit: response.dpi || null }));
      
      if (!response.dpi?.isValid) {
        setFormErrors(prev => ({ ...prev, representativeNit: 'NIT no encontrado o inválido' }));
        return false;
      }
      
      // If validation is successful, auto-fill name if empty
      if (response.dpi?.name && !formData.representativeName) {
        setFormData(prev => ({ ...prev, representativeName: response.dpi!.name! }));
      }
      
      return true;
    } catch (err) {
      setFormErrors(prev => ({ ...prev, representativeNit: 'Error al validar NIT' }));
      return false;
    } finally {
      setValidating(prev => ({ ...prev, representativeNit: false }));
    }
  };

  const validateCompanyStep = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!formData.companyName) {
      errors.companyName = 'El nombre de la empresa es requerido';
      isValid = false;
    }

    if (!formData.companyNit) {
      errors.companyNit = 'El NIT de la empresa es requerido';
      isValid = false;
    } else if (!validationResults.companyNit?.isValid) {
      errors.companyNit = 'NIT no validado o inválido';
      isValid = false;
    }

    if (!formData.address) {
      errors.address = 'La dirección es requerida';
      isValid = false;
    }

    if (!formData.zone) {
      errors.zone = 'La zona es requerida';
      isValid = false;
    }

    if (!formData.municipality) {
      errors.municipality = 'El municipio es requerido';
      isValid = false;
    }

    if (!formData.department) {
      errors.department = 'El departamento es requerido';
      isValid = false;
    }

    if (!formData.postalCode) {
      errors.postalCode = 'El código postal es requerido';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateRepresentativeStep = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!formData.representativeName) {
      errors.representativeName = 'El nombre del representante es requerido';
      isValid = false;
    }

    if (!formData.representativeNit) {
      errors.representativeNit = 'El NIT del representante es requerido';
      isValid = false;
    } else if (!validationResults.representativeNit?.isValid) {
      errors.representativeNit = 'NIT no validado o inválido';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateAccountStep = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!formData.email) {
      errors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = 'Debe aceptar los términos y condiciones';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === 'company') {
      if (validateCompanyStep()) {
        setCurrentStep('representative');
      }
    } else if (currentStep === 'representative') {
      if (validateRepresentativeStep()) {
        setCurrentStep('account');
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'representative') {
      setCurrentStep('company');
    } else if (currentStep === 'account') {
      setCurrentStep('representative');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAccountStep()) return;
    
    try {
      await register({
        name: formData.representativeName,
        email: formData.email,
        dpi: formData.representativeNit,
        nit: formData.companyNit
      });
      navigate('/procedures');
    } catch (err) {
      // Error will be handled by the AuthContext
    }
  };

  const renderValidationStatus = (field: 'companyNit' | 'representativeNit') => {
    const validation = validationResults[field];
    
    if (validating[field]) {
      return (
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <Loader size={16} className="animate-spin mr-1" />
          <span>Validando...</span>
        </div>
      );
    }
    
    if (validation) {
      if (validation.isValid) {
        return (
          <div className="mt-1 text-sm text-green-600">
            ✓ Validado correctamente{' '}
            {field === 'companyNit' && validation.companyName ? `(${validation.companyName})` : ''}
            {field === 'representativeNit' && validation.name ? `(${validation.name})` : ''}
          </div>
        );
      } else {
        return (
          <div className="mt-1 text-sm text-red-600">
            ✗ No válido: {validation.status || 'Error de validación'}
          </div>
        );
      }
    }
    
    return null;
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'company', label: 'Empresa', icon: Building },
      { key: 'representative', label: 'Representante', icon: User },
      { key: 'account', label: 'Cuenta', icon: MapPin }
    ];
    
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <div 
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center 
                    ${currentStep === step.key ? 'bg-primary-600 text-white' : 
                      index < steps.findIndex(s => s.key === currentStep) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}
                  `}
                >
                  <step.icon size={20} />
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

  const renderCompanyStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Información de la Empresa</h2>
        <p className="text-gray-600 mb-6">
          Complete la información de su empresa para el registro en DISERCOMI.
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
        required
      />
      
      <div>
        <Input
          id="companyNit"
          name="companyNit"
          label="NIT de la Empresa"
          value={formData.companyNit}
          onChange={handleInputChange}
          error={formErrors.companyNit}
          placeholder="12345678-9"
          fullWidth
          required
        />
        {renderValidationStatus('companyNit')}
        {!validating.companyNit && formData.companyNit && !validationResults.companyNit && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={validateCompanyNit}
          >
            Validar NIT
          </Button>
        )}
      </div>
      
      <Input
        id="address"
        name="address"
        label="Dirección"
        value={formData.address}
        onChange={handleInputChange}
        error={formErrors.address}
        placeholder="Calle, avenida, número"
        fullWidth
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="zone"
          name="zone"
          label="Zona"
          value={formData.zone}
          onChange={handleInputChange}
          error={formErrors.zone}
          placeholder="1, 2, 3..."
          required
        />
        
        <Input
          id="postalCode"
          name="postalCode"
          label="Código Postal"
          value={formData.postalCode}
          onChange={handleInputChange}
          error={formErrors.postalCode}
          placeholder="01001"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          id="department"
          label="Departamento"
          options={departments}
          value={formData.department}
          onChange={(value) => handleSelectChange('department', value)}
          error={formErrors.department}
          fullWidth
        />
        
        <Select
          id="municipality"
          label="Municipio"
          options={municipalities[formData.department as keyof typeof municipalities] || []}
          value={formData.municipality}
          onChange={(value) => handleSelectChange('municipality', value)}
          error={formErrors.municipality}
          fullWidth
        />
      </div>
    </div>
  );

  const renderRepresentativeStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Representante Legal</h2>
        <p className="text-gray-600 mb-6">
          Información del representante legal de la empresa.
        </p>
      </div>
      
      <Input
        id="representativeName"
        name="representativeName"
        label="Nombre del Representante Legal"
        value={formData.representativeName}
        onChange={handleInputChange}
        error={formErrors.representativeName}
        fullWidth
        required
      />
      
      <div>
        <Input
          id="representativeNit"
          name="representativeNit"
          label="NIT del Representante Legal"
          value={formData.representativeNit}
          onChange={handleInputChange}
          error={formErrors.representativeNit}
          placeholder="1234567890101"
          fullWidth
          required
        />
        {renderValidationStatus('representativeNit')}
        {!validating.representativeNit && formData.representativeNit && !validationResults.representativeNit && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={validateRepresentativeNit}
          >
            Validar NIT
          </Button>
        )}
      </div>
    </div>
  );

  const renderAccountStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Información de la Cuenta</h2>
        <p className="text-gray-600 mb-6">
          Configure su cuenta de acceso a la plataforma.
        </p>
      </div>
      
      <Input
        id="email"
        name="email"
        label="Correo Electrónico"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        error={formErrors.email}
        placeholder="correo@empresa.com"
        fullWidth
        required
      />
      
      <div className="relative">
        <Input
          id="password"
          name="password"
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleInputChange}
          error={formErrors.password}
          fullWidth
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center mt-6"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye size={20} className="text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
      
      <div className="relative">
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar Contraseña"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={formErrors.confirmPassword}
          fullWidth
          required
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center mt-6"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye size={20} className="text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
      
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="acceptTerms" className="text-sm text-gray-700">
            Acepto los{' '}
            <Link to="/terms" className="font-medium text-primary-600 hover:text-primary-500">
              Términos y Condiciones
            </Link>
            {' '}y la{' '}
            <Link to="/privacy" className="font-medium text-primary-600 hover:text-primary-500">
              Política de Privacidad
            </Link>
          </label>
          {formErrors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">{formErrors.acceptTerms}</p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="flex justify-center mb-6">
          <img 
            src="/Logos_Disercomi_WithType_5.png"
            alt="DISERCOMI"
            className="h-16"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Registro de Empresa
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Registre su empresa en la plataforma DISERCOMI
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-large sm:rounded-2xl sm:px-10 border border-gray-200">
          {renderStepIndicator()}
          
          {error && (
            <div className="mb-6 bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-xl animate-slide-down">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-error-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {currentStep === 'company' && renderCompanyStep()}
            {currentStep === 'representative' && renderRepresentativeStep()}
            {currentStep === 'account' && renderAccountStep()}
            
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep !== 'company' && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                >
                  Anterior
                </Button>
              )}
              
              {currentStep === 'account' ? (
                <Button
                  type="submit"
                  isLoading={loading}
                  className="ml-auto"
                >
                  Crear Cuenta
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto"
                >
                  Siguiente
                </Button>
              )}
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  ¿Ya tiene una cuenta?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>

          {currentStep === 'company' && (
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    Datos de Demostración
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-soft">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                    <p className="text-blue-800 font-bold text-lg">
                      Datos de Demostración
                    </p>
                  </div>
                  <p className="text-blue-700 font-medium mb-4 text-base">
                    Para propósitos de demostración, puede usar:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border-2 border-blue-300 shadow-medium">
                      <p className="text-blue-900 font-bold text-lg mb-1">
                        NIT Empresa: 548796-K
                      </p>
                      <p className="text-blue-800 font-semibold text-base">
                        NIT Representante: 1234567890101
                      </p>
                    </div>
                  </div>
                  <p className="text-blue-600 text-sm mt-4 font-medium">
                    💡 Use estos datos para validar automáticamente
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;