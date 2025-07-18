import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { 
  Upload, 
  FileText, 
  User, 
  Mail, 
  Calendar,
  Edit,
  Save,
  X
} from 'lucide-react';

import * as Tabs from '@radix-ui/react-tabs';
import axios from 'axios';

const Dashboard = () => {
  const { user, updateProfile } = useAuth();
  const { success, error } = useToast();
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  useEffect(() => {
    fetchCV();
  }, []);

  const fetchCV = async () => {
    try {
      const response = await axios.get('/api/cv/my-cv');
      setCv(response.data);
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error('Error fetching CV:', err);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      error('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('cv', file);

    try {
      await axios.post('/api/cv/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      success('CV uploaded successfully!');
      fetchCV();
    } catch (err) {
      error(err.response?.data?.message || 'Failed to upload CV');
    } finally {
      setUploading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await updateProfile(profileForm);
      if (result.success) {
        success('Profile updated successfully!');
        setEditing(false);
      } else {
        error(result.error);
      }
    } catch (err) {
      error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Dashboard
          </h1>

          <Tabs.Root defaultValue="profile" className="space-y-8">
            <Tabs.List className="flex space-x-1 bg-white p-1 rounded-lg border">
              <Tabs.Trigger
                value="profile"
                className="flex-1 px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
              >
                Profile
              </Tabs.Trigger>
              <Tabs.Trigger
                value="cv"
                className="flex-1 px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
              >
                CV Management
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="profile" className="space-y-6">
              <div className="card p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Profile Information
                    </h2>
                    <button
                      onClick={() => setEditing(!editing)}
                      className="btn-outline flex items-center space-x-2"
                    >
                      {editing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                      <span>{editing ? 'Cancel' : 'Edit'}</span>
                    </button>
                  </div>
                </div>

                <div>
                  {editing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="input-field"
                          required
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-primary flex items-center space-x-2"
                        >
                          {loading ? (
                            <div className="loading-spinner"></div>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditing(false)}
                          className="btn-outline"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium text-gray-900">{user?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">{user?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium text-gray-900">
                            {new Date(user?.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="cv" className="space-y-6">
              <div className="card p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    CV Management
                  </h2>
                  <p className="text-gray-600">
                    Upload your CV to share with potential employers
                  </p>
                </div>

                <div>
                  {cv ? (
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-8 h-8 text-blue-600" />
                            <div>
                              <h3 className="font-medium text-gray-900">{cv.originalName}</h3>
                              <p className="text-sm text-gray-500">
                                {formatFileSize(cv.fileSize)} • Uploaded {new Date(cv.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {cv.isApproved ? (
                              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                Approved
                              </span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                Pending Review
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <label className="btn-outline flex items-center space-x-2 cursor-pointer">
                          <Upload className="w-4 h-4" />
                          <span>Update CV</span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={uploading}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No CV uploaded yet
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Upload your CV to share with potential employers
                      </p>
                      <label className="btn-primary inline-flex items-center space-x-2 cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>Upload CV</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  )}

                  {uploading && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="loading-spinner"></div>
                        <span className="text-blue-700">Uploading CV...</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Upload Guidelines</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Supported formats: PDF, DOC, DOCX</li>
                      <li>• Maximum file size: 5MB</li>
                      <li>• Your CV will be reviewed before approval</li>
                      <li>• Only approved CVs are visible to employers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 