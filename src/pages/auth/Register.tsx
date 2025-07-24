import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Loader } from 'lucide-react';
import { validateDPI, validateNIT } from '../../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dpi: '',
    nit: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    dpi: '',
    nit: '',
    password: '',
    confirmPassword: ''
  });
  
  const [validating, setValidating] = useState({
    dpi: false,
    nit: false
  });
  
  const [validationResults, setValidationResults] = useState({
    dpi: null as null | { isValid: boolean; name?: string; status?: string },
    nit: null as null | { isValid: boolean; companyName?: string; status?: string }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is modified
    setFormErrors({ ...formErrors, [name]: '' });
    
    // Clear validation results when DPI/NIT is modified
    if (name === 'dpi') {
      setValidationResults({ ...validationResults, dpi: null });
    } else if (name === 'nit') {
      setValidationResults({ ...validationResults, nit: null });
    }
  };

  const validateDpiField = async () => {
    if (!formData.dpi) {
      setFormErrors({ ...formErrors, dpi: 'El DPI es requerido' });
      return false;
    }
    
    if (formData.dpi.length !== 13) {
      setFormErrors({ ...formErrors, dpi: 'El DPI debe tener 13 dígitos' });
      return false;
    }
    
    try {
      setValidating({ ...validating, dpi: true });
      const response = await validateDPI(formData.dpi);
      setValidationResults({ ...validationResults, dpi: response.dpi || null });
      
      if (!response.dpi?.isValid) {
        setFormErrors({ ...formErrors, dpi: 'DPI no encontrado o inválido' });
        return false;
      }
      
      // If validation is successful, auto-fill name if empty
      if (response.dpi?.name && !formData.name) {
        setFormData({ ...formData, name: response.dpi.name });
      }
      
      return true;
    } catch (err) {
      setFormErrors({ ...formErrors, dpi: 'Error al validar DPI' });
      return false;
    } finally {
      setValidating({ ...validating, dpi: false });
    }
  };

  const validateNitField = async () => {
    if (!formData.nit) {
      setFormErrors({ ...formErrors, nit: 'El NIT es requerido' });
      return false;
    }
    
    try {
      setValidating({ ...validating, nit: true });
      const response = await validateNIT(formData.nit);
      setValidationResults({ ...validationResults, nit: response.nit || null });
      
      if (!response.nit?.isValid) {
        setFormErrors({ ...formErrors, nit: 'NIT no encontrado o inválido' });
        return false;
      }
      
      return true;
    } catch (err) {
      setFormErrors({ ...formErrors, nit: 'Error al validar NIT' });
      return false;
    } finally {
      setValidating({ ...validating, nit: false });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!formData.name) {
      errors.name = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    if (!formData.dpi) {
      errors.dpi = 'El DPI es requerido';
      isValid = false;
    } else if (formData.dpi.length !== 13) {
      errors.dpi = 'El DPI debe tener 13 dígitos';
      isValid = false;
    } else if (!validationResults.dpi?.isValid) {
      errors.dpi = 'DPI no validado o inválido';
      isValid = false;
    }

    if (!formData.nit) {
      errors.nit = 'El NIT es requerido';
      isValid = false;
    } else if (!validationResults.nit?.isValid) {
      errors.nit = 'NIT no validado o inválido';
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

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        dpi: formData.dpi,
        nit: formData.nit
      });
      navigate('/procedures');
    } catch (err) {
      // Error will be handled by the AuthContext
    }
  };

  const renderValidationStatus = (field: 'dpi' | 'nit') => {
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
            {field === 'dpi' && validation.name ? `(${validation.name})` : ''}
            {field === 'nit' && validation.companyName ? `(${validation.companyName})` : ''}
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-[#005bac] text-center text-3xl font-bold">DISERCOMI</h1>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear nueva cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          ¿Ya tiene una cuenta?{' '}
          <Link
            to="/login"
            className="font-medium text-[#005bac] hover:text-[#004a8f]"
          >
            Inicie sesión
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              id="name"
              name="name"
              label="Nombre Completo"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
              fullWidth
              required
            />

            <Input
              id="email"
              name="email"
              label="Correo Electrónico"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              error={formErrors.email}
              fullWidth
              required
            />

            <div>
              <Input
                id="dpi"
                name="dpi"
                label="DPI"
                type="text"
                value={formData.dpi}
                onChange={handleChange}
                placeholder="1234567890101"
                error={formErrors.dpi}
                fullWidth
                required
              />
              {renderValidationStatus('dpi')}
              {!validating.dpi && formData.dpi && formData.dpi.length === 13 && !validationResults.dpi && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={validateDpiField}
                >
                  Validar DPI
                </Button>
              )}
            </div>

            <div>
              <Input
                id="nit"
                name="nit"
                label="NIT"
                type="text"
                value={formData.nit}
                onChange={handleChange}
                placeholder="548796-K"
                error={formErrors.nit}
                fullWidth
                required
              />
              {renderValidationStatus('nit')}
              {!validating.nit && formData.nit && !validationResults.nit && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={validateNitField}
                >
                  Validar NIT
                </Button>
              )}
            </div>

            <Input
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              fullWidth
              required
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar Contraseña"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
              fullWidth
              required
            />

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={loading}
            >
              Registrarse
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Demo DISERCOMI
                </span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Para propósitos de demostración, puede usar:
              </p>
              <p className="mt-1 text-gray-800">
                <strong>DPI:</strong> 1234567890101 | <strong>NIT:</strong> 548796-K
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;