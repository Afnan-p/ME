import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { Lock, User, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', formData);
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/projects');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white font-sans selection:bg-[#8B0000] selection:text-white">
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8B0000]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B0000]/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0A0A0A] border border-[#1A1A1A] p-10 md:p-12 relative z-10"
      >
        <div className="mb-10 text-center">
          <div className="w-12 h-12 bg-[#050505] border border-[#1A1A1A] mx-auto flex items-center justify-center mb-6">
            <Lock size={20} className="text-[#8B0000]" />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Restricted Area</h1>
          <p className="text-[#A1A1A1] text-sm font-sans font-light">Enter your credentials to access the admin dashboard.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-sans font-bold text-[#A1A1A1] mb-2 uppercase tracking-[0.08em]">Username</label>
            <div className="relative">
              <input 
                type="text" 
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-[#050505] border border-[#1A1A1A] px-12 py-4 text-sm text-white focus:outline-none focus:border-[#8B0000] transition-colors placeholder:text-[#333333]"
                placeholder="Enter username"
              />
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1A1]" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-sans font-bold text-[#A1A1A1] mb-2 uppercase tracking-[0.08em]">Password</label>
            <div className="relative">
              <input 
                type="password" 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#050505] border border-[#1A1A1A] px-12 py-4 text-sm text-white focus:outline-none focus:border-[#8B0000] transition-colors placeholder:text-[#333333]"
                placeholder="••••••••"
              />
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1A1]" />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-[#8B0000] hover:bg-white text-white hover:text-[#050505] text-xs font-sans font-bold uppercase tracking-[0.08em] transition-colors duration-300 disabled:opacity-70 group flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Authenticating...' : 'Login to Dashboard'}
            {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-xs text-[#A1A1A1] hover:text-white transition-colors uppercase tracking-[0.08em] font-medium border-b border-transparent hover:border-white pb-1">
            Return to Site
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
