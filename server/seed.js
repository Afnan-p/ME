import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Setting from './models/Setting.js';
import Skill from './models/Skill.js';
import Service from './models/Service.js';

dotenv.config();

const settings = [
  { key: 'heroTitle', value: 'Building SaaS Products That Drive Business Growth' },
  { key: 'heroSubtitle', value: 'FOUNDER • STACKXIO WEB SOLUTIONS' },
  { key: 'heroDescription', value: 'As a Full Stack MERN Developer and Founder, I transform ideas into fast, scalable, and user-focused web applications. Specializing in React, Node.js, Express, and MongoDB, I build digital products that combine performance, functionality, and modern design.' },
  { key: 'aboutLeftText', value: "I'm a passionate Full Stack MERN Developer who enjoys turning ideas into modern, scalable web applications. My focus is on creating fast, user-friendly digital experiences that solve real-world problems and deliver meaningful value." },
  { key: 'aboutRightText', value: "From frontend design to backend architecture, I love building complete solutions that combine performance, functionality, and clean design. Every project is an opportunity to learn, innovate, and create something impactful." },
  { key: 'aboutTitle', value: 'My Journey & Expertise' },
  { key: 'linkedinLink', value: 'https://linkedin.com/in/afnan' },
  { key: 'githubLink', value: 'https://github.com/afnan' },
  { key: 'instagramLink', value: 'https://instagram.com/afnan' },
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

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio');
    console.log('MongoDB connected for seeding');

    // Seed Settings
    for (const setting of settings) {
      await Setting.findOneAndUpdate({ key: setting.key }, setting, { upsert: true, new: true });
    }
    console.log('Settings seeded');

    // Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(skills);
      console.log('Skills seeded');
    } else {
      console.log('Skills already exist, skipping');
    }

    // Seed Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(services);
      console.log('Services seeded');
    } else {
      console.log('Services already exist, skipping');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
