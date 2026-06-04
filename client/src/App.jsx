import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const AdminProjects = lazy(() => import('./pages/AdminProjects'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const AppContent = ({ loading, setLoading }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-[#050505] text-white min-h-screen selection:bg-[#8B0000] selection:text-white flex flex-col"
          >
            {!isAdminRoute && <Navbar />}
            <div className="flex-grow">
              <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-[#050505]"><div className="w-8 h-8 border-2 border-[#8B0000] border-t-transparent rounded-full animate-spin"></div></div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/portfolio/:slug" element={<ProjectDetails />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/projects" element={
                    <ProtectedRoute>
                      <AdminProjects />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Suspense>
            </div>
            {!isAdminRoute && <Footer />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <AppContent loading={loading} setLoading={setLoading} />
    </Router>
  );
}

export default App;
