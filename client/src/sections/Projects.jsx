import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const fallbackProjects = [
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    subtitle: 'Next.js & Stripe',
    description: 'A full-stack e-commerce solution with modern UI, secure payments, and an admin dashboard.',
    category: 'Full Stack',
    images: ['https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop'],
    liveDemoLink: '#',
    githubLink: '#'
  },
  {
    title: 'AI Dashboard',
    slug: 'ai-dashboard',
    subtitle: 'React & Tailwind',
    description: 'An AI analytics dashboard visualizing complex datasets in real-time.',
    category: 'Frontend',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'],
    liveDemoLink: '#',
    githubLink: '#'
  },
  {
    title: 'Social Network',
    slug: 'social-network',
    subtitle: 'MERN Stack',
    description: 'A responsive social network with real-time chat, notifications, and media sharing.',
    category: 'Full Stack',
    images: ['https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop'],
    liveDemoLink: '#',
    githubLink: '#'
  },
  {
    title: 'Portfolio Architect',
    slug: 'portfolio-architect',
    subtitle: 'Three.js & React',
    description: 'A premium 3D portfolio builder for creative professionals.',
    category: '3D/WebGL',
    images: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop'],
    liveDemoLink: '#',
    githubLink: '#'
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/api/projects?featured=true&limit=6');
        if (res.data.length > 0) {
          setProjects(res.data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-xs font-sans font-medium uppercase tracking-[0.08em] text-[#8B0000] mb-4">Featured Work</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white">
              Selected Projects
            </h3>
          </div>
          
          <Link to="/portfolio" className="group inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-surface border border-border hover:border-primary text-white font-medium transition-all duration-300">
            <span>View All Projects</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-sm overflow-hidden bg-surface border border-border hover:border-primary transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container */}
                <Link to={`/portfolio/${project.slug}`} className="aspect-[16/10] overflow-hidden relative shrink-0 block">
                  <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
                  <img 
                    src={project.images && project.images[0] ? project.images[0] : fallbackProjects[0].images[0]} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-sm bg-[#050505]/80 border border-[#1A1A1A] text-[10px] font-mono font-normal text-white uppercase tracking-wider">
                    {project.category?.name || project.category || 'Portfolio'}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <Link to={`/portfolio/${project.slug}`}>
                    <h4 className="text-xl font-display font-bold text-white mb-2 hover:text-[#8B0000] transition-colors">
                      {project.title}
                    </h4>
                  </Link>
                  <p className="text-[#8B0000] text-xs font-mono font-normal mb-4">{project.subtitle}</p>
                  <p className="text-[#A1A1A1] font-sans font-normal leading-[1.8] mb-6 line-clamp-3 flex-grow text-sm">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <Link to={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors">
                      View Project <ArrowRight size={16} />
                    </Link>
                    <div className="flex items-center gap-4 text-white/50">
                      {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                          <FaGithub size={20} />
                        </a>
                      )}
                      {project.liveDemoLink && (
                        <a href={project.liveDemoLink} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
