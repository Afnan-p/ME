import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { Search, ArrowRight, ArrowLeft, Plus, FolderOpen } from 'lucide-react';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, catRes] = await Promise.all([
        api.get('/api/projects'),
        api.get('/api/categories')
      ]);
      setProjects(projRes.data);
      setCategories([{ _id: 'All', name: 'All' }, ...catRes.data]);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // 1. Filter by Category
  let filteredProjects = projects.filter(project => {
    if (activeCategoryId === 'All') return true;
    return project.category?._id === activeCategoryId;
  });

  // 2. Filter by Search Query
  filteredProjects = filteredProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 3. Sort by Latest
  filteredProjects = filteredProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // 4. Pagination
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleCategoryClick = (id) => {
    setActiveCategoryId(id);
    setVisibleCount(6); // reset pagination on category change
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050505] text-white selection:bg-[#8B0000] selection:text-white relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 xl:px-24 max-w-[1400px] relative z-10">
        
        <Link to="/" className="inline-flex items-center gap-3 text-[#A1A1A1] hover:text-white transition-colors mb-12 text-xs font-sans font-bold uppercase tracking-[0.08em]">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#8B0000]"></div>
            <span className="text-xs font-sans font-medium tracking-[0.08em] text-[#A1A1A1] uppercase">
              Our Work
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tighter">
            Portfolio <span className="text-[#8B0000]">Archive.</span>
          </h1>
          <p className="text-[#A1A1A1] text-lg md:text-xl max-w-2xl font-sans font-light leading-[1.6]">
            Explore our collection of premium digital solutions, SaaS platforms, and enterprise web applications.
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-16 border-b border-[#1A1A1A] pb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategoryClick(category._id)}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300 ${
                  activeCategoryId === category._id 
                    ? 'bg-[#8B0000] text-white border border-[#8B0000]' 
                    : 'bg-transparent text-[#A1A1A1] border border-[#1A1A1A] hover:border-[#8B0000] hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-72">
            <input 
              type="text" 
              placeholder="SEARCH PROJECTS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#1A1A1A] py-3 pl-12 pr-4 text-white text-xs font-sans font-medium tracking-widest uppercase focus:outline-none focus:border-[#8B0000] transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1A1A1]" size={16} />
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-[#1A1A1A] border-t-[#8B0000] rounded-full animate-spin"></div>
          </div>
        ) : filteredProjects.length > 0 ? (
          <>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {visibleProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="group relative bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#8B0000] transition-colors duration-500 flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <Link to={`/portfolio/${project.slug}`} className="aspect-[16/10] overflow-hidden relative bg-[#050505] shrink-0 block border-b border-[#1A1A1A]">
                      <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-colors z-10 duration-500" />
                      {project.images && project.images[0] && (
                        <img 
                          src={project.images[0]} 
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )}
                      <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#050505]/90 border border-[#1A1A1A] text-[10px] font-mono text-white uppercase tracking-wider shadow-md">
                        {project.category?.name || 'Portfolio'}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <Link to={`/portfolio/${project.slug}`}>
                        <h4 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#8B0000] transition-colors tracking-tight">
                          {project.title}
                        </h4>
                      </Link>
                      <p className="text-[#8B0000] text-xs font-mono mb-4">{project.subtitle}</p>
                      <p className="text-[#A1A1A1] font-sans font-light leading-[1.8] mb-8 line-clamp-3 flex-grow text-sm">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <Link to={`/portfolio/${project.slug}`} className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-[0.08em] text-white hover:text-[#8B0000] transition-colors">
                          View Project <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button 
                  onClick={handleLoadMore}
                  className="px-8 py-4 bg-transparent border border-[#1A1A1A] hover:border-[#8B0000] hover:text-[#8B0000] text-white text-xs font-bold uppercase tracking-[0.08em] transition-colors flex items-center gap-3"
                >
                  <Plus size={16} /> Load More Projects
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center bg-[#0A0A0A] border border-[#1A1A1A] mt-8"
          >
            <div className="w-16 h-16 bg-[#050505] flex items-center justify-center mb-6 border border-[#1A1A1A]">
              <FolderOpen size={24} className="text-[#8B0000]" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tighter">No Projects Found</h3>
            <p className="text-[#A1A1A1] text-lg max-w-md font-sans font-light leading-[1.6]">
              There are currently no projects matching this category or search criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
