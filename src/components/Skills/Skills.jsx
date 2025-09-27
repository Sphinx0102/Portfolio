import React, { useRef, useState, useEffect } from "react";
import { N8nIcon } from "@lobehub/icons";
import { motion } from "framer-motion";
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaNode, FaGit, FaDocker, FaFigma, 
  FaAngular, FaVuejs, FaJava, FaPython
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql, SiVisualstudiocode,
  SiSpringboot, SiHibernate, SiApachemaven, SiC, SiCplusplus, SiCsharp, 
  SiSelenium, SiTrello, SiAzuredevops, SiDotnet
} from 'react-icons/si';

const iconMap = {
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaNode, FaGit, FaDocker, FaFigma, 
  FaAngular, FaVuejs, FaJava, FaPython,
  SiTypescript, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql,
  SiVisualstudiocode, SiSpringboot, SiHibernate, SiApachemaven, SiC, SiCplusplus, SiCsharp, 
  SiSelenium, SiTrello, SiAzuredevops, SiDotnet, N8nIcon
};

const Skills = ({ skillsData = { frontend: [], backend: [], tools: [] }, language }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const allSkills = [
    ...skillsData.frontend,
    ...skillsData.backend,
    ...skillsData.tools
  ].filter(skill => iconMap[skill.icon]);

  return (
    <section
      id="skills"
      ref={ref}
      className="snap-start min-h-screen px-6 py-20 bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12 text-console-green"
        >
          {language === "EN" ? "Skills" : "Habilidades"}
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 text-console-orange lg:flex-1"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {language === "EN" ? "Frontend" : "Frontend"}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {skillsData.frontend.map(skill => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">
                {language === "EN" ? "Backend" : "Backend"}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {skillsData.backend.map(skill => (
                  <li key={skill.name}>{skill.name}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:flex-[2]"
          >
            <h3 className="text-xl font-semibold mb-4 text-console-orange">
              {language === "EN" ? "Skills & Tools" : "Habilidades y Herramientas"}
            </h3>
            <div 
              className="bg-gray-800/50 backdrop-blur-md p-8 grid gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }}
            >
              {allSkills.map((skill, index) => {
                const IconComponent = iconMap[skill.icon];
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-md bg-gray-900 text-console-green text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {skill.name}
                    </div>
                    <div
                      className="bg-gray-900/70 hover:bg-gray-800/80 rounded-lg p-6 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:border-console-orange w-full h-full"
                      title={skill.name}
                    >
                      {IconComponent && (
                        <IconComponent className="text-4xl" style={{ color: skill.color }} />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
