import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-slate-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full border border-console-orange"
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>


      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-semibold mb-2 text-console-green">
          {project.title}
        </h3>

        {project.description && (
          <p className="text-gray-300 mb-4 text-sm">
            {project.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech.name}
              className="px-3 py-1 rounded-full text-sm bg-gray-800/50 backdrop-blur-md text-white"
            >
              {tech.name}
            </span>
          ))}
        </div>

        <div className="flex space-x-4 mt-auto pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg text-center hover:bg-gray-700 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
