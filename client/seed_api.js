const API_URL = 'http://localhost:5001/api';

const settings = [
  { key: 'heroTitle', value: 'Building SaaS Products That Drive Business Growth' },
  { key: 'heroSubtitle', value: 'FOUNDER • STACKXIO WEB SOLUTIONS' },
  { key: 'heroDescription', value: 'As a Full Stack MERN Developer and Founder, I transform ideas into fast, scalable, and user-focused web applications. Specializing in React, Node.js, Express, and MongoDB, I build digital products that combine performance, functionality, and modern design.' },
  { key: 'aboutLeftText', value: "I'm a passionate Full Stack MERN Developer who enjoys turning ideas into modern, scalable web applications. My focus is on creating fast, user-friendly digital experiences that solve real-world problems and deliver meaningful value." },
  { key: 'aboutRightText', value: "From frontend design to backend architecture, I love building complete solutions that combine performance, functionality, and clean design. Every project is an opportunity to learn, innovate, and create something impactful." },
  { key: 'aboutTitle', value: 'My Journey & Expertise' },
  { key: 'linkedinLink', value: 'https://linkedin.com/in/afnanshad' },
  { key: 'githubLink', value: 'https://github.com/afnanshad' },
  { key: 'instagramLink', value: 'https://instagram.com/afnanshad' },
  { key: 'whatsappLink', value: 'https://wa.me/919876543210' },
  { key: 'email', value: 'hello@stackxio.com' }
];

const skills = [
  { name: "React", category: "Frontend Engineering" },
  { name: "Next.js", category: "Frontend Engineering" },
  { name: "JavaScript", category: "Frontend Engineering" },
  { name: "TypeScript", category: "Frontend Engineering" },
  { name: "Tailwind CSS", category: "Frontend Engineering" },
  { name: "Framer Motion", category: "Frontend Engineering" },
  { name: "GSAP", category: "Frontend Engineering" },
  { name: "Redux Toolkit", category: "Frontend Engineering" },
  { name: "Node.js", category: "Backend Development" },
  { name: "Express.js", category: "Backend Development" },
  { name: "REST APIs", category: "Backend Development" },
  { name: "JWT Authentication", category: "Backend Development" },
  { name: "Multer", category: "Backend Development" },
  { name: "Socket.io", category: "Backend Development" },
  { name: "Bcrypt", category: "Backend Development" },
  { name: "MVC Architecture", category: "Backend Development" },
  { name: "MongoDB", category: "Database Systems" },
  { name: "Mongoose", category: "Database Systems" },
  { name: "PostgreSQL", category: "Database Systems" },
  { name: "Redis", category: "Database Systems" },
  { name: "Database Design", category: "Database Systems" },
  { name: "Aggregation Pipeline", category: "Database Systems" },
  { name: "Git", category: "Deployment & Tools" },
  { name: "GitHub", category: "Deployment & Tools" },
  { name: "Docker", category: "Deployment & Tools" },
  { name: "AWS", category: "Deployment & Tools" },
  { name: "Vercel", category: "Deployment & Tools" },
  { name: "Render", category: "Deployment & Tools" },
  { name: "Postman", category: "Deployment & Tools" },
  { name: "Linux", category: "Deployment & Tools" },
  { name: "Responsive Design", category: "Software Engineering" },
  { name: "Performance Optimization", category: "Software Engineering" },
  { name: "Authentication Systems", category: "Software Engineering" },
  { name: "API Integration", category: "Software Engineering" },
  { name: "SEO Fundamentals", category: "Software Engineering" },
  { name: "Problem Solving", category: "Software Engineering" }
];

const services = [
  { iconName: 'Globe', title: 'Business Websites', description: 'High-converting, SEO-optimized business websites that establish authority and drive growth.' },
  { iconName: 'ShoppingCart', title: 'E-Commerce Stores', description: 'Scalable online stores with secure payment gateways, inventory management, and premium user experiences.' },
  { iconName: 'Code2', title: 'Custom Web Applications', description: 'Tailored web applications built with the MERN stack to solve complex business challenges.' },
  { iconName: 'Cloud', title: 'SaaS Development', description: 'End-to-end development of Software as a Service platforms with multi-tenant architectures.' },
  { iconName: 'Layout', title: 'UI/UX Systems', description: 'Cinematic, intuitive, and luxury design systems that provide a world-class user experience.' },
  { iconName: 'Wrench', title: 'Maintenance & Growth Support', description: 'Long-term support, performance optimization, and continuous improvement for digital assets.' }
];

const categoryNames = ['Full Stack', 'Frontend', 'Backend', 'UI/UX', '3D/WebGL'];
const fallbackProjects = [
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    subtitle: 'Next.js & Stripe',
    description: 'A full-stack e-commerce solution with modern UI, secure payments, and an admin dashboard.',
    categoryName: 'Full Stack',
    images: ['https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop'],
    liveDemoLink: '#',
    githubLink: '#',
    technologies: 'Next.js, Stripe, Tailwind, MongoDB',
    features: 'Payments, Cart, Dashboard'
  },
  {
    title: 'AI Dashboard',
    slug: 'ai-dashboard',
    subtitle: 'React & Tailwind',
    description: 'An AI analytics dashboard visualizing complex datasets in real-time.',
    categoryName: 'Frontend',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop'],
    liveDemoLink: '#',
    githubLink: '#',
    technologies: 'React, Tailwind, Recharts',
    features: 'Real-time charts, AI Insights'
  },
  {
    title: 'Social Network',
    slug: 'social-network',
    subtitle: 'MERN Stack',
    description: 'A responsive social network with real-time chat, notifications, and media sharing.',
    categoryName: 'Full Stack',
    images: ['https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop'],
    liveDemoLink: '#',
    githubLink: '#',
    technologies: 'MongoDB, Express, React, Node.js',
    features: 'Chat, Feed, Notifications'
  },
  {
    title: 'Portfolio Architect',
    slug: 'portfolio-architect',
    subtitle: 'Three.js & React',
    description: 'A premium 3D portfolio builder for creative professionals.',
    categoryName: '3D/WebGL',
    images: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop'],
    liveDemoLink: '#',
    githubLink: '#',
    technologies: 'Three.js, React Three Fiber',
    features: '3D Models, Animations'
  }
];

const seedData = async () => {
  try {
    console.log('Seeding settings...');
    for (const setting of settings) {
      const res = await fetch(`${API_URL}/settings/${setting.key}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: setting.value })
      });
      if (!res.ok) console.error('Failed to update setting', setting.key, await res.text());
    }

    console.log('Seeding skills...');
    for (const skill of skills) {
      const res = await fetch(`${API_URL}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill)
      });
      if (!res.ok) console.error('Failed to create skill', skill.name, await res.text());
    }

    console.log('Seeding services...');
    for (const service of services) {
      const res = await fetch(`${API_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });
      if (!res.ok) console.error('Failed to create service', service.title, await res.text());
    }
    
    console.log('Seeding categories...');
    const categoryMap = {};
    for (const name of categoryNames) {
      const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (!res.ok) {
        console.error('Failed to create category', name, await res.text());
      } else {
        const data = await res.json();
        categoryMap[name] = data._id;
      }
    }
    
    // Fetch categories in case they were already created
    const catRes = await fetch(`${API_URL}/categories`);
    const cats = await catRes.json();
    cats.forEach(c => categoryMap[c.name] = c._id);
    
    console.log('Seeding projects...');
    for (const proj of fallbackProjects) {
      proj.category = categoryMap[proj.categoryName];
      if (!proj.category) continue;
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proj)
      });
      if (!res.ok) {
        // usually uniqueness error on slug if it exists, which is fine
        console.error('Failed to create project', proj.title, await res.text());
      }
    }

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Error seeding:', err);
  }
};

seedData();
