import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Mail, Building, Phone, Shield } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: 'DISERCOMI',
    phone: '+502 2412-0200',
    position: 'Administrador'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-900">Perfil del Usuario</h2>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-8">
            <div className="h-20 w-20 rounded-full bg-[#005bac] flex items-center justify-center text-white text-2xl font-bold">
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h3 className="text-2xl font-bold text-gray-900">{formData.name}</h3>
              <p className="text-gray-600 flex items-center mt-1">
                <Shield size={16} className="mr-1" />
                {formData.position}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="name"
                name="name"
                label="Nombre Completo"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<User size={20} className="text-gray-400" />}
              />

              <Input
                id="email"
                name="email"
                label="Correo Electrónico"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<Mail size={20} className="text-gray-400" />}
              />

              <Input
                id="department"
                name="department"
                label="Departamento"
                value={formData.department}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<Building size={20} className="text-gray-400" />}
              />

              <Input
                id="phone"
                name="phone"
                label="Teléfono"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                icon={<Phone size={20} className="text-gray-400" />}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    Guardar Cambios
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  onClick={() => setIsEditing(true)}
                >
                  Editar Perfil
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;