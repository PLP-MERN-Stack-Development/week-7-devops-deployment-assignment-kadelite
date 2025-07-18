import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Mail, MapPin, Phone, MessageSquare, Star, Send } from 'lucide-react';

import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

const Contact = () => {
  const { isAuthenticated } = useAuth();
  const { success, error } = useToast();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [commentForm, setCommentForm] = useState({
    message: '',
    rating: 5
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('/api/comments');
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      error('Please login to leave a comment');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/api/comments', commentForm);
      success('Comment submitted successfully! It will be visible after approval.');
      setCommentForm({ message: '', rating: 5 });
      setShowCommentDialog(false);
      fetchComments();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to submit comment');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    
    try {
      await axios.post('/api/contact', contactForm);
      success('Message sent successfully! I will get back to you soon.');
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setContactLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'mechatronics.samson@gmail.com',
      link: 'mailto:mechatronics.samson@gmail.com'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Lagos, Nigeria',
      link: null
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+2348130935473',
      link: 'tel:+2348130935473'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Let's discuss your project and see how I can help bring your ideas to life
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              I'm always interested in new opportunities and exciting projects. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{info.title}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/kadelite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-white hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href="mailto:mechatronics.samson@gmail.com"
                  className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form & Comments */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Quick Contact Form */}
            <div className="card p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Send a Message
                </h2>
                <p className="text-gray-600">
                  Have a project in mind? Let's discuss it!
                </p>
              </div>
              <div>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="input-field"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="input-field"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="input-field resize-none"
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    {contactLoading ? (
                      <div className="loading-spinner"></div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Comments Section */}
            <div className="card p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    What People Say
                  </h2>
                  <button
                    onClick={() => setShowCommentDialog(true)}
                    className="btn-outline flex items-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Leave a Review</span>
                  </button>
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment._id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < comment.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{comment.message}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No comments yet. Be the first to leave a review!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Comment Dialog */}
      <Dialog.Root open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-xl font-bold text-gray-900 mb-4">
              Leave a Review
            </Dialog.Title>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setCommentForm({ ...commentForm, rating })}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= commentForm.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={commentForm.message}
                  onChange={(e) => setCommentForm({ ...commentForm, message: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCommentDialog(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Contact; 