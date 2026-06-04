import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, ShoppingCart, Code2, Cloud, Layout, Wrench, ArrowUpRight, Briefcase } from 'lucide-react';
import api from '../utils/api';

const defaultServices = [
  {
    iconName: 'Globe',
    title: 'Business Websites',
    description: 'High-converting, SEO-optimized business websites that establish authority and drive growth.'
  },
  {
    iconName: 'ShoppingCart',
    title: 'E-Commerce Stores',
    description: 'Scalable online stores with secure payment gateways, inventory management, and premium user experiences.'
  },
  {
    iconName: 'Code2',
    title: 'Custom Web Applications',
    description: 'Tailored web applications built with the MERN stack to solve complex business challenges.'
  },
  {
    iconName: 'Cloud',
    title: 'SaaS Development',
    description: 'End-to-end development of Software as a Service platforms with multi-tenant architectures.'
  },
  {
    iconName: 'Layout',
    title: 'UI/UX Systems',
    description: 'Cinematic, intuitive, and luxury design systems that provide a world-class user experience.'
  },
  {
    iconName: 'Wrench',
    title: 'Maintenance & Growth Support',
    description: 'Long-term support, performance optimization, and continuous improvement for digital assets.'
  }
];

const iconMap = { Globe, ShoppingCart, Code2, Cloud, Layout, Wrench, Briefcase };

const Services = () => {
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/api/services');
        if (response.data && response.data.length > 0) {
          setServices(response.data);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#050505]">

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0A0A0A] border border-[#1A1A1A] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000]" />
            <span className="text-xs font-sans font-medium uppercase tracking-[0.08em] text-[#8B0000]">
              STACKXIO WEB SOLUTIONS
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.1] mb-6 text-white">
            Services I Deliver Through My Startup
          </h2>
          
          <p className="text-[#A1A1A1] font-sans font-normal text-base md:text-lg leading-[1.8]">
            Through STACKXIO Web Solutions, I help startups and businesses build scalable digital products, SaaS platforms, web applications, and growth-focused online experiences.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.iconName] || Globe;
            const number = String(index + 1).padStart(2, '0');
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="group relative p-6 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#8B0000] transition-all duration-300 overflow-hidden cursor-pointer rounded-none hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(139,0,0,0.12)] flex flex-col h-full"
              >
                {/* Service Number */}
                <div className="absolute top-6 right-6 text-4xl font-display font-bold text-[#1A1A1A] group-hover:text-[#8B0000]/10 transition-colors duration-500 select-none">
                  {number}
                </div>
                
                {/* Icon */}
                <div className="w-10 h-10 bg-[#050505] flex items-center justify-center mb-6 text-[#A1A1A1] group-hover:text-[#8B0000] border border-[#1A1A1A] group-hover:border-[#8B0000]/30 transition-all duration-300 rounded-none">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                
                {/* Content */}
                <h4 className="text-lg font-display font-bold text-white mb-3 relative z-10">
                  {service.title}
                </h4>
                <p className="text-[#A1A1A1] text-sm font-sans font-normal leading-[1.8] relative z-10 mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Learn More Arrow */}
                <div className="flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.08em] text-[#A1A1A1] group-hover:text-[#8B0000] transition-colors duration-300 relative z-10 mt-auto">
                  <span>Learn More</span>
                  <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default Services;
