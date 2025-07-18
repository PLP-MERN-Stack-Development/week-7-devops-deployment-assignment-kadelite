import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Smartphone, 
  Globe, 
  Github, 
  Mail,
  MapPin,
  Calendar
} from 'lucide-react';


const About = () => {
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'MongoDB', level: 75 },
    { name: 'Python', level: 70 },
    { name: 'Docker', level: 65 }
  ];

  const experience = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Building modern web applications with React and Node.js'
    },
    {
      title: 'Frontend Developer',
      company: 'Startup',
      period: '2021 - 2022',
      description: 'Developed responsive user interfaces and improved user experience'
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2020 - 2021',
      description: 'Worked on various client projects and learned modern development practices'
    }
  ];

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
              About Me
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Passionate Full Stack Developer with expertise in modern web technologies
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="card p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-4xl">AA</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Adeleke Adekunle
                </h2>
                <p className="text-gray-600">
                  Full Stack Developer
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a
                    href="mailto:mechatronics.samson@gmail.com"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    mechatronics.samson@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Lagos, Nigeria</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-gray-400" />
                  <a
                    href="https://github.com/kadelite"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    github.com/kadelite
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">5+ years experience</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Bio */}
            <div className="card p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  My Story
                </h2>
              </div>
              <div className="space-y-4 text-gray-600">
                <p>
                  Hello! I'm Adeleke Adekunle, a passionate Full Stack Developer based in Lagos, Nigeria. 
                  I love creating software that solves real-world problems and makes a positive impact on people's lives.
                </p>
                <p>
                  With over 5 years of experience in web development, I've worked on various projects 
                  ranging from small business websites to complex enterprise applications. I'm always 
                  eager to learn new technologies and stay up-to-date with the latest industry trends.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                  projects, or sharing my knowledge with the developer community.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="card p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Skills & Technologies
                </h2>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="card p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Work Experience
                </h2>
              </div>
              <div>
                <div className="space-y-6">
                  {experience.map((job, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="border-l-4 border-blue-600 pl-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-blue-600 font-medium">{job.company}</p>
                      <p className="text-sm text-gray-500 mb-2">{job.period}</p>
                      <p className="text-gray-600">{job.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="card p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  What I Offer
                </h2>
              </div>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Web Development</h3>
                      <p className="text-gray-600">
                        Building responsive and modern web applications using the latest technologies.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Database Design</h3>
                      <p className="text-gray-600">
                        Designing efficient database schemas and optimizing query performance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Mobile-First Design</h3>
                      <p className="text-gray-600">
                        Creating mobile-first, responsive interfaces that work on all devices.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Deployment & DevOps</h3>
                      <p className="text-gray-600">
                        Deploying applications to cloud platforms with CI/CD pipelines.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 