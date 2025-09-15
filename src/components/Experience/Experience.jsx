import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import experienceEs from "../../locales/es/experience_es.json";
import experienceEn from "../../locales/en/experience_en.json";

const Experience = ({ language, view, setView }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const experienceData = language === "EN" ? experienceEn : experienceEs;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const handleChangeView = (newView) => {
    setView(newView);
    document.getElementById("experience")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="snap-start min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gray-900 relative"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10"
        >
          <span className="text-console-green">
            {language === "EN" ? "Experience" : "Experiencia"}
          </span>{" "}
          <span className="text-white">&</span>{" "}
          <span className="text-console-orange">
            {language === "EN" ? "Education" : "Educación"}
          </span>
        </motion.h2>

        <div className="sticky top-24 flex justify-center z-30">
          <div className="bg-gray-900 rounded-3xl p-3 shadow-md flex space-x-4">
            <button
              onClick={() => handleChangeView("work")}
              className={`w-28 py-2 rounded-2xl transition-colors border ${
                view === "work"
                  ? "bg-console-green text-slate-900 border-none"
                  : "border-white text-white hover:border-console-green hover:text-console-green"
              }`}
            >
              {language === "EN" ? "Work" : "Trabajo"}
            </button>
            <button
              onClick={() => handleChangeView("education")}
              className={`w-28 py-2 rounded-2xl transition-colors border ${
                view === "education"
                  ? "bg-console-orange text-slate-900 border-none"
                  : "border-white text-white hover:border-console-orange hover:text-console-orange"
              }`}
            >
              {language === "EN" ? "Education" : "Educación"}
            </button>
          </div>
        </div>

        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="relative mt-10"
        >
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-700 -translate-x-1/2"></div>

          <div className="flex flex-col">
            {(view === "work"
              ? experienceData.work
              : experienceData.education
            ).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-console-green rounded-full -translate-x-1/2 z-10 border-2 border-gray-900"></div>

                <div
                  className={`w-full lg:w-[45%] bg-slate-900 text-white rounded-lg p-8 md:p-10 shadow-md ${
                    index % 2 === 0 ? "mr-auto" : "ml-auto"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p
                    className={`mb-2 ${
                      view === "work"
                        ? "text-console-green"
                        : "text-console-orange"
                    }`}
                  >
                    {view === "work"
                      ? `${item.company} • ${item.period}`
                      : `${item.institution} • ${item.period}`}
                  </p>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
