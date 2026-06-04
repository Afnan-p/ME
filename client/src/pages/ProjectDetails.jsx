import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckSquare } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProject = async () => {
      try {
        const res = await api.get(`/api/projects/${slug}`);
        setProject(res.data);
      } catch (err) {
        console.error('Error fetching project:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#1A1A1A] border-t-[#8B0000] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl text-white font-display font-bold mb-4 tracking-tighter">PROJECT NOT FOUND</h1>
        <Link to="/portfolio" className="text-[#A1A1A1] hover:text-[#8B0000] font-sans font-medium uppercase tracking-[0.08em] transition-colors">Return to Portfolio</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#8B0000] selection:text-white">
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 border-b border-[#1A1A1A] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#8B0000_0%,_transparent_40%)] mix-blend-screen blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 xl:px-24 max-w-[1400px] relative z-10">
          <Link to="/portfolio" className="inline-flex items-center gap-3 text-[#A1A1A1] hover:text-white transition-colors mb-12 text-xs font-sans font-bold uppercase tracking-[0.08em]">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#8B0000]"></div>
              <span className="text-xs font-sans font-medium tracking-[0.08em] text-[#A1A1A1] uppercase">
                {project.category?.name || 'Portfolio Case Study'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 tracking-tighter leading-none">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-[#A1A1A1] font-sans font-light mb-12 max-w-4xl leading-[1.6]">
              {project.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              {project.liveDemoLink && (
                <a href={project.liveDemoLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-white text-[#050505] px-8 py-4 text-xs font-bold uppercase tracking-[0.08em] hover:bg-[#8B0000] hover:text-white transition-all duration-300">
                  View Live Site <ExternalLink size={16} />
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-transparent border border-[#1A1A1A] text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.08em] hover:border-[#8B0000] transition-colors duration-300">
                  Source Code <FaGithub size={16} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>



      {/* Content Layout */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 xl:px-24 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column - Details & Media */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Media Showcase */}
              {project.images && project.images.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-4">
                  {/* Main Image */}
                  <div className="relative aspect-[16/10] w-full border border-[#1A1A1A] bg-[#0A0A0A] overflow-hidden group">
                    <img 
                      src={project.images[0]} 
                      alt={`${project.title} Main Preview`} 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    />
                  </div>
                  
                  {/* Thumbnail Grid for other images */}
                  {project.images.length > 1 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {project.images.slice(1).map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] group border border-[#1A1A1A] bg-[#0A0A0A] overflow-hidden cursor-pointer">
                          <div className="absolute inset-0 bg-[#8B0000]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                          <img 
                            src={img} 
                            alt={`${project.title} view ${idx + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" 
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Overview */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">Project Overview</h3>
                  <div className="h-[1px] flex-grow bg-[#1A1A1A]"></div>
                </div>
                <div className="prose prose-invert prose-lg max-w-none text-[#A1A1A1] font-sans font-light leading-[1.8]">
                  {project.description.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-6">{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              {/* Challenges */}
              {project.challenges && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">The Challenge</h3>
                    <div className="h-[1px] flex-grow bg-[#1A1A1A]"></div>
                  </div>
                  <div className="p-8 bg-[#0A0A0A] border border-[#1A1A1A] border-l-4 border-l-[#8B0000]">
                    <p className="text-[#A1A1A1] font-sans font-light leading-[1.8]">{project.challenges}</p>
                  </div>
                </motion.div>
              )}

              {/* Results */}
              {project.results && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight">The Outcome</h3>
                    <div className="h-[1px] flex-grow bg-[#1A1A1A]"></div>
                  </div>
                  <div className="p-8 bg-[#050505] border border-[#1A1A1A]">
                    <p className="text-white font-sans font-light leading-[1.8]">{project.results}</p>
                  </div>
                </motion.div>
              )}

            </div>

            {/* Right Column - Tech & Features Sidebar */}
            <div className="lg:col-span-4 space-y-12">
              
              {/* Tech Stack */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h4 className="text-sm font-sans font-bold text-white uppercase tracking-[0.08em] mb-6">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies && project.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 border border-[#1A1A1A] bg-[#0A0A0A] text-xs font-mono text-[#A1A1A1] hover:border-[#8B0000] hover:text-white transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                  {(!project.technologies || project.technologies.length === 0) && (
                    <span className="text-[#A1A1A1] text-sm font-mono">No stack specified</span>
                  )}
                </div>
              </motion.div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-8 border-t border-[#1A1A1A]">
                  <h4 className="text-sm font-sans font-bold text-white uppercase tracking-[0.08em] mb-6">Key Features</h4>
                  <ul className="space-y-4">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <CheckSquare size={16} className="text-[#8B0000] shrink-0 mt-1" />
                        <span className="text-[#A1A1A1] font-sans text-sm leading-[1.6]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
