import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../contexts/ToastContext';
import { 
  MessageSquare, 
  FileText, 
  Check, 
  X, 
  Download,
  Trash2
} from 'lucide-react';

import * as Tabs from '@radix-ui/react-tabs';
import axios from 'axios';

const AdminPanel = () => {
  const { success, error } = useToast();
  const [comments, setComments] = useState([]);
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [commentsRes, cvsRes] = await Promise.all([
        axios.get('/api/comments/all'),
        axios.get('/api/cv/all')
      ]);
      setComments(commentsRes.data);
      setCvs(cvsRes.data);
    } catch (err) {
      error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [error]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCommentAction = async (commentId, action) => {
    try {
      if (action === 'approve') {
        await axios.put(`/api/comments/${commentId}/approve`, { isApproved: true });
        success('Comment approved successfully');
      } else if (action === 'reject') {
        await axios.put(`/api/comments/${commentId}/approve`, { isApproved: false });
        success('Comment rejected successfully');
      } else if (action === 'delete') {
        await axios.delete(`/api/comments/${commentId}`);
        success('Comment deleted successfully');
      }
      fetchData();
    } catch (err) {
      error('Failed to perform action');
    }
  };

  const handleCvAction = async (cvId, action) => {
    try {
      if (action === 'approve') {
        await axios.put(`/api/cv/${cvId}/approve`, { isApproved: true });
        success('CV approved successfully');
      } else if (action === 'reject') {
        await axios.put(`/api/cv/${cvId}/approve`, { isApproved: false });
        success('CV rejected successfully');
      } else if (action === 'delete') {
        await axios.delete(`/api/cv/${cvId}`);
        success('CV deleted successfully');
      }
      fetchData();
    } catch (err) {
      error('Failed to perform action');
    }
  };

  const downloadCv = async (cvId, fileName) => {
    try {
      const response = await axios.get(`/api/cv/download/${cvId}`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      error('Failed to download CV');
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
            Admin Panel
          </h1>

          <Tabs.Root defaultValue="comments" className="space-y-8">
            <Tabs.List className="flex space-x-1 bg-white p-1 rounded-lg border">
              <Tabs.Trigger
                value="comments"
                className="flex-1 px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Comments ({comments.length})
              </Tabs.Trigger>
              <Tabs.Trigger
                value="cvs"
                className="flex-1 px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
              >
                <FileText className="w-4 h-4 mr-2" />
                CVs ({cvs.length})
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="comments" className="space-y-6">
              <div className="card p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Manage Comments
                  </h2>
                  <p className="text-gray-600">
                    Review and moderate user comments
                  </p>
                </div>

                <div>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="loading-spinner"></div>
                    </div>
                  ) : comments.length > 0 ? (
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div key={comment._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                                <span className="text-sm text-gray-500">({comment.email})</span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  comment.isApproved 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {comment.isApproved ? 'Approved' : 'Pending'}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-2">{comment.message}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(comment.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              {!comment.isApproved && (
                                <button
                                  onClick={() => handleCommentAction(comment._id, 'approve')}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {comment.isApproved && (
                                <button
                                  onClick={() => handleCommentAction(comment._id, 'reject')}
                                  className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleCommentAction(comment._id, 'delete')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No comments found.
                    </p>
                  )}
                </div>
              </div>
            </Tabs.Content>

            <Tabs.Content value="cvs" className="space-y-6">
              <div className="card p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Manage CVs
                  </h2>
                  <p className="text-gray-600">
                    Review and manage uploaded CVs
                  </p>
                </div>

                <div>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="loading-spinner"></div>
                    </div>
                  ) : cvs.length > 0 ? (
                    <div className="space-y-4">
                      {cvs.map((cv) => (
                        <div key={cv._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-gray-900">{cv.name}</h4>
                                <span className="text-sm text-gray-500">({cv.email})</span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  cv.isApproved 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {cv.isApproved ? 'Approved' : 'Pending'}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                {cv.originalName} • {formatFileSize(cv.fileSize)}
                              </p>
                              <p className="text-sm text-gray-500">
                                Uploaded {new Date(cv.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button
                                onClick={() => downloadCv(cv._id, cv.originalName)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              {!cv.isApproved && (
                                <button
                                  onClick={() => handleCvAction(cv._id, 'approve')}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {cv.isApproved && (
                                <button
                                  onClick={() => handleCvAction(cv._id, 'reject')}
                                  className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleCvAction(cv._id, 'delete')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">
                      No CVs found.
                    </p>
                  )}
                </div>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel; 