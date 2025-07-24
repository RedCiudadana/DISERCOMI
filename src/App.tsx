import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProcedureProvider } from './context/ProcedureContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';
import FeedbackButton from './components/ui/FeedbackButton';
import Chatbot from './components/ui/Chatbot';

// Pages
import Home from './pages/Home';
import ProcedureList from './pages/procedures/ProcedureList';
import ProcedureForm from './pages/procedures/ProcedureForm';
import ProcedureDetail from './pages/procedures/ProcedureDetail';
import TrackProcedure from './pages/procedures/TrackProcedure';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/Profile';
import BitacoraLogs from './pages/admin/BitacoraLogs';
import Documentation from './pages/docs/Documentation';
import ApiDocumentation from './pages/docs/ApiDocumentation';
import ProcessFlow from './pages/docs/ProcessFlow';
import SupportCenter from './pages/docs/SupportCenter';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import SiteMap from './pages/SiteMap';
import Disercomi from './pages/about/Disercomi';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <ProcedureProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow bg-gray-50">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/procedures" element={<ProcedureList />} />
                <Route path="/procedures/new" element={<ProcedureForm />} />
                <Route path="/procedures/:id" element={<ProcedureDetail />} />
                <Route path="/track" element={<TrackProcedure />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/profile" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminProfile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/bitacora" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <BitacoraLogs />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/admin/expediente" element={<ProcedureDetail />} />
                <Route path="/documentation" element={<Documentation />} />
                <Route path="/api-docs" element={<ApiDocumentation />} />
                <Route path="/process-flow" element={<ProcessFlow />} />
                <Route path="/support" element={<SupportCenter />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/sitemap" element={<SiteMap />} />
                <Route path="/disercomi" element={<Disercomi />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <FeedbackButton />
            <Chatbot />
          </div>
        </Router>
      </ProcedureProvider>
    </AuthProvider>
  );
}

export default App;