import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import personalEs from "../../locales/es/personal_es.json";
import personalEn from "../../locales/en/personal_en.json";

const About = ({ language }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const personalData = language === "EN" ? personalEn : personalEs;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="snap-start min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gray-900"
    >
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-8 text-console-green"
        >
          {language === "EN" ? "About Me" : "Sobre mí"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-200 text-xl leading-relaxed text-justify"
        >
          {personalData.about}
        </motion.p>
      </div>
    </section>
  );
};

export default About;
