import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import heroImg from '../assets/hero.png';
import api from '../utils/api';

const techTags = ["REACT", "JAVASCRIPT", "NODE.JS", "EXPRESS", "MONGODB"];

const Hero = () => {
  const [settings, setSettings] = useState({
    heroTitle: 'Building Scalable Digital Products',
    heroSubtitle: 'AFNAN',
    heroDescription: 'As a Full Stack MERN Developer and Founder, I transform ideas into fast, scalable, and user-focused web applications. Specializing in React, Node.js, Express, and MongoDB, I build digital products that combine performance, functionality, and modern design.',
    email: '',
    githubLink: '',
    linkedinLink: '',
    instagramLink: '',
    whatsappLink: ''
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/api/settings');
        if (response.data) {
          setSettings(prev => ({ ...prev, ...response.data }));
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const socialLinks = [
    { icon: FaLinkedin, link: settings.linkedinLink || '#' },
    { icon: FaGithub, link: settings.githubLink || '#' },
    { icon: FaInstagram, link: settings.instagramLink || '#' },
    { icon: FaWhatsapp, link: settings.whatsappLink || '#' },
    { icon: FaEnvelope, link: settings.email ? `mailto:${settings.email}` : '#' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column (Image & Socials) - 35% */}
          <motion.div 
            className="col-span-1 lg:col-span-4 flex flex-col items-center lg:items-start order-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Premium Developer Frame */}
            <div className="relative w-full max-w-[320px] aspect-[4/5] group z-10">
              {/* Corner Accents */}
              <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-[3px] border-l-[3px] border-[#8B0000] z-20 transition-all duration-500 group-hover:w-10 group-hover:h-10" />
              <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-[3px] border-r-[3px] border-[#8B0000] z-20 transition-all duration-500 group-hover:w-10 group-hover:h-10" />
              
              <div className="relative w-full h-full rounded-none overflow-hidden bg-[#0A0A0A] border border-[#1A1A1A]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90 z-10 pointer-events-none" />
                <img 
                  src={heroImg} 
                  alt="Afnan" 
                  className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out z-0"
                />
              </div>
            </div>

            {/* CONNECT Section */}
            <div className="mt-10 w-full max-w-[320px] flex flex-col items-center lg:items-start z-20">
              <motion.h5 
                className="text-[#A1A1A1] font-sans font-medium text-xs uppercase tracking-[0.08em] mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                Find Me Online
              </motion.h5>
              <div className="flex justify-between w-full">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <motion.a 
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 1.1 + idx * 0.1 }}
                      className="w-12 h-12 bg-[#0A0A0A] border border-[#1A1A1A] rounded-none flex items-center justify-center text-[#A1A1A1] hover:border-[#8B0000] hover:bg-[#8B0000]/10 hover:text-white transition-all duration-300 hover:-translate-y-1"
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
          
          {/* Right Content (Text) - 65% */}
          <motion.div 
            className="col-span-1 lg:col-span-8 flex flex-col items-center text-center lg:items-start lg:text-left order-2 z-20"
          >
            {/* Founder Badge */}
            <motion.div 
              className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#1A1A1A] bg-[#0A0A0A] mb-8 rounded-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="w-1.5 h-1.5 bg-[#8B0000]" />
              <span className="text-white text-[10px] sm:text-xs font-sans font-medium tracking-[0.08em] uppercase">
                {settings.heroSubtitle}
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-bold leading-[1.05] tracking-tighter mb-4 text-white border-l-[4px] border-[#8B0000] pl-5"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            >
              AFNAN
            </motion.h1>
            
            {/* Strong Headline */}
            <motion.h3
              className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-6 leading-tight max-w-[800px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              {settings.heroTitle}
            </motion.h3>
            
            {/* Description */}
            <motion.p 
              className="font-sans font-normal text-[#A1A1A1] max-w-[800px] w-full mb-10 leading-[1.8] text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              {settings.heroDescription}
            </motion.p>

            {/* Capability Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10 w-full max-w-[800px]">
              {techTags.map((tech, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1, duration: 0.4, ease: "easeOut" }}
                  className="font-mono font-normal text-xs text-[#A1A1A1] px-4 py-2 border border-[#1A1A1A] bg-[#0A0A0A] hover:border-[#8B0000] hover:bg-[#8B0000]/10 hover:text-white transition-colors duration-300 rounded-none"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <a 
                href="#projects" 
                className="group flex items-center gap-2 px-8 py-3.5 bg-[#8B0000] text-white font-display font-semibold hover:bg-[#A50000] transition-colors duration-300 rounded-none"
              >
                <span>View Projects</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="#contact" 
                className="group flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#8B0000] text-white font-display font-semibold hover:bg-[#8B0000]/10 transition-colors duration-300 rounded-none"
              >
                <span>Book a Call</span>
              </a>
            </motion.div>

            {/* Founder Information Strip */}
            <motion.div 
              className="py-5 border-y border-[#1A1A1A] w-full max-w-[800px] flex items-center justify-center lg:justify-start gap-3 md:gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            >
              <span className="text-[#A1A1A1] text-[10px] sm:text-xs font-sans font-medium tracking-[0.08em] uppercase">
                KERALA, INDIA
              </span>
              <span className="text-[#8B0000]">•</span>
              <span className="text-white text-[10px] sm:text-xs font-sans font-medium tracking-[0.08em] uppercase">
                STACKXIO WEB SOLUTIONS
              </span>
              <span className="text-[#8B0000]">•</span>
              <span className="text-[#A1A1A1] text-[10px] sm:text-xs font-sans font-medium tracking-[0.08em] uppercase">
                SAAS & WEB APPS
              </span>
            </motion.div>

          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
