const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const CV = require('../models/CV');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// @desc    Upload CV
// @route   POST /api/cv/upload
// @access  Private
router.post('/upload', protect, upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: 'Please upload a file'
      });
    }

    // Check if user already has a CV
    const existingCV = await CV.findOne({ user: req.user._id });
    if (existingCV) {
      // Delete old file
      if (fs.existsSync(existingCV.filePath)) {
        fs.unlinkSync(existingCV.filePath);
      }
      // Update existing CV
      existingCV.fileName = req.file.filename;
      existingCV.originalName = req.file.originalname;
      existingCV.filePath = req.file.path;
      existingCV.fileSize = req.file.size;
      existingCV.mimeType = req.file.mimetype;
      existingCV.isApproved = false;

      await existingCV.save();

      res.json(existingCV);
    } else {
      // Create new CV
      const cv = await CV.create({
        user: req.user._id,
        name: req.user.name,
        email: req.user.email,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      });

      res.status(201).json(cv);
    }
  } catch (error) {
    console.error('CV upload error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// @desc    Get user's CV
// @route   GET /api/cv/my-cv
// @access  Private
router.get('/my-cv', protect, async (req, res) => {
  try {
    const cv = await CV.findOne({ user: req.user._id });
    
    if (!cv) {
      return res.status(404).json({
        message: 'CV not found'
      });
    }

    res.json(cv);
  } catch (error) {
    console.error('Get CV error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// @desc    Download CV (admin only)
// @route   GET /api/cv/download/:id
// @access  Private/Admin
router.get('/download/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);
    
    if (!cv) {
      return res.status(404).json({
        message: 'CV not found'
      });
    }

    if (!fs.existsSync(cv.filePath)) {
      return res.status(404).json({
        message: 'File not found'
      });
    }

    res.download(cv.filePath, cv.originalName);
  } catch (error) {
    console.error('Download CV error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// @desc    Get all CVs (admin only)
// @route   GET /api/cv/all
// @access  Private/Admin
router.get('/all', protect, authorize('admin'), async (req, res) => {
  try {
    const cvs = await CV.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(cvs);
  } catch (error) {
    console.error('Get all CVs error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// @desc    Approve/Reject CV
// @route   PUT /api/cv/:id/approve
// @access  Private/Admin
router.put('/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const { isApproved } = req.body;

    const cv = await CV.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    ).populate('user', 'name email');

    if (!cv) {
      return res.status(404).json({
        message: 'CV not found'
      });
    }

    res.json(cv);
  } catch (error) {
    console.error('Approve CV error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// @desc    Delete CV
// @route   DELETE /api/cv/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);

    if (!cv) {
      return res.status(404).json({
        message: 'CV not found'
      });
    }

    // Delete file from filesystem
    if (fs.existsSync(cv.filePath)) {
      fs.unlinkSync(cv.filePath);
    }

    await cv.remove();

    res.json({
      message: 'CV deleted successfully'
    });
  } catch (error) {
    console.error('Delete CV error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router; 