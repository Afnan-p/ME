import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Services from '../sections/Services';
import Process from '../sections/Process';
import Contact from '../sections/Contact';

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Services />
      <Process />
      <Contact />
    </main>
  );
};

export default Home;
