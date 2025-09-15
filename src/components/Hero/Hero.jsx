import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import personalEs from "../../locales/es/personal_es.json";
import personalEn from "../../locales/en/personal_en.json";

const Hero = ({ language }) => {
  const navigate = useNavigate();
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
      id="home"
      ref={ref}
      className="snap-start min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gray-900"
    >
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 order-2 md:order-1"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-200">
              {language === "EN" ? "Hi, I'm " : "Hola, soy "}
              <span className="hidden md:inline-block relative overflow-hidden text-console-green text-6xl font-semibold">
                {personalData.name}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-console-green rounded-full"
                  style={{ width: "50%" }}
                  animate={isVisible ? { x: ["-130%", "230%"] } : { x: "-130%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                />
              </span>
              <span className="inline-block md:hidden text-console-green text-6xl font-semibold">
                {personalData.name}
              </span>
            </h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-console-orange"
            >
              {personalData.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-400 leading-relaxed"
            >
              {personalData.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex space-x-4"
            >
              <a
                href={personalData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white text-white hover:bg-gray-800 hover:text-white transition-colors duration-300 text-2xl"
              >
                <FiGithub />
              </a>
              <a
                href={personalData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white text-white hover:bg-blue-600 hover:text-white transition-colors duration-300 text-2xl"
              >
                <FiLinkedin />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <a
                href={personalData.resume}
                download
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {language === "EN" ? "Download Resume" : "Descargar Resumen"}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center order-1 md:order-2"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
              <img
                src={personalData.image}
                alt="Foto de perfil"
                className="w-full h-full object-cover rounded-full border-[8px] border-console-green"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
