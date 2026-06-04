import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const badges = [
  "15+ Projects Built",
  "10+ Technologies",
  "2+ Years Learning",
  "MERN Specialist"
];

const defaultCategories = [
  {
    title: "Frontend Engineering",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Redux Toolkit"]
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Multer", "Socket.io", "Bcrypt", "MVC Architecture"]
  },
  {
    title: "Database Systems",
    skills: ["MongoDB", "Mongoose", "PostgreSQL", "Redis", "Database Design", "Aggregation Pipeline"]
  },
  {
    title: "Deployment & Tools",
    skills: ["Git", "GitHub", "Docker", "AWS", "Vercel", "Render", "Postman", "Linux"]
  },
  {
    title: "Software Engineering",
    skills: ["Responsive Design", "Performance Optimization", "Authentication Systems", "API Integration", "SEO Fundamentals", "Problem Solving"]
  }
];

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState(defaultCategories);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/api/skills');
        const data = response.data;
        if (data && data.length > 0) {
          // Group by category
          const grouped = data.reduce((acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill.name);
            return acc;
          }, {});
          
          const mappedCategories = Object.keys(grouped).map(cat => ({
            title: cat,
            skills: grouped[cat]
          }));
          setSkillCategories(mappedCategories);
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#050505]">
      
      {/* Subtle Dark Red Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-[#8B0000]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Header Section */}
        <motion.div 
          className="w-full mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative pl-6 max-w-4xl">
            {/* Vertical Dark Red Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#8B0000]" />

            <h2 className="text-xs font-sans font-medium uppercase tracking-[0.08em] text-[#8B0000] mb-4">
              TECHNICAL EXPERTISE
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Building Modern Web Applications
            </h3>
            <p className="text-[#A1A1A1] text-base lg:text-lg font-sans font-normal leading-[1.8] mb-8 max-w-2xl">
              I specialize in designing and developing scalable web applications using modern technologies. 
              From frontend experiences to backend systems, I focus on performance, maintainability, 
              and clean architecture to deliver reliable digital products.
            </p>

            {/* Badges - Horizontal layout */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[#A1A1A1] font-mono font-normal text-sm tracking-wide">
                  <span className="text-[#8B0000]">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Grid Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 lg:p-8 rounded-none hover:border-[#8B0000] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(139,0,0,0.12)] transition-all duration-300 group h-full flex flex-col"
            >
              <h4 className="text-white font-display font-bold text-base lg:text-lg mb-6 flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8B0000] mt-2 flex-shrink-0" />
                <span className="leading-tight">{category.title}</span>
              </h4>
              <div className="flex flex-col gap-3 mt-auto">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="text-[#A1A1A1] font-mono font-normal text-xs xl:text-sm group-hover:text-white transition-colors duration-300">
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Skills;
