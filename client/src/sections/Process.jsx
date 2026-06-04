import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: "01", title: "Discovery", desc: "Understanding the problem, goals, and technical requirements." },
  { num: "02", title: "Planning", desc: "Architecting the solution and defining the development roadmap." },
  { num: "03", title: "Design", desc: "Creating intuitive UI/UX systems focused on user experience." },
  { num: "04", title: "Development", desc: "Building the product with scalable code and modern frameworks." },
  { num: "05", title: "Testing", desc: "Rigorous quality assurance to ensure bug-free performance." },
  { num: "06", title: "Deployment", desc: "Launching the application and maintaining server infrastructure." }
];

const Process = () => {
  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#0A0A0A] border-t border-[#1A1A1A]">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-xs font-sans font-medium uppercase tracking-[0.08em] text-[#8B0000] mb-4">
            WORK PROCESS
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            How I Build Digital Products
          </h3>
        </motion.div>

        <div className="relative">
          {/* Horizontal Line (Desktop) */}
          <div className="hidden lg:block absolute top-[15px] left-8 right-8 h-[1px] bg-[#1A1A1A] z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center lg:items-start group"
              >
                {/* Node */}
                <div className="w-8 h-8 rounded-none bg-[#050505] border border-[#1A1A1A] flex items-center justify-center mb-6 group-hover:border-[#8B0000] transition-colors duration-300 relative z-10">
                  <div className="w-2 h-2 rounded-full bg-[#8B0000] scale-0 group-hover:scale-100 transition-transform duration-300" />
                </div>
                
                <h4 className="text-[#8B0000] font-mono font-normal text-sm mb-2">{step.num}</h4>
                <h5 className="text-white font-display font-bold text-lg mb-3 text-center lg:text-left">{step.title}</h5>
                <p className="text-[#A1A1A1] text-sm font-sans font-normal leading-[1.8] text-center lg:text-left">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
