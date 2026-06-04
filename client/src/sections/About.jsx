import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, animate, useTransform } from 'framer-motion';
import api from '../utils/api';


const roadmapNodes = [
  { year: "2022", title: "Started BCA", details: "Began my formal education in Computer Applications." },
  { year: "2024", title: "MERN Internship", details: "Shifted focus entirely to modern web development." },
  { year: "2025", title: "Frontend Developer Intern", details: "Built real client projects." },
  { year: "2026", title: "Founded STACKXIO", details: "Started my own agency helping businesses scale." },
  { year: "Present", title: "Full Stack Developer", details: "Building high-performance SaaS and Web Apps." }
];

const CountUp = ({ to, suffix }) => {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value) + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, to, suffix]);

  return <span ref={nodeRef}>0{suffix}</span>;
};

const VerticalTimeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative pl-6 md:pl-8">
      {/* Vertical Line Background */}
      <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-[#1A1A1A]" />
      
      {/* Animated Vertical Line */}
      <motion.div 
        className="absolute left-0 top-2 bottom-2 w-[2px] bg-[#8B0000] origin-top"
        style={{ scaleY }}
      />

      <div className="flex flex-col gap-8">
        {roadmapNodes.map((node, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative"
          >
            {/* Timeline Node */}
            <div className="absolute -left-[31px] md:-left-[39px] top-6 w-4 h-4 bg-[#0A0A0A] border-2 border-[#8B0000] rounded-full z-10" />
            
            {/* Milestone Card */}
            <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-5 rounded-none hover:border-[#8B0000] transition-colors duration-300">
              <span className="text-[#8B0000] font-sans font-medium text-xs tracking-[0.08em] uppercase mb-2 block">{node.year}</span>
              <h4 className="text-white font-display font-bold text-base mb-2">{node.title}</h4>
              <p className="text-muted text-sm font-sans font-normal leading-[1.8]">{node.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  const [settings, setSettings] = useState({
    aboutLeftText: "I'm a passionate Full Stack MERN Developer who enjoys turning ideas into modern, scalable web applications. My focus is on creating fast, user-friendly digital experiences that solve real-world problems and deliver meaningful value.",
    aboutRightText: "From frontend design to backend architecture, I love building complete solutions that combine performance, functionality, and clean design. Every project is an opportunity to learn, innovate, and create something impactful.",
    statProjects: 15,
    statClients: 10,
    statTechnologies: 10,
    statYears: 2
  });

  const dynamicStats = [
    { label: 'Projects Built', value: parseInt(settings.statProjects) || 15, suffix: '+' },
    { label: 'Happy Clients', value: parseInt(settings.statClients) || 10, suffix: '+' },
    { label: 'Technologies', value: parseInt(settings.statTechnologies) || 10, suffix: '+' },
    { label: 'Years Experience', value: parseInt(settings.statYears) || 2, suffix: '+' }
  ];

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

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-6xl mx-auto">
          
          {/* Left Side: Story & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-12">
              <h2 className="text-xs font-sans font-medium uppercase tracking-[0.08em] text-[#8B0000] mb-4">THE STORY</h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-8 leading-tight">
                From Student To Founder
              </h3>
              <div className="flex flex-col gap-6 text-muted text-base font-sans font-normal leading-[1.8]">
                <p>{settings.aboutLeftText}</p>
                <p>{settings.aboutRightText}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {dynamicStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 flex flex-col justify-center rounded-none group hover:border-[#8B0000] transition-colors duration-300"
                >
                  <div className="text-3xl font-display font-bold text-white mb-2 group-hover:text-[#8B0000] transition-colors">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-sans font-medium uppercase tracking-[0.08em] text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-full pt-4 lg:pt-0"
          >
             <VerticalTimeline />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
