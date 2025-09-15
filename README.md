# My Portfolio

Welcome to my **Personal Portfolio**! This project showcases my skills, experience, and projects as a **Full Stack Developer**, built as a **Single Page Application (SPA)** with **React** and modern web technologies.

---

## 🚀 Live Demo

[Your Live Portfolio URL](https://sebarosalesportfolio.vercel.app)

---

## 📝 About the Project

This portfolio was built to demonstrate:

- **Front-end skills** using React, Tailwind CSS, and Framer Motion for animations.
- **Back-end and API integrations** with EmailJS for contact form functionality.
- **SPA architecture** ensuring smooth scrolling and user experience.
- **Dockerized deployment** for easy setup and consistent environments.
- **Content Security Policies** implemented for security in production.
- **Prepared for deployment** on platforms like **Vercel**.

---

## 🛠️ Technologies Used

### Frontend

- **React 18**
- **React Router DOM**
- **Tailwind CSS**
- **Framer Motion**
- **React Hook Form**
- **React Icons**

### Backend / Utilities

- **Express 5**
- **EmailJS**
- **Compression** for HTTP response optimization
- **Docker** for containerized deployment

### Tools & Workflow

- **Vite** for fast development and building
- **ESLint** for code quality
- **PostCSS** & **Autoprefixer**
- **Git & GitHub** for version control

---

## 📦 Docker Support

This project is fully **dockerized**:

```bash
# Build Docker image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 --name portfolio portfolio
