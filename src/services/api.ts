import { User, Procedure, ValidationResponse, DashboardStats } from '../types';

// Base API URL - Would be replaced with actual X-Road Gateway in production
const API_BASE_URL = 'https://api.mi-gateway.com';

// Simulated token - In production this would be managed securely
const API_TOKEN = 'simulated-xroad-token';

// Helper function for all API calls
const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const headers = {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

// Mock database
let users: User[] = [
  {
    id: 'default-admin',
    name: 'Administrador DISERCOMI',
    email: 'disercomi@mineco.gob.gt',
    dpi: '1234567890101',
    nit: '548796-K',
    role: 'admin',
    createdAt: new Date().toISOString()
  }
];

// Demo procedures
let procedures: Procedure[] = [
  {
    id: 'proc-1',
    trackingCode: 'DIS-2025001',
    userId: 'default-admin',
    type: 'Calificación para el Decreto 29-89',
    status: 'in_review',
    companyName: 'Textiles Maya S.A.',
    companyNit: '12345678',
    address: 'Zona 12, Ciudad de Guatemala',
    sector: 'Manufactura',
    documents: [
      {
        id: 'doc-1',
        name: 'Patente de Comercio.pdf',
        url: '#',
        type: 'application/pdf',
        uploadedAt: '2025-03-01T10:00:00Z'
      },
      {
        id: 'doc-2',
        name: 'RTU Actualizado.pdf',
        url: '#',
        type: 'application/pdf',
        uploadedAt: '2025-03-01T10:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-1',
        userId: 'default-admin',
        userName: 'Administrador DISERCOMI',
        text: 'Documentación recibida, iniciando revisión',
        createdAt: '2025-03-01T10:00:00Z'
      }
    ],
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-03-02T15:30:00Z',
    isPaid: true,
    isSigned: true,
    legalRepName: 'Juan Pérez',
    legalRepDPI: '1234567890101',
    registroMercantil: 'REG-123456',
    email: 'info@textilesmaya.com',
    phone: '+502 2412-0200',
    steps: [
      { step: 'ingreso', status: 'completed', date: '2025-03-01T10:00:00Z' },
      { step: 'asignacion', status: 'completed', date: '2025-03-01T11:00:00Z' },
      { step: 'analisis', status: 'in_progress', date: '2025-03-02T09:00:00Z' },
      { step: 'revision', status: 'pending' },
      { step: 'firma', status: 'pending' },
      { step: 'elaboracion', status: 'pending' },
      { step: 'notificacion', status: 'pending' },
      { step: 'cierre', status: 'pending' }
    ]
  },
  {
    id: 'proc-2',
    trackingCode: 'DIS-2025002',
    userId: 'default-admin',
    type: 'Prórroga de inicio de operaciones',
    status: 'received',
    companyName: 'Exportadora del Sur S.A.',
    companyNit: '87654321',
    address: 'Zona 4, Ciudad de Guatemala',
    sector: 'Exportación',
    documents: [
      {
        id: 'doc-3',
        name: 'Solicitud de Prórroga.pdf',
        url: '#',
        type: 'application/pdf',
        uploadedAt: '2025-03-05T14:00:00Z'
      }
    ],
    comments: [],
    createdAt: '2025-03-05T14:00:00Z',
    updatedAt: '2025-03-05T14:00:00Z',
    isPaid: false,
    isSigned: false,
    legalRepName: 'María García',
    legalRepDPI: '2345678901234',
    registroMercantil: 'REG-789012',
    email: 'info@exportadorasur.com',
    phone: '+502 2333-4444',
    steps: [
      { step: 'ingreso', status: 'completed', date: '2025-03-05T14:00:00Z' },
      { step: 'asignacion', status: 'pending' },
      { step: 'analisis', status: 'pending' },
      { step: 'revision', status: 'pending' },
      { step: 'firma', status: 'pending' },
      { step: 'elaboracion', status: 'pending' },
      { step: 'notificacion', status: 'pending' },
      { step: 'cierre', status: 'pending' }
    ]
  },
  {
    id: 'proc-3',
    trackingCode: 'DIS-2025003',
    userId: 'default-admin',
    type: 'Calificación para el Decreto 29-89',
    status: 'approved',
    companyName: 'Industrias Centro América',
    companyNit: '98765432',
    address: 'Zona 18, Ciudad de Guatemala',
    sector: 'Industria',
    documents: [
      {
        id: 'doc-4',
        name: 'Documentación Completa.pdf',
        url: '#',
        type: 'application/pdf',
        uploadedAt: '2025-02-15T09:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-2',
        userId: 'default-admin',
        userName: 'Administrador DISERCOMI',
        text: 'Trámite aprobado',
        createdAt: '2025-03-01T16:00:00Z'
      }
    ],
    createdAt: '2025-02-15T09:00:00Z',
    updatedAt: '2025-03-01T16:00:00Z',
    isPaid: true,
    isSigned: true,
    legalRepName: 'Roberto Ramírez',
    legalRepDPI: '3456789012345',
    registroMercantil: 'REG-345678',
    email: 'info@industriasca.com',
    phone: '+502 2555-6666',
    steps: [
      { step: 'ingreso', status: 'completed', date: '2025-02-15T09:00:00Z' },
      { step: 'asignacion', status: 'completed', date: '2025-02-15T10:00:00Z' },
      { step: 'analisis', status: 'completed', date: '2025-02-20T11:00:00Z' },
      { step: 'revision', status: 'completed', date: '2025-02-25T14:00:00Z' },
      { step: 'firma', status: 'completed', date: '2025-02-28T09:00:00Z' },
      { step: 'elaboracion', status: 'completed', date: '2025-03-01T15:00:00Z' },
      { step: 'notificacion', status: 'completed', date: '2025-03-01T16:00:00Z' },
      { step: 'cierre', status: 'completed', date: '2025-03-01T16:00:00Z' }
    ]
  },
  {
    id: 'proc-4',
    trackingCode: 'DIS-2025004',
    userId: 'default-admin',
    type: 'Cambio de razón social',
    status: 'rejected',
    companyName: 'Comercial del Norte',
    companyNit: '45678901',
    address: 'Zona 1, Ciudad de Guatemala',
    sector: 'Comercio',
    documents: [
      {
        id: 'doc-5',
        name: 'Solicitud.pdf',
        url: '#',
        type: 'application/pdf',
        uploadedAt: '2025-02-28T11:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-3',
        userId: 'default-admin',
        userName: 'Administrador DISERCOMI',
        text: 'Documentación incompleta',
        createdAt: '2025-03-01T10:00:00Z'
      }
    ],
    createdAt: '2025-02-28T11:00:00Z',
    updatedAt: '2025-03-01T10:00:00Z',
    isPaid: true,
    isSigned: false,
    legalRepName: 'Ana López',
    legalRepDPI: '4567890123456',
    registroMercantil: 'REG-901234',
    email: 'info@comercialnorte.com',
    phone: '+502 2777-8888',
    steps: [
      { step: 'ingreso', status: 'completed', date: '2025-02-28T11:00:00Z' },
      { step: 'asignacion', status: 'completed', date: '2025-02-28T12:00:00Z' },
      { step: 'analisis', status: 'completed', date: '2025-03-01T09:00:00Z' },
      { step: 'revision', status: 'completed', date: '2025-03-01T10:00:00Z' },
      { step: 'firma', status: 'pending' },
      { step: 'elaboracion', status: 'pending' },
      { step: 'notificacion', status: 'pending' },
      { step: 'cierre', status: 'pending' }
    ]
  },
  {
    id: 'proc-5',
    trackingCode: 'DIS-2025005',
    userId: 'default-admin',
    type: 'Registro de dirección fiscal',
    status: 'in_review',
    companyName: 'Servicios Integrados S.A.',
    companyNit: '34567890',
    address: 'Zona 10, Ciudad de Guatemala',
    sector: 'Servicios',
    documents: [
      {
        id: 'doc-6',
        name: 'Formulario de Registro.pdf',
        url: '#',
        type: 'application/pdf',
        uploadedAt: '2025-03-04T15:00:00Z'
      }
    ],
    comments: [
      {
        id: 'comment-4',
        userId: 'default-admin',
        userName: 'Administrador DISERCOMI',
        text: 'En proceso de revisión',
        createdAt: '2025-03-04T16:00:00Z'
      }
    ],
    createdAt: '2025-03-04T15:00:00Z',
    updatedAt: '2025-03-04T16:00:00Z',
    isPaid: true,
    isSigned: true,
    legalRepName: 'Carlos Mendoza',
    legalRepDPI: '5678901234567',
    registroMercantil: 'REG-567890',
    email: 'info@serviciosintegrados.com',
    phone: '+502 2999-0000',
    steps: [
      { step: 'ingreso', status: 'completed', date: '2025-03-04T15:00:00Z' },
      { step: 'asignacion', status: 'completed', date: '2025-03-04T15:30:00Z' },
      { step: 'analisis', status: 'in_progress', date: '2025-03-04T16:00:00Z' },
      { step: 'revision', status: 'pending' },
      { step: 'firma', status: 'pending' },
      { step: 'elaboracion', status: 'pending' },
      { step: 'notificacion', status: 'pending' },
      { step: 'cierre', status: 'pending' }
    ]
  }
];

// Logging function
const logAction = async (
  actionType: string,
  resourceType: string,
  resourceId: string | null,
  description: string,
  changes?: Record<string, any>
) => {
  // En una implementación real, esto llamaría a la función correspondiente del backend
  // Para ahora, simularemos el registro
  console.log({
    timestamp: new Date().toISOString(),
    user_name: 'Current User', // Vendría del contexto de autenticación
    role: 'admin', // Vendría del contexto de autenticación
    action_type: actionType,
    resource_type: resourceType,
    resource_id: resourceId,
    description,
    changes,
    ip_address: '127.0.0.1', // Vendría de la solicitud
    device_info: navigator.userAgent
  });
};

// Generate unique tracking code
const generateTrackingCode = () => {
  const prefix = 'DIS';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

// Authentication functions
export const loginUser = async (email: string, password: string): Promise<User | null> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // For demo purposes, check for specific credentials
  if (email === 'disercomi@mineco.gob.gt' && password === 'disercomi') {
    const user = users.find(u => u.email === email);
    
    if (user) {
      await logAction(
        'Login',
        'Sistema',
        user.id,
        `Usuario inició sesión: ${user.email}`
      );
    }
    
    return user || null;
  }
  
  throw new Error('Credenciales inválidas');
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  dpi: string;
  nit: string;
}): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 600));

  // Check if user already exists
  if (users.some(u => u.email === userData.email)) {
    throw new Error('El correo electrónico ya está registrado');
  }

  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: userData.name,
    email: userData.email,
    dpi: userData.dpi,
    nit: userData.nit,
    role: 'user',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  await logAction(
    'Register',
    'Usuario',
    newUser.id,
    `Nuevo usuario registrado: ${newUser.email}`,
    { name: newUser.name, email: newUser.email }
  );

  return newUser;
};

// Simulate API calls to X-Road services
export const validateDPI = async (dpi: string): Promise<ValidationResponse> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (dpi === '1234567890101') {
    return {
      dpi: {
        isValid: true,
        name: 'Juan Pérez',
        status: 'vigente'
      }
    };
  }
  
  return {
    dpi: {
      isValid: false,
      status: 'no encontrado'
    }
  };
};

export const validateNIT = async (nit: string): Promise<ValidationResponse> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (nit === '548796-K') {
    return {
      nit: {
        isValid: true,
        companyName: 'Exportadora Maya S.A.',
        status: 'activo'
      }
    };
  }
  
  return {
    nit: {
      isValid: false,
      status: 'no encontrado'
    }
  };
};

// Procedure management
export const createProcedure = async (procedureData: Omit<Procedure, 'id' | 'trackingCode' | 'createdAt' | 'updatedAt' | 'status' | 'comments'>): Promise<Procedure> => {
  const newProcedure: Procedure = {
    id: `proc-${Date.now()}`,
    trackingCode: generateTrackingCode(),
    ...procedureData,
    status: 'received',
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  procedures.push(newProcedure);
  
  await logAction(
    'Create',
    'Trámite',
    newProcedure.id,
    `Nuevo trámite creado: ${newProcedure.type}`,
    { companyName: newProcedure.companyName, type: newProcedure.type }
  );
  
  return newProcedure;
};

export const updateProcedureStatus = async (id: string, status: Procedure['status'], comment?: string, userId?: string): Promise<Procedure | null> => {
  const index = procedures.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const oldStatus = procedures[index].status;
  
  procedures[index] = {
    ...procedures[index],
    status,
    updatedAt: new Date().toISOString(),
  };
  
  if (comment && userId) {
    const user = users.find(u => u.id === userId);
    
    procedures[index].comments.push({
      id: `comment-${Date.now()}`,
      userId,
      userName: user?.name || 'Sistema',
      text: comment,
      createdAt: new Date().toISOString(),
    });
  }
  
  await logAction(
    'State Change',
    'Trámite',
    id,
    `Estado actualizado de ${oldStatus} a ${status}`,
    { oldStatus, newStatus: status }
  );
  
  return procedures[index];
};

export const signDocument = async (procedureId: string): Promise<boolean> => {
  const index = procedures.findIndex(p => p.id === procedureId);
  
  if (index === -1) return false;
  
  procedures[index].isSigned = true;
  procedures[index].updatedAt = new Date().toISOString();
  
  await logAction(
    'Update',
    'Documento',
    procedureId,
    'Documento firmado digitalmente'
  );
  
  return true;
};

export const processPayment = async (procedureId: string): Promise<boolean> => {
  const index = procedures.findIndex(p => p.id === procedureId);
  
  if (index === -1) return false;
  
  procedures[index].isPaid = true;
  procedures[index].updatedAt = new Date().toISOString();
  
  await logAction(
    'Update',
    'Trámite',
    procedureId,
    'Pago procesado exitosamente'
  );
  
  return true;
};

export const getProcedures = async (userId?: string): Promise<Procedure[]> => {
  if (userId) {
    return procedures.filter(p => p.userId === userId);
  }
  return procedures;
};

export const getProcedureById = async (id: string): Promise<Procedure | null> => {
  const procedure = procedures.find(p => p.id === id);
  return procedure || null;
};

export const getProcedureByTrackingCode = async (trackingCode: string): Promise<Procedure | null> => {
  const procedure = procedures.find(p => p.trackingCode === trackingCode);
  return procedure || null;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, 1);
  
  const proceduresByStatus = {
    received: procedures.filter(p => p.status === 'received').length,
    in_review: procedures.filter(p => p.status === 'in_review').length,
    approved: procedures.filter(p => p.status === 'approved').length,
    rejected: procedures.filter(p => p.status === 'rejected').length,
  };

  const proceduresByType = procedures.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const proceduresByMonth = Array.from({ length: 6 }, (_, i) => {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return {
      month: month.toLocaleString('default', { month: 'long', year: 'numeric' }),
      count: procedures.filter(p => new Date(p.createdAt) >= month).length,
    };
  }).reverse();

  const completedProcedures = procedures.filter(p => p.status === 'approved' || p.status === 'rejected');
  const averageProcessingTime = completedProcedures.reduce((acc, curr) => {
    const start = new Date(curr.createdAt);
    const end = new Date(curr.updatedAt);
    return acc + (end.getTime() - start.getTime());
  }, 0) / (completedProcedures.length || 1) / (1000 * 60 * 60 * 24); // Convert to days

  const completionRate = (completedProcedures.length / procedures.length) * 100;

  return {
    totalProcedures: procedures.length,
    proceduresByStatus,
    proceduresByType,
    proceduresByMonth,
    averageProcessingTime,
    completionRate,
  };
};