import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { Send, Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const projectTypes = ['Website', 'SaaS', 'Dashboard', 'MVP', 'E-Commerce'];

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', email: '', projectType: '', message: '' 
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [settings, setSettings] = useState({
    email: 'hello@stackxio.com',
    phone: '+91 98765 43210',
    githubLink: '#',
    linkedinLink: '#'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/api/settings');
        const data = response.data;
        if (data) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePillClick = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const finalMessage = `[Project Type: ${formData.projectType || 'Not specified'}]\n\n${formData.message}`;
    
    const submissionData = {
      ...formData,
      message: finalMessage,
      phone: '' 
    };
    
    try {
      const response = await api.post('/api/contact', submissionData);
      
      if (response.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', projectType: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050505]">

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-16 items-center max-w-7xl mx-auto">
          
          {/* Left Side - 50% */}
          <motion.div 
            className="w-full lg:w-1/2 lg:pr-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-sans font-medium uppercase tracking-[0.08em] text-[#8B0000] mb-4">
              START A PROJECT
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.1] text-white">
              Let's Build Something Meaningful
            </h3>
            
            <p className="text-[#A1A1A1] font-sans font-normal text-lg mb-10 leading-[1.8] max-w-lg">
              I partner with founders, startups, and forward-thinking brands to build premium, high-performance digital products that drive growth and scale.
            </p>



            {/* Contact Method Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 p-5 rounded-none bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#8B0000] transition-colors duration-300">
                <Mail size={20} className="text-[#8B0000] mt-1" />
                <div>
                  <p className="text-xs text-[#A1A1A1] font-sans font-medium uppercase tracking-[0.08em] mb-1">Email</p>
                  <p className="text-white font-sans font-normal text-sm">{settings.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-none bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#8B0000] transition-colors duration-300">
                <Phone size={20} className="text-[#8B0000] mt-1" />
                <div>
                  <p className="text-xs text-[#A1A1A1] font-sans font-medium uppercase tracking-[0.08em] mb-1">Phone</p>
                  <p className="text-white font-sans font-normal text-sm">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-none bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#8B0000] transition-colors duration-300 sm:col-span-2">
                <MapPin size={20} className="text-[#8B0000] mt-1" />
                <div>
                  <p className="text-xs text-[#A1A1A1] font-sans font-medium uppercase tracking-[0.08em] mb-1">Location</p>
                  <p className="text-white font-sans font-normal text-sm">Kerala, India</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Side - 50% */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-[#0A0A0A] p-8 md:p-10 rounded-none border border-[#1A1A1A]">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label htmlFor="name" className="block text-xs font-sans font-medium text-[#A1A1A1] mb-2 uppercase tracking-[0.08em]">Your Name</label>
                  <input 
                    id="name"
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-[#1A1A1A] rounded-none px-5 py-4 text-sm text-white focus:outline-none focus:border-[#8B0000] transition-colors placeholder:text-[#333333]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-sans font-medium text-[#A1A1A1] mb-2 uppercase tracking-[0.08em]">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#050505] border border-[#1A1A1A] rounded-none px-5 py-4 text-sm text-white focus:outline-none focus:border-[#8B0000] transition-colors placeholder:text-[#333333]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-xs font-sans font-medium text-[#A1A1A1] mb-3 uppercase tracking-[0.08em]">Project Type</label>
                <div className="flex flex-wrap gap-3">
                  {projectTypes.map(type => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => handlePillClick('projectType', type)}
                      className={`px-4 py-2 rounded-none text-xs font-mono font-normal border transition-all duration-300 ${formData.projectType === type ? 'bg-[#8B0000] border-[#8B0000] text-white' : 'bg-[#050505] border-[#1A1A1A] text-[#A1A1A1] hover:border-[#8B0000] hover:text-white'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-xs font-sans font-medium text-[#A1A1A1] mb-2 uppercase tracking-[0.08em]">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#050505] border border-[#1A1A1A] rounded-none px-5 py-5 text-sm text-white focus:outline-none focus:border-[#8B0000] transition-colors resize-none placeholder:text-[#333333] leading-relaxed"
                  placeholder="Tell me about your project goals and timeline..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded-none bg-white text-[#050505] text-sm font-sans font-bold uppercase tracking-[0.08em] flex items-center justify-center gap-3 hover:bg-[#8B0000] hover:text-white transition-colors duration-300 disabled:opacity-70 group"
              >
                <span className="flex items-center gap-2">
                  {loading ? 'Sending Details...' : 'Submit Inquiry'}
                  {!loading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                </span>
              </button>

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-[#8B0000]/10 border border-[#8B0000]/20 flex items-center justify-center gap-3 text-[#8B0000] text-sm font-medium"
                >
                  <CheckCircle2 size={18} />
                  Thank you! I will get back to you within 24 hours.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center"
                >
                  Something went wrong. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
