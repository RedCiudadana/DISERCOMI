import React, { createContext, useContext, useState, useEffect } from 'react';
import { Procedure } from '../types';
import { 
  createProcedure, 
  getProcedures, 
  getProcedureById, 
  updateProcedureStatus, 
  signDocument,
  processPayment
} from '../services/api';
import { useAuth } from './AuthContext';

interface ProcedureContextType {
  procedures: Procedure[];
  loading: boolean;
  error: string | null;
  createNewProcedure: (data: Omit<Procedure, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'comments'>) => Promise<Procedure>;
  getUserProcedures: () => Promise<void>;
  getAllProcedures: () => Promise<void>;
  getProcedure: (id: string) => Promise<Procedure | null>;
  updateStatus: (id: string, status: Procedure['status'], comment?: string) => Promise<void>;
  signProcedure: (id: string) => Promise<boolean>;
  payProcedure: (id: string) => Promise<boolean>;
}

const ProcedureContext = createContext<ProcedureContextType | undefined>(undefined);

export const ProcedureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load user's procedures on initial render if user is logged in
  useEffect(() => {
    if (user) {
      getUserProcedures();
    }
  }, [user]);

  const createNewProcedure = async (data: Omit<Procedure, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'comments'>) => {
    try {
      setLoading(true);
      setError(null);
      const newProcedure = await createProcedure(data);
      setProcedures(prev => [...prev, newProcedure]);
      return newProcedure;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear trámite');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserProcedures = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const userProcedures = await getProcedures(user.id);
      setProcedures(userProcedures);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener trámites');
    } finally {
      setLoading(false);
    }
  };

  const getAllProcedures = async () => {
    try {
      setLoading(true);
      setError(null);
      const allProcedures = await getProcedures();
      setProcedures(allProcedures);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener trámites');
    } finally {
      setLoading(false);
    }
  };

  const getProcedure = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      return await getProcedureById(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener trámite');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Procedure['status'], comment?: string) => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedProcedure = await updateProcedureStatus(id, status, comment, user.id);
      
      if (updatedProcedure) {
        setProcedures(prev => 
          prev.map(p => p.id === id ? updatedProcedure : p)
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar estado');
    } finally {
      setLoading(false);
    }
  };

  const signProcedure = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await signDocument(id);
      
      if (success) {
        setProcedures(prev => 
          prev.map(p => p.id === id ? {...p, isSigned: true} : p)
        );
      }
      
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al firmar documento');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const payProcedure = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await processPayment(id);
      
      if (success) {
        setProcedures(prev => 
          prev.map(p => p.id === id ? {...p, isPaid: true} : p)
        );
      }
      
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar pago');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProcedureContext.Provider 
      value={{ 
        procedures, 
        loading, 
        error, 
        createNewProcedure, 
        getUserProcedures,
        getAllProcedures,
        getProcedure,
        updateStatus,
        signProcedure,
        payProcedure
      }}
    >
      {children}
    </ProcedureContext.Provider>
  );
};

export const useProcedures = (): ProcedureContextType => {
  const context = useContext(ProcedureContext);
  if (context === undefined) {
    throw new Error('useProcedures must be used within a ProcedureProvider');
  }
  return context;
};