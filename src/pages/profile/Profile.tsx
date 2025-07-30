import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Hero from '../../components/ui/Hero';
import { User, Mail, Building, Phone, Shield, MapPin, Edit3, Save, X, Camera } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'company' | 'security'>('personal');
  
  const [formData, setFormData] = useState({
    // Personal Information
    name: user?.name || '',
    email: user?.email || '',
    phone: '+502 2412-0200',
    dpi: user?.dpi || '',
    
    // Company Information
    companyName: 'Exportadora Maya S.A.',
    companyNit: user?.nit || '',
    address: '7a. Avenida 7-61, Zona 4',
    zone: '4',
    municipality: 'Guatemala',
    department: 'Guatemala',
    postalCode: '01004',
    sector: 'Exportación',
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

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

  const municipalities = [
    { value: 'guatemala', label: 'Guatemala' },
    { value: 'santa-catarina-pinula', label: 'Santa Catarina Pinula' },
    { value: 'san-jose-pinula', label: 'San José Pinula' },
    { value: 'mixco', label: 'Mixco' },
    { value: 'villa-nueva', label: 'Villa Nueva' },
    { value: 'villa-canales', label: 'Villa Canales' }
  ];

  const sectors = [
    { value: 'industria', label: 'Industria' },
    { value: 'maquila', label: 'Maquila' },
    { value: 'manufactura', label: 'Manufactura' },
    { value: 'exportacion', label: 'Exportación' },
    { value: 'servicios', label: 'Servicios' },
    { value: 'comercio', label: 'Comercio' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validatePersonalInfo = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Ingrese un correo electrónico válido';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es requerido';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateCompanyInfo = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!formData.companyName.trim()) {
      errors.companyName = 'El nombre de la empresa es requerido';
      isValid = false;
    }

    if (!formData.address.trim()) {
      errors.address = 'La dirección es requerida';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateSecurity = () => {
    let isValid = true;
    const errors = { ...formErrors };

    if (formData.newPassword && !formData.currentPassword) {
      errors.currentPassword = 'Ingrese su contraseña actual';
      isValid = false;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      errors.newPassword = 'La nueva contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = false;
    
    if (activeTab === 'personal') {
      isValid = validatePersonalInfo();
    } else if (activeTab === 'company') {
      isValid = validateCompanyInfo();
    } else if (activeTab === 'security') {
      isValid = validateSecurity();
    }

    if (isValid) {
      // In a real app, this would update the user profile via API
      console.log('Updating profile:', { activeTab, formData });
      setIsEditing(false);
      
      // Show success message (you could add a toast notification here)
      alert('Perfil actualizado exitosamente');
    }
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+502 2412-0200',
      dpi: user?.dpi || '',
      companyName: 'Exportadora Maya S.A.',
      companyNit: user?.nit || '',
      address: '7a. Avenida 7-61, Zona 4',
      zone: '4',
      municipality: 'Guatemala',
      department: 'Guatemala',
      postalCode: '01004',
      sector: 'Exportación',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setFormErrors({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      address: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditing(false);
  };

  const renderPersonalTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white text-3xl font-bold shadow-large">
            {formData.name.charAt(0).toUpperCase()}
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-medium flex items-center justify-center text-gray-600 hover:text-primary-600 transition-colors">
              <Camera size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="name"
          name="name"
          label="Nombre Completo"
          value={formData.name}
          onChange={handleInputChange}
          error={formErrors.name}
          icon={<User size={20} className="text-gray-400" />}
          disabled={!isEditing}
          fullWidth
        />

        <Input
          id="email"
          name="email"
          label="Correo Electrónico"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
          icon={<Mail size={20} className="text-gray-400" />}
          disabled={!isEditing}
          fullWidth
        />

        <Input
          id="phone"
          name="phone"
          label="Teléfono"
          value={formData.phone}
          onChange={handleInputChange}
          error={formErrors.phone}
          icon={<Phone size={20} className="text-gray-400" />}
          disabled={!isEditing}
          fullWidth
        />

        <Input
          id="dpi"
          name="dpi"
          label="DPI"
          value={formData.dpi}
          onChange={handleInputChange}
          icon={<Shield size={20} className="text-gray-400" />}
          disabled={true}
          fullWidth
          helperText="El DPI no se puede modificar"
        />
      </div>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Información de la Cuenta</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Rol:</span>
            <span className="ml-2 font-medium text-gray-900 capitalize">{user?.role}</span>
          </div>
          <div>
            <span className="text-gray-600">Fecha de registro:</span>
            <span className="ml-2 font-medium text-gray-900">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanyTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="companyName"
          name="companyName"
          label="Nombre de la Empresa"
          value={formData.companyName}
          onChange={handleInputChange}
          error={formErrors.companyName}
          icon={<Building size={20} className="text-gray-400" />}
          disabled={!isEditing}
          fullWidth
        />

        <Input
          id="companyNit"
          name="companyNit"
          label="NIT de la Empresa"
          value={formData.companyNit}
          onChange={handleInputChange}
          icon={<Shield size={20} className="text-gray-400" />}
          disabled={true}
          fullWidth
          helperText="El NIT no se puede modificar"
        />

        <div className="md:col-span-2">
          <Input
            id="address"
            name="address"
            label="Dirección"
            value={formData.address}
            onChange={handleInputChange}
            error={formErrors.address}
            icon={<MapPin size={20} className="text-gray-400" />}
            disabled={!isEditing}
            fullWidth
          />
        </div>

        <Input
          id="zone"
          name="zone"
          label="Zona"
          value={formData.zone}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />

        <Input
          id="postalCode"
          name="postalCode"
          label="Código Postal"
          value={formData.postalCode}
          onChange={handleInputChange}
          disabled={!isEditing}
          fullWidth
        />

        <Select
          id="department"
          label="Departamento"
          options={departments}
          value={formData.department}
          onChange={(value) => handleSelectChange('department', value)}
          fullWidth
        />

        <Select
          id="municipality"
          label="Municipio"
          options={municipalities}
          value={formData.municipality}
          onChange={(value) => handleSelectChange('municipality', value)}
          fullWidth
        />

        <div className="md:col-span-2">
          <Select
            id="sector"
            label="Sector Productivo"
            options={sectors}
            value={formData.sector}
            onChange={(value) => handleSelectChange('sector', value)}
            fullWidth
          />
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Cambiar Contraseña</h3>
        <p className="text-yellow-700 text-sm">
          Para cambiar su contraseña, complete todos los campos a continuación.
        </p>
      </div>

      <div className="space-y-6">
        <Input
          id="currentPassword"
          name="currentPassword"
          label="Contraseña Actual"
          type="password"
          value={formData.currentPassword}
          onChange={handleInputChange}
          error={formErrors.currentPassword}
          disabled={!isEditing}
          fullWidth
        />

        <Input
          id="newPassword"
          name="newPassword"
          label="Nueva Contraseña"
          type="password"
          value={formData.newPassword}
          onChange={handleInputChange}
          error={formErrors.newPassword}
          disabled={!isEditing}
          fullWidth
          helperText="Mínimo 6 caracteres"
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar Nueva Contraseña"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={formErrors.confirmPassword}
          disabled={!isEditing}
          fullWidth
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Configuración de Seguridad</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-blue-700">Autenticación de dos factores</span>
            <span className="text-blue-600 font-medium">Desactivada</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-700">Último inicio de sesión</span>
            <span className="text-blue-600 font-medium">Hoy, 10:30 AM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-blue-700">Sesiones activas</span>
            <span className="text-blue-600 font-medium">1 dispositivo</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Hero
        title="Mi Perfil"
        subtitle="Gestione su información personal y configuración de cuenta"
        image="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-large rounded-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
                <p className="text-gray-600 mt-1">Administre su información personal y de empresa</p>
              </div>
              <div className="flex items-center space-x-3">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="flex items-center"
                    >
                      <X size={16} className="mr-2" />
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex items-center"
                    >
                      <Save size={16} className="mr-2" />
                      Guardar
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center"
                  >
                    <Edit3 size={16} className="mr-2" />
                    Editar Perfil
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {[
                { id: 'personal', label: 'Información Personal', icon: User },
                { id: 'company', label: 'Información de Empresa', icon: Building },
                { id: 'security', label: 'Seguridad', icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`
                    flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center space-x-2
                    ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <tab.icon size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {activeTab === 'personal' && renderPersonalTab()}
              {activeTab === 'company' && renderCompanyTab()}
              {activeTab === 'security' && renderSecurityTab()}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;