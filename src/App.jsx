import React, { useState, useEffect, useRef } from 'react';
import Header from './components/UI/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import ProjectGrid from './components/Projects/ProjectGrid';
import Contact from './components/Contact/Contact';
import skillsData from './data/skills.json';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [experienceView, setExperienceView] = useState('work');
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [language, setLanguage] = useState('EN');
  const mainRef = useRef(null);

  const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element || !mainRef.current) return;
    mainRef.current.scrollTo({
      top: element.offsetTop,
      behavior: 'smooth',
    });
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      const scrollPosition = main.scrollTop + main.clientHeight / 2;
      for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    main.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => main.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        language={language}
        setLanguage={setLanguage}
      />
      <main
        ref={mainRef}
        className="overflow-y-auto snap-y snap-mandatory scroll-smooth scroll-pt-[64px] h-screen"
      >
        <Hero language={language} />
        <About language={language} />
        <Experience view={experienceView} setView={setExperienceView} language={language} />
        <Skills skillsData={skillsData} language={language} />
        <ProjectGrid visibleProjects={visibleProjects} setVisibleProjects={setVisibleProjects} language={language} />
        <Contact language={language} />
      </main>
    </div>
  );
}

export default App;
