import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Plus, Edit2, Trash2, X, LayoutDashboard, Tags, Code2, Briefcase, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminProjects = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'categories'
  
  // Projects State
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  
  // Categories State
  const [categories, setCategories] = useState([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  // Skills State
  const [skills, setSkills] = useState([]);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const initialSkillForm = { name: '', category: '', icon: '' };
  const [skillFormData, setSkillFormData] = useState(initialSkillForm);

  // Services State
  const [services, setServices] = useState([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const initialServiceForm = { title: '', description: '', iconName: '' };
  const [serviceFormData, setServiceFormData] = useState(initialServiceForm);

  // Messages State
  const [messages, setMessages] = useState([]);

  // Settings State
  const [settings, setSettings] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    aboutTitle: '',
    aboutLeftText: '',
    aboutRightText: '',
    statProjects: 15,
    statClients: 10,
    statTechnologies: 10,
    statYears: 2,
    email: '',
    phone: '',
    githubLink: '',
    linkedinLink: '',
    instagramLink: '',
    whatsappLink: ''
  });
  
  const [loading, setLoading] = useState(true);

  const initialProjectForm = {
    title: '', subtitle: '', slug: '', description: '', 
    category: '', featured: false, liveDemoLink: '', 
    githubLink: '', challenges: '', results: '',
    images: '', technologies: '', features: ''
  };

  const initialCategoryForm = { name: '', slug: '' };

  const [projectFormData, setProjectFormData] = useState(initialProjectForm);
  const [categoryFormData, setCategoryFormData] = useState(initialCategoryForm);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, catRes, setRes, skillsRes, servicesRes, msgRes] = await Promise.all([
        api.get('/api/projects'),
        api.get('/api/categories'),
        api.get('/api/settings'),
        api.get('/api/skills'),
        api.get('/api/services'),
        api.get('/api/contact')
      ]);
      setProjects(projRes.data);
      setCategories(catRes.data);
      setSkills(skillsRes.data);
      setServices(servicesRes.data);
      setMessages(msgRes.data);
      if (setRes.data) {
        setSettings(prev => ({ ...prev, ...setRes.data }));
      }
      if (catRes.data.length > 0 && !projectFormData.category) {
        setProjectFormData(prev => ({ ...prev, category: catRes.data[0]._id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- Settings Handlers ---
  const handleSettingChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const promises = Object.keys(settings).map(key => 
        api.put(`/api/settings/${key}`, { value: settings[key] })
      );
      await Promise.all(promises);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving settings');
    }
  };

  // --- Category Handlers ---
  const handleCategoryChange = (e) => {
    setCategoryFormData({ ...categoryFormData, [e.target.name]: e.target.value });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategoryId) {
        await api.put(`/api/categories/${editingCategoryId}`, categoryFormData);
      } else {
        await api.post('/api/categories', categoryFormData);
      }
      setIsCategoryModalOpen(false);
      setCategoryFormData(initialCategoryForm);
      setEditingCategoryId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error saving category');
    }
  };

  const handleCategoryDelete = async (id) => {
    if (window.confirm('Delete this category? Projects linked to it might break.')) {
      try {
        await api.delete(`/api/categories/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // --- Skill Handlers ---
  const handleSkillChange = (e) => setSkillFormData({ ...skillFormData, [e.target.name]: e.target.value });
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSkillId) await api.put(`/api/skills/${editingSkillId}`, skillFormData);
      else await api.post('/api/skills', skillFormData);
      setIsSkillModalOpen(false);
      setSkillFormData(initialSkillForm);
      setEditingSkillId(null);
      fetchData();
    } catch (err) { console.error(err); alert('Error saving skill'); }
  };
  const handleSkillDelete = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try { await api.delete(`/api/skills/${id}`); fetchData(); } catch (err) { console.error(err); }
    }
  };

  // --- Service Handlers ---
  const handleServiceChange = (e) => setServiceFormData({ ...serviceFormData, [e.target.name]: e.target.value });
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingServiceId) await api.put(`/api/services/${editingServiceId}`, serviceFormData);
      else await api.post('/api/services', serviceFormData);
      setIsServiceModalOpen(false);
      setServiceFormData(initialServiceForm);
      setEditingServiceId(null);
      fetchData();
    } catch (err) { console.error(err); alert('Error saving service'); }
  };
  const handleServiceDelete = async (id) => {
    if (window.confirm('Delete this service?')) {
      try { await api.delete(`/api/services/${id}`); fetchData(); } catch (err) { console.error(err); }
    }
  };

  // --- Project Handlers ---
  const handleProjectChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setProjectFormData(prev => ({ ...prev, [name]: files }));
    } else {
      setProjectFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(projectFormData).forEach(key => {
      if (key === 'images') {
        if (projectFormData.images instanceof FileList || Array.isArray(projectFormData.images)) {
           Array.from(projectFormData.images).forEach(file => {
             formData.append('images', file);
           });
        } else if (typeof projectFormData.images === 'string') {
           formData.append('existingImages', JSON.stringify(projectFormData.images.split(',').map(i => i.trim()).filter(i => i)));
        }
      } else if (key === 'technologies' || key === 'features') {
         // Keep as string to be parsed by backend
         formData.append(key, projectFormData[key]);
      } else {
        formData.append(key, projectFormData[key]);
      }
    });

    try {
      if (editingProjectId) {
        await api.put(`/api/projects/${editingProjectId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      } else {
        await api.post('/api/projects', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      }
      setIsProjectModalOpen(false);
      setProjectFormData(initialProjectForm);
      setEditingProjectId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    }
  };

  const handleProjectEdit = (project) => {
    setProjectFormData({
      ...project,
      category: project.category?._id || project.category, // Handle populated category
      images: project.images ? project.images.join(', ') : '',
      technologies: project.technologies ? project.technologies.join(', ') : '',
      features: project.features ? project.features.join('\n') : '',
    });
    setEditingProjectId(project._id);
    setIsProjectModalOpen(true);
  };

  const handleProjectDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/api/projects/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleMessageDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await api.delete(`/api/contact/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0A0A] border-r border-[#1A1A1A] flex flex-col hidden md:flex">
        <div className="p-6 border-b border-[#1A1A1A]">
          <h1 className="text-2xl font-display font-bold tracking-tighter text-white">AFNAN<span className="text-[#8B0000]">.</span></h1>
          <p className="text-[10px] text-[#A1A1A1] uppercase tracking-[0.08em] font-medium mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('projects')} 
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-none ${activeTab === 'projects' ? 'bg-[#8B0000] text-white' : 'text-[#A1A1A1] hover:bg-[#1A1A1A] hover:text-white'}`}
          >
            <LayoutDashboard size={18} /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('categories')} 
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-none ${activeTab === 'categories' ? 'bg-[#8B0000] text-white' : 'text-[#A1A1A1] hover:bg-[#1A1A1A] hover:text-white'}`}
          >
            <Tags size={18} /> Categories
          </button>
          <button 
            onClick={() => setActiveTab('skills')} 
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-none ${activeTab === 'skills' ? 'bg-[#8B0000] text-white' : 'text-[#A1A1A1] hover:bg-[#1A1A1A] hover:text-white'}`}
          >
            <Code2 size={18} /> Skills
          </button>
          <button 
            onClick={() => setActiveTab('services')} 
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-none ${activeTab === 'services' ? 'bg-[#8B0000] text-white' : 'text-[#A1A1A1] hover:bg-[#1A1A1A] hover:text-white'}`}
          >
            <Briefcase size={18} /> Services
          </button>
          <button 
            onClick={() => setActiveTab('messages')} 
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors rounded-none ${activeTab === 'messages' ? 'bg-[#8B0000] text-white' : 'text-[#A1A1A1] hover:bg-[#1A1A1A] hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><MessageSquare size={18} /> Messages</div>
            {messages.length > 0 && (
              <span className={`text-[10px] font-bold px-2 py-0.5 ${activeTab === 'messages' ? 'bg-white text-[#8B0000]' : 'bg-[#1A1A1A] text-white'}`}>{messages.length}</span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-none ${activeTab === 'settings' ? 'bg-[#8B0000] text-white' : 'text-[#A1A1A1] hover:bg-[#1A1A1A] hover:text-white'}`}
          >
            <Edit2 size={18} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-[#1A1A1A]">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#A1A1A1] hover:bg-red-500/10 hover:text-red-500 transition-colors mb-2 text-left">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </button>
          <a href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#A1A1A1] hover:bg-[#1A1A1A] hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-8 pb-4 border-b border-[#1A1A1A]">
          <h1 className="text-xl font-display font-bold tracking-tighter text-white">AFNAN<span className="text-[#8B0000]">.</span></h1>
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-[#0A0A0A] border border-[#1A1A1A] text-sm text-white px-3 py-2 outline-none"
          >
            <option value="projects">Projects</option>
            <option value="categories">Categories</option>
            <option value="skills">Skills</option>
            <option value="services">Services</option>
            <option value="settings">Settings</option>
          </select>
        </div>

        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="w-10 h-10 border-2 border-[#1A1A1A] border-t-[#8B0000] rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            
            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-1">Manage Projects</h2>
                    <p className="text-sm text-[#A1A1A1] font-sans">Add, edit, or remove portfolio projects.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setProjectFormData({ ...initialProjectForm, category: categories.length > 0 ? categories[0]._id : '' });
                      setEditingProjectId(null);
                      setIsProjectModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-white text-[#050505] hover:bg-[#8B0000] hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300"
                  >
                    <Plus size={16} /> New Project
                  </button>
                </div>
                
                <div className="bg-[#0A0A0A] border border-[#1A1A1A] overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[#1A1A1A] text-[#A1A1A1] text-xs font-medium uppercase tracking-[0.08em] bg-[#050505]">
                        <th className="p-5 font-medium">Project Title</th>
                        <th className="p-5 font-medium">Category</th>
                        <th className="p-5 font-medium">Featured</th>
                        <th className="p-5 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map(project => (
                        <tr key={project._id} className="border-b border-[#1A1A1A] hover:bg-[#050505]/50 transition-colors">
                          <td className="p-5 font-medium text-sm text-white">{project.title}</td>
                          <td className="p-5 text-sm text-[#A1A1A1]">{project.category?.name || 'Unknown'}</td>
                          <td className="p-5 text-sm">
                            {project.featured ? <span className="text-green-500 font-medium">Yes</span> : <span className="text-[#A1A1A1]">No</span>}
                          </td>
                          <td className="p-5 flex justify-end gap-3">
                            <button onClick={() => handleProjectEdit(project)} className="p-2 text-[#A1A1A1] hover:text-white bg-[#050505] border border-[#1A1A1A] hover:border-[#8B0000] transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleProjectDelete(project._id)} className="p-2 text-[#A1A1A1] hover:text-red-500 bg-[#050505] border border-[#1A1A1A] hover:border-red-900 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {projects.length === 0 && (
                        <tr><td colSpan="4" className="p-8 text-center text-[#A1A1A1] text-sm">No projects found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* CATEGORIES TAB */}
            {activeTab === 'categories' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-1">Manage Categories</h2>
                    <p className="text-sm text-[#A1A1A1] font-sans">Organize your projects by category.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setCategoryFormData(initialCategoryForm);
                      setEditingCategoryId(null);
                      setIsCategoryModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-white text-[#050505] hover:bg-[#8B0000] hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300"
                  >
                    <Plus size={16} /> New Category
                  </button>
                </div>

                <div className="bg-[#0A0A0A] border border-[#1A1A1A] max-w-3xl overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[400px]">
                    <thead>
                      <tr className="border-b border-[#1A1A1A] text-[#A1A1A1] text-xs font-medium uppercase tracking-[0.08em] bg-[#050505]">
                        <th className="p-5 font-medium">Name</th>
                        <th className="p-5 font-medium">Slug</th>
                        <th className="p-5 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category => (
                        <tr key={category._id} className="border-b border-[#1A1A1A] hover:bg-[#050505]/50 transition-colors">
                          <td className="p-5 font-medium text-sm text-white">{category.name}</td>
                          <td className="p-5 text-sm text-[#A1A1A1]">{category.slug}</td>
                          <td className="p-5 flex justify-end gap-3">
                            <button onClick={() => {
                              setCategoryFormData({ name: category.name, slug: category.slug });
                              setEditingCategoryId(category._id);
                              setIsCategoryModalOpen(true);
                            }} className="p-2 text-[#A1A1A1] hover:text-white bg-[#050505] border border-[#1A1A1A] hover:border-[#8B0000] transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleCategoryDelete(category._id)} className="p-2 text-[#A1A1A1] hover:text-red-500 bg-[#050505] border border-[#1A1A1A] hover:border-red-900 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {categories.length === 0 && (
                        <tr><td colSpan="3" className="p-8 text-center text-[#A1A1A1] text-sm">No categories found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* SKILLS TAB */}
            {activeTab === 'skills' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-1">Manage Skills</h2>
                    <p className="text-sm text-[#A1A1A1] font-sans">Manage your technical expertise.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSkillFormData(initialSkillForm);
                      setEditingSkillId(null);
                      setIsSkillModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-white text-[#050505] hover:bg-[#8B0000] hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300"
                  >
                    <Plus size={16} /> Add Skill
                  </button>
                </div>

                <div className="bg-[#0A0A0A] border border-[#1A1A1A] max-w-3xl overflow-hidden">
                  {skills.length === 0 ? (
                    <div className="p-8 text-center text-[#A1A1A1] text-sm">No skills found.</div>
                  ) : (
                    Object.entries(
                      skills.reduce((acc, skill) => {
                        if (!acc[skill.category]) acc[skill.category] = [];
                        acc[skill.category].push(skill);
                        return acc;
                      }, {})
                    ).map(([categoryName, categorySkills]) => (
                      <div key={categoryName} className="border-b border-[#1A1A1A] last:border-b-0">
                        <div className="bg-[#050505] px-5 py-3 border-b border-[#1A1A1A] flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#8B0000] mr-3"></div>
                          <h3 className="text-sm font-sans font-medium uppercase tracking-[0.08em] text-white">{categoryName}</h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[300px]">
                            <tbody>
                              {categorySkills.map(skill => (
                                <tr key={skill._id} className="border-b border-[#1A1A1A] last:border-b-0 hover:bg-[#050505]/50 transition-colors">
                                  <td className="p-4 pl-10 font-medium text-sm text-[#A1A1A1]">{skill.name}</td>
                                  <td className="p-4 flex justify-end gap-3">
                                    <button onClick={() => {
                                      setSkillFormData({ name: skill.name, category: skill.category, icon: skill.icon });
                                      setEditingSkillId(skill._id);
                                      setIsSkillModalOpen(true);
                                    }} className="p-2 text-[#A1A1A1] hover:text-white bg-[#050505] border border-[#1A1A1A] hover:border-[#8B0000] transition-colors">
                                      <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleSkillDelete(skill._id)} className="p-2 text-[#A1A1A1] hover:text-red-500 bg-[#050505] border border-[#1A1A1A] hover:border-red-900 transition-colors">
                                      <Trash2 size={16} />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* SERVICES TAB */}
            {activeTab === 'services' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-1">Manage Services</h2>
                    <p className="text-sm text-[#A1A1A1] font-sans">Manage your company services.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setServiceFormData(initialServiceForm);
                      setEditingServiceId(null);
                      setIsServiceModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-white text-[#050505] hover:bg-[#8B0000] hover:text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300"
                  >
                    <Plus size={16} /> Add Service
                  </button>
                </div>

                <div className="bg-[#0A0A0A] border border-[#1A1A1A] max-w-4xl overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#1A1A1A] text-[#A1A1A1] text-xs font-medium uppercase tracking-[0.08em] bg-[#050505]">
                        <th className="p-5 font-medium">Title</th>
                        <th className="p-5 font-medium">Description</th>
                        <th className="p-5 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map(service => (
                        <tr key={service._id} className="border-b border-[#1A1A1A] hover:bg-[#050505]/50 transition-colors">
                          <td className="p-5 font-medium text-sm text-white">{service.title}</td>
                          <td className="p-5 text-sm text-[#A1A1A1] truncate max-w-xs">{service.description}</td>
                          <td className="p-5 flex justify-end gap-3">
                            <button onClick={() => {
                              setServiceFormData({ title: service.title, description: service.description, iconName: service.iconName });
                              setEditingServiceId(service._id);
                              setIsServiceModalOpen(true);
                            }} className="p-2 text-[#A1A1A1] hover:text-white bg-[#050505] border border-[#1A1A1A] hover:border-[#8B0000] transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleServiceDelete(service._id)} className="p-2 text-[#A1A1A1] hover:text-red-500 bg-[#050505] border border-[#1A1A1A] hover:border-red-900 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {services.length === 0 && (
                        <tr><td colSpan="3" className="p-8 text-center text-[#A1A1A1] text-sm">No services found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-1">Client Inquiries</h2>
                    <p className="text-sm text-[#A1A1A1] font-sans">Manage your contact form submissions.</p>
                  </div>
                </div>

                <div className="space-y-4 max-w-4xl">
                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-[#A1A1A1] text-sm bg-[#0A0A0A] border border-[#1A1A1A]">No messages found.</div>
                  ) : (
                    messages.map(msg => (
                      <div key={msg._id} className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 hover:border-[#8B0000] transition-colors relative group">
                        <button onClick={() => handleMessageDelete(msg._id)} className="absolute top-6 right-6 text-[#A1A1A1] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 size={16} />
                        </button>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-4 border-b border-[#1A1A1A] pb-4">
                          <div>
                            <p className="text-xs text-[#A1A1A1] uppercase tracking-[0.08em] font-medium mb-1">From</p>
                            <p className="text-sm font-bold text-white">{msg.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-[#A1A1A1] uppercase tracking-[0.08em] font-medium mb-1">Email</p>
                            <a href={`mailto:${msg.email}`} className="text-sm text-[#8B0000] hover:underline font-mono">{msg.email}</a>
                          </div>
                          <div>
                            <p className="text-xs text-[#A1A1A1] uppercase tracking-[0.08em] font-medium mb-1">Date</p>
                            <p className="text-sm text-[#A1A1A1]">{new Date(msg.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-sm text-[#A1A1A1] leading-[1.8] whitespace-pre-wrap font-sans">
                          {msg.message}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-4xl">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-white mb-1">Site Settings</h2>
                    <p className="text-sm text-[#A1A1A1] font-sans">Manage global configuration for your portfolio.</p>
                  </div>
                  <button 
                    onClick={handleSettingsSubmit}
                    className="flex items-center gap-2 bg-[#8B0000] text-white hover:bg-[#A50000] px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300"
                  >
                    Save Settings
                  </button>
                </div>

                <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-8 space-y-10">
                  
                  {/* Hero Section */}
                  <div>
                    <h3 className="text-sm font-sans font-medium uppercase tracking-[0.08em] text-[#8B0000] mb-6">Hero Section</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Hero Title</label>
                        <input name="heroTitle" value={settings.heroTitle} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Hero Subtitle</label>
                        <input name="heroSubtitle" value={settings.heroSubtitle} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Hero Description</label>
                        <textarea name="heroDescription" value={settings.heroDescription} onChange={handleSettingChange} rows={3} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors leading-[1.8]" />
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="pt-8 border-t border-[#1A1A1A]">
                    <h3 className="text-sm font-sans font-medium uppercase tracking-[0.08em] text-[#8B0000] mb-6">About Section</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">About Title</label>
                        <input name="aboutTitle" value={settings.aboutTitle} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">About Left Paragraph</label>
                        <textarea name="aboutLeftText" value={settings.aboutLeftText} onChange={handleSettingChange} rows={4} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors leading-[1.8]" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">About Right Paragraph</label>
                        <textarea name="aboutRightText" value={settings.aboutRightText} onChange={handleSettingChange} rows={4} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors leading-[1.8]" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-[#1A1A1A]">
                        <div>
                          <label className="block text-[10px] font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Projects Built</label>
                          <input type="number" name="statProjects" value={settings.statProjects} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Happy Clients</label>
                          <input type="number" name="statClients" value={settings.statClients} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Technologies</label>
                          <input type="number" name="statTechnologies" value={settings.statTechnologies} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Years Exp.</label>
                          <input type="number" name="statYears" value={settings.statYears} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="pt-8 border-t border-[#1A1A1A]">
                    <h3 className="text-sm font-sans font-medium uppercase tracking-[0.08em] text-[#8B0000] mb-6">Contact & Socials</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Email Address</label>
                        <input name="email" value={settings.email} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Phone Number</label>
                        <input name="phone" value={settings.phone} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">GitHub Link</label>
                        <input name="githubLink" value={settings.githubLink} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">LinkedIn Link</label>
                        <input name="linkedinLink" value={settings.linkedinLink} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Instagram Link</label>
                        <input name="instagramLink" value={settings.instagramLink} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">WhatsApp Link</label>
                        <input name="whatsappLink" value={settings.whatsappLink} onChange={handleSettingChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>

      {/* Project Add/Edit Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] w-full max-w-4xl my-8 relative shadow-2xl shadow-black/50">
            <div className="flex justify-between items-center p-6 border-b border-[#1A1A1A] sticky top-0 bg-[#0A0A0A] z-10">
              <h2 className="text-xl font-display font-bold text-white">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
              <button onClick={() => setIsProjectModalOpen(false)} className="text-[#A1A1A1] hover:text-[#8B0000] transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleProjectSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Title *</label>
                  <input required name="title" value={projectFormData.title} onChange={handleProjectChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Slug (optional)</label>
                  <input name="slug" value={projectFormData.slug} onChange={handleProjectChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Subtitle *</label>
                  <input required name="subtitle" value={projectFormData.subtitle} onChange={handleProjectChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Category *</label>
                  <select required name="category" value={projectFormData.category} onChange={handleProjectChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors appearance-none">
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                    {categories.length === 0 && <option value="">No categories available</option>}
                  </select>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <input type="checkbox" name="featured" id="featured" checked={projectFormData.featured} onChange={handleProjectChange} className="w-4 h-4 accent-[#8B0000] bg-[#050505] border-[#1A1A1A]" />
                  <label htmlFor="featured" className="text-sm font-medium text-[#A1A1A1]">Set as Featured Project (shows on Home)</label>
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Live Demo URL</label>
                  <input name="liveDemoLink" value={projectFormData.liveDemoLink} onChange={handleProjectChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">GitHub URL</label>
                  <input name="githubLink" value={projectFormData.githubLink} onChange={handleProjectChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors font-mono" />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Upload Images (Cloudinary)</label>
                  <input type="file" multiple name="images" onChange={handleProjectChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-2 text-sm text-white focus:border-[#8B0000] outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-none file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-[#8B0000] file:text-white hover:file:bg-[#A50000] file:cursor-pointer" />
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {typeof projectFormData.images === 'string' && projectFormData.images.length > 0 && 
                      projectFormData.images.split(',').map((img, idx) => (
                        <div key={idx} className="relative aspect-video bg-[#050505] border border-[#1A1A1A] overflow-hidden group">
                          <img src={img.trim()} alt="preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ))
                    }
                    {(projectFormData.images instanceof FileList || Array.isArray(projectFormData.images)) && 
                      Array.from(projectFormData.images).map((file, idx) => (
                        <div key={idx} className="relative aspect-video bg-[#050505] border border-[#1A1A1A] overflow-hidden group">
                          <img src={URL.createObjectURL(file)} alt="preview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute top-2 right-2 bg-[#8B0000] text-[10px] px-2 py-1 font-bold text-white uppercase tracking-widest shadow-md">NEW</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Technologies (comma separated)</label>
                  <input name="technologies" value={projectFormData.technologies} onChange={handleProjectChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Overview / Description *</label>
                  <textarea required name="description" value={projectFormData.description} onChange={handleProjectChange} rows={3} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors leading-[1.8]" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Features (one per line)</label>
                  <textarea name="features" value={projectFormData.features} onChange={handleProjectChange} rows={3} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors leading-[1.8]" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Challenges (optional)</label>
                  <textarea name="challenges" value={projectFormData.challenges} onChange={handleProjectChange} rows={2} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors leading-[1.8]" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Results (optional)</label>
                  <textarea name="results" value={projectFormData.results} onChange={handleProjectChange} rows={2} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors leading-[1.8]" />
                </div>
              </div>

              <div className="md:col-span-2 pt-6 border-t border-[#1A1A1A] flex justify-end gap-4 mt-2">
                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-6 py-3 bg-[#050505] border border-[#1A1A1A] text-white hover:border-[#8B0000] text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300">
                  Cancel
                </button>
                <button type="submit" disabled={categories.length === 0} className="px-6 py-3 bg-[#8B0000] text-white hover:bg-[#A50000] text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {editingProjectId ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Add/Edit Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-start justify-center p-4 mt-16">
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] w-full max-w-md shadow-2xl shadow-black/50">
            <div className="flex justify-between items-center p-6 border-b border-[#1A1A1A]">
              <h2 className="text-xl font-display font-bold text-white">{editingCategoryId ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setIsCategoryModalOpen(false)} className="text-[#A1A1A1] hover:text-[#8B0000] transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCategorySubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Category Name *</label>
                <input required name="name" value={categoryFormData.name} onChange={handleCategoryChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Slug (optional)</label>
                <input name="slug" value={categoryFormData.slug} onChange={handleCategoryChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors font-mono" />
              </div>

              <div className="pt-6 border-t border-[#1A1A1A] flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-6 py-3 bg-[#050505] border border-[#1A1A1A] text-white hover:border-[#8B0000] text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-3 bg-[#8B0000] text-white hover:bg-[#A50000] text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Skill Add/Edit Modal */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-start justify-center p-4 mt-16">
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] w-full max-w-md shadow-2xl shadow-black/50">
            <div className="flex justify-between items-center p-6 border-b border-[#1A1A1A]">
              <h2 className="text-xl font-display font-bold text-white">{editingSkillId ? 'Edit Skill' : 'Add Skill'}</h2>
              <button onClick={() => setIsSkillModalOpen(false)} className="text-[#A1A1A1] hover:text-[#8B0000] transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSkillSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Skill Name *</label>
                <input required name="name" value={skillFormData.name} onChange={handleSkillChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Category *</label>
                <input required name="category" list="skill-categories" value={skillFormData.category} onChange={handleSkillChange} placeholder="e.g. Frontend Engineering, Backend Development" className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors font-mono" />
                <datalist id="skill-categories">
                  {[...new Set(skills.map(s => s.category))].map(cat => (
                    <option key={cat} value={cat} />
                  ))}
                </datalist>
              </div>
              <div className="pt-6 border-t border-[#1A1A1A] flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setIsSkillModalOpen(false)} className="px-6 py-3 bg-[#050505] border border-[#1A1A1A] text-white hover:border-[#8B0000] text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-3 bg-[#8B0000] text-white hover:bg-[#A50000] text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Service Add/Edit Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050505]/90 backdrop-blur-md flex items-start justify-center p-4 mt-16">
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] w-full max-w-md shadow-2xl shadow-black/50">
            <div className="flex justify-between items-center p-6 border-b border-[#1A1A1A]">
              <h2 className="text-xl font-display font-bold text-white">{editingServiceId ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-[#A1A1A1] hover:text-[#8B0000] transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleServiceSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Service Title *</label>
                <input required name="title" value={serviceFormData.title} onChange={handleServiceChange} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Description *</label>
                <textarea required name="description" value={serviceFormData.description} onChange={handleServiceChange} rows={3} className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors leading-[1.8]" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-[#A1A1A1] uppercase tracking-[0.08em] mb-2">Icon Name (Lucide)</label>
                <input required name="iconName" value={serviceFormData.iconName} onChange={handleServiceChange} placeholder="e.g. Globe, Code2" className="w-full bg-[#050505] border border-[#1A1A1A] p-3 text-sm text-white focus:border-[#8B0000] outline-none transition-colors font-mono" />
              </div>
              <div className="pt-6 border-t border-[#1A1A1A] flex justify-end gap-4 mt-4">
                <button type="button" onClick={() => setIsServiceModalOpen(false)} className="px-6 py-3 bg-[#050505] border border-[#1A1A1A] text-white hover:border-[#8B0000] text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-3 bg-[#8B0000] text-white hover:bg-[#A50000] text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProjects;
