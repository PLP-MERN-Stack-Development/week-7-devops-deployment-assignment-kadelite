import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, Globe, Smartphone } from 'lucide-react';


const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com/kadelite/ecommerce',
      live: 'https://ecommerce-demo.com',
      category: 'web'
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration, and project tracking features.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop&crop=center',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      github: 'https://github.com/kadelite/task-app',
      live: 'https://task-app-demo.com',
      category: 'web'
    },
    {
      title: 'Mobile Fitness Tracker',
      description: 'A React Native mobile app for tracking workouts, nutrition, and fitness goals with social features and progress analytics.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center',
      technologies: ['React Native', 'Firebase', 'Redux', 'Charts.js'],
      github: 'https://github.com/kadelite/fitness-app',
      live: null,
      category: 'mobile'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with React and Tailwind CSS. Features include dark mode, animations, and contact forms.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop&crop=center',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Radix UI'],
      github: 'https://github.com/kadelite/portfolio',
      live: 'https://adeleke-portfolio.com',
      category: 'web'
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather dashboard that displays current weather conditions, forecasts, and historical data with interactive charts and maps.',
      image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&h=250&fit=crop&crop=center',
      technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Leaflet'],
      github: 'https://github.com/kadelite/weather-app',
      live: 'https://weather-dashboard.com',
      category: 'web'
    },
    {
      title: 'AI Chat Assistant',
      description: 'An AI-powered chat assistant built with Python and machine learning. Features natural language processing and context awareness.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center',
      technologies: ['Python', 'TensorFlow', 'Flask', 'WebSocket'],
      github: 'https://github.com/kadelite/ai-chat',
      live: 'https://ai-chat-demo.com',
      category: 'ai'
    },
    {
      title: 'Social Media Analytics',
      description: 'A comprehensive analytics dashboard for social media management with real-time data visualization and reporting tools.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center',
      technologies: ['React', 'D3.js', 'Node.js', 'Redis'],
      github: 'https://github.com/kadelite/social-analytics',
      live: 'https://social-analytics-demo.com',
      category: 'web'
    },
    {
      title: 'Food Delivery App',
      description: 'A mobile application for food delivery with real-time tracking, payment processing, and restaurant management features.',
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=250&fit=crop&crop=center',
      technologies: ['React Native', 'Google Maps API', 'Stripe', 'Firebase'],
      github: 'https://github.com/kadelite/food-delivery',
      live: null,
      category: 'mobile'
    },
    {
      title: 'Machine Learning Model',
      description: 'A predictive analytics model for customer behavior analysis using advanced machine learning algorithms and data processing.',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=250&fit=crop&crop=center',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter'],
      github: 'https://github.com/kadelite/ml-model',
      live: 'https://ml-demo.com',
      category: 'ai'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: <Code className="w-4 h-4" /> },
    { id: 'web', name: 'Web Apps', icon: <Globe className="w-4 h-4" /> },
    { id: 'mobile', name: 'Mobile Apps', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'ai', name: 'AI/ML', icon: <Code className="w-4 h-4" /> }
  ];

  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My Projects
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              A collection of projects that showcase my skills and passion for creating innovative solutions
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

                {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <div className="text-gray-500 text-lg mb-4">
                No projects found in this category.
              </div>
              <button
                onClick={() => setActiveCategory('all')}
                className="btn-primary"
              >
                View All Projects
              </button>
            </motion.div>
          ) : (
            filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card overflow-hidden hover-lift">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline flex items-center space-x-2 text-sm"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary flex items-center space-x-2 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects; 