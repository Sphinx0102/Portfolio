import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";
import emailjs from '@emailjs/browser';
import personalES from '../../locales/es/personal_es.json';
import personalEN from '../../locales/en/personal_en.json';

const Contact = ({ language }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const personalData = language === 'es' ? personalES : personalEN;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailBody = `
Correo Electrónico: ${formData.email}

Mensaje:
${formData.message}
    `;

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        subject: formData.name,
        message: emailBody,
        to_email: personalData.email
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(() => {
      alert(language === "EN" ? "Message sent!" : "¡Mensaje enviado!");
      setFormData({ name: '', email: '', message: '' });
    }, (error) => {
      console.error(error);
      alert(language === "EN" ? "Failed to send message." : "Error al enviar mensaje.");
    });
  };

  return (
    <section id="contact" ref={ref} className="snap-start min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12 text-console-green"
        >
          {language === "EN" ? "Contact" : "Contacto"}
        </motion.h2>

        <motion.div className="grid md:grid-cols-2 gap-12" initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6 }} className="space-y-6">
            <h3 className="text-xl font-semibold text-console-orange">{language === "EN" ? "Get In Touch" : "Ponte en Contacto"}</h3>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-200 mb-1 ml-8">{language === "EN" ? "Email" : "Correo"}</p>
                <div className="flex items-center space-x-3">
                  <HiOutlineEnvelope className="text-xl text-console-green" />
                  <span className='text-gray-400'>{personalData.email}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-200 mb-1 ml-8">{language === "EN" ? "Location" : "Ubicación"}</p>
                <div className="flex items-center space-x-3">
                  <HiOutlineMapPin className="text-xl text-console-green" />
                  <span className='text-gray-400'>{personalData.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3 text-console-orange">{language === "EN" ? "Connect With Me" : "Conéctate Conmigo"}</h4>
              <div className="flex space-x-4">
                <a href={personalData.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block w-32 px-8 py-4 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors">LinkedIn</a>
                <a href={personalData.social.github} target="_blank" rel="noopener noreferrer" className="inline-block w-32 px-8 py-4 bg-gray-800 text-white text-center rounded-lg hover:bg-gray-700 transition-colors">GitHub</a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6, delay: 0.2 }} className='bg-gray-800/50 backdrop-blur-md rounded-2xl p-8'>
            <h3 className="text-xl font-semibold mb-6 text-console-orange">{language === "EN" ? "Send a Message" : "Enviar un Mensaje"}</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={language === "EN" ? "Name" : "Nombre"} className="w-full px-4 py-3 border text-white border-console-green bg-slate-900 rounded-lg focus:ring-2 focus:border-transparent caret-console-green" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={language === "EN" ? "Email" : "Correo"} className="w-full px-4 py-3 border text-white border-console-green bg-slate-900 rounded-lg focus:ring-2 focus:border-transparent caret-console-green" />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder={language === "EN" ? "Message" : "Mensaje"} rows="5" className="w-full px-4 py-3 border text-white border-console-green bg-slate-900 rounded-lg focus:ring-2 focus:border-transparent caret-console-green"></textarea>
              <button type="submit" className="w-full px-6 py-3 bg-console-green text-black rounded-lg hover:bg-console-green/80 transition-colors">{language === "EN" ? "Send Message" : "Enviar"}</button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
