import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = ({ activeSection, scrollToSection, language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sectionsData = [
    { id: 'home', labelEN: 'Home', labelES: 'Inicio' },
    { id: 'about', labelEN: 'About', labelES: 'Sobre Mi' },
    { id: 'experience', labelEN: 'Experience', labelES: 'Experiencia' },
    { id: 'skills', labelEN: 'Skills', labelES: 'Habilidades' },
    { id: 'projects', labelEN: 'Projects', labelES: 'Proyectos' },
    { id: 'contact', labelEN: 'Contact', labelES: 'Contacto' },
  ];

  const toggleLanguage = () => setLanguage(language === 'EN' ? 'ES' : 'EN');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <nav className="fixed top-0 w-full bg-transparent shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button className="md:hidden flex flex-col justify-between w-6 h-6 z-50" onClick={() => setIsOpen(!isOpen)}>
          <motion.span animate={isOpen ? { rotate: 45, y: 11 } : { rotate: 0, y: 0 }} className="block h-0.5 w-full bg-white rounded" style={{ originX: 0.5, originY: 0.5 }} transition={{ duration: 0.3, ease: 'easeInOut' }} />
          <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-0.5 w-full bg-white rounded" transition={{ duration: 0.2, ease: 'easeInOut' }} />
          <motion.span animate={isOpen ? { rotate: -45, y: -11 } : { rotate: 0, y: 0 }} className="block h-0.5 w-full bg-white rounded" style={{ originX: 0.5, originY: 0.5 }} transition={{ duration: 0.3, ease: 'easeInOut' }} />
        </button>

        <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none">
          <img src="/assets/icons/Logo.svg" alt="Logo" className="h-12 w-12" />
        </div>

        <div className="hidden md:flex justify-end items-center space-x-8">
          {sectionsData.map(({ id, labelEN, labelES }) => {
            const label = language === 'EN' ? labelEN : labelES;
            return (
              <div key={id} className="relative">
                <button
                  onClick={() => scrollToSection(id)}
                  className={`px-3 py-2 rounded-md font-medium ${
                    activeSection === id
                      ? 'text-console-green'
                      : 'text-gray-600 hover:text-console-orange hover:underline'
                  }`}
                >
                  {label}
                </button>
                {activeSection === id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-console-green rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            );
          })}

          <button
            onClick={toggleLanguage}
            className="px-3 py-1 border border-console-green rounded-md text-console-green hover:bg-console-orange hover:text-gray-900 hover:border-none transition-colors"
          >
            {language}
          </button>
        </div>

        {isOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }} className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col justify-center items-center space-y-8 text-white text-2xl z-40">
            {sectionsData.map(({ id, labelEN, labelES }) => (
              <button key={id} onClick={() => { scrollToSection(id); setIsOpen(false); }} className="hover:text-console-green transition-colors">
                {language === 'EN' ? labelEN : labelES}
              </button>
            ))}

            <button
              onClick={toggleLanguage}
              className="px-6 py-2 border border-console-green rounded-md hover:bg-console-orange hover:text-gray-900 hover:border-none transition-colors"
            >
              {language}
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Header;
