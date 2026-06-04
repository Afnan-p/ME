import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Code2, MapPin } from 'lucide-react';
import api from '../utils/api';
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const [settings, setSettings] = useState({
    email: 'hello@stackxio.com',
    githubLink: '#',
    linkedinLink: '#'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/api/settings');
        const data = response.data;
        if (data) setSettings(prev => ({ ...prev, ...data }));
      } catch (err) {
        console.error('Error fetching settings for footer:', err);
      }
    };
    fetchSettings();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050505] overflow-hidden pt-20 pb-10 border-t border-[#1A1A1A]">

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Founder Intro & Socials */}
          <div className="md:col-span-5 lg:col-span-4">
            <a href="#home" className="text-3xl font-display font-bold tracking-tighter text-white block mb-4">
              AFNAN<span className="text-[#8B0000]">.</span>
            </a>
            
            <p className="text-[#A1A1A1] text-xs font-sans font-medium uppercase tracking-[0.08em] mb-6">
              Full Stack Developer & Founder
            </p>

            <p className="text-[#A1A1A1] text-sm font-sans font-normal leading-[1.8] pr-4 mb-8 max-w-sm">
              Building scalable web applications, SaaS platforms, and digital products for forward-thinking brands.
            </p>

            {/* Social Links under Column 1 */}
            <div className="flex gap-4">
              <a href={settings.linkedinLink || '#'} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-center text-[#A1A1A1] hover:border-[#8B0000] hover:text-[#8B0000] transition-colors">
                <FaLinkedin size={16} />
              </a>
              <a href={settings.githubLink || '#'} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-center text-[#A1A1A1] hover:border-[#8B0000] hover:text-[#8B0000] transition-colors">
                <FaGithub size={16} />
              </a>
              <a href={settings.instagramLink || '#'} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-center text-[#A1A1A1] hover:border-[#8B0000] hover:text-[#8B0000] transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href={settings.whatsappLink || '#'} target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-center text-[#A1A1A1] hover:border-[#8B0000] hover:text-[#8B0000] transition-colors">
                <FaWhatsapp size={16} />
              </a>
              <a href={settings.email ? `mailto:${settings.email}` : '#'} className="w-10 h-10 bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-center text-[#A1A1A1] hover:border-[#8B0000] hover:text-[#8B0000] transition-colors">
                <FaEnvelope size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3 lg:col-span-2 lg:pl-4">
            <h5 className="text-white font-sans font-medium mb-6 text-xs uppercase tracking-[0.08em]">Navigation</h5>
            <div className="flex flex-col gap-4">
              {['About', 'Projects', 'Skills', 'Services', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-sans font-normal text-[#A1A1A1] hover:text-[#8B0000] transition-colors w-fit">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Connect */}
          <div className="md:col-span-4 lg:col-span-2">
            <h5 className="text-white font-sans font-medium mb-6 text-xs uppercase tracking-[0.08em]">Connect</h5>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${settings.email}`} className="text-sm font-sans font-normal text-[#A1A1A1] hover:text-[#8B0000] transition-colors flex items-center gap-3 w-fit">
                <Mail size={16} /> Email
              </a>
              <a href={settings.githubLink || '#'} target="_blank" rel="noreferrer" className="text-sm font-sans font-normal text-[#A1A1A1] hover:text-[#8B0000] transition-colors flex items-center gap-3 w-fit">
                <FaGithub size={16} /> GitHub
              </a>
              <a href={settings.linkedinLink || '#'} target="_blank" rel="noreferrer" className="text-sm font-sans font-normal text-[#A1A1A1] hover:text-[#8B0000] transition-colors flex items-center gap-3 w-fit">
                <FaLinkedin size={16} /> LinkedIn
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="text-sm font-sans font-normal text-[#A1A1A1] hover:text-[#8B0000] transition-colors flex items-center gap-3 w-fit">
                <FaInstagram size={16} /> Instagram
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="text-sm font-sans font-normal text-[#A1A1A1] hover:text-[#8B0000] transition-colors flex items-center gap-3 w-fit">
                <FaWhatsapp size={16} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Column 4: Status (Fixes empty right side) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col lg:items-end">
            <h5 className="text-white font-sans font-medium mb-6 text-xs uppercase tracking-[0.08em] text-left lg:text-right w-full">Status</h5>
            
            <div className="flex flex-col gap-4 w-full lg:items-end">
              <div className="flex items-center gap-3 bg-[#0A0A0A] border border-[#1A1A1A] p-4 rounded-none w-fit lg:min-w-[220px]">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <p className="text-[#A1A1A1] text-xs font-mono font-normal tracking-wide">Available for Work</p>
              </div>

              <div className="flex items-center gap-3 bg-[#0A0A0A] border border-[#1A1A1A] p-4 rounded-none w-fit lg:min-w-[220px]">
                <MapPin size={14} className="text-[#8B0000]" />
                <p className="text-[#A1A1A1] text-xs font-mono font-normal tracking-wide">Kerala, India</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-[#A1A1A1] font-mono font-normal">
            &copy; {new Date().getFullYear()} AFNAN.
          </p>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#A1A1A1] uppercase font-sans font-medium tracking-[0.08em]">Powered By</span>
            <span className="text-[10px] text-white font-sans font-medium uppercase tracking-[0.08em]">STACKXIO WEB SOLUTIONS</span>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3 text-xs font-sans font-medium uppercase tracking-[0.08em] text-[#A1A1A1] hover:text-[#8B0000] transition-colors group"
          >
            Back To Top
            <div className="w-8 h-8 rounded-none bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-center group-hover:border-[#8B0000] transition-colors duration-300">
              <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
