// Add new types for procedure steps
export type ProcedureStep = 
  | 'ingreso'
  | 'asignacion'
  | 'analisis'
  | 'revision'
  | 'firma'
  | 'elaboracion'
  | 'notificacion'
  | 'cierre';

export interface StepStatus {
  step: ProcedureStep;
  status: 'pending' | 'in_progress' | 'completed';
  date?: string;
  comments?: string[];
  assignedTo?: string;
}

// Update existing Procedure interface
export interface Procedure {
  id: string;
  trackingCode: string;
  userId: string;
  type: string;
  status: ProcedureStatus;
  companyName: string;
  companyNit: string;
  address: string;
  sector: string;
  documents: Document[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
  isPaid: boolean;
  isSigned: boolean;
  legalRepName: string;
  legalRepDPI: string;
  registroMercantil: string;
  email: string;
  phone: string;
  steps: StepStatus[];
}