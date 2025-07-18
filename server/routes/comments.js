const express = require('express');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/Comment');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @desc    Get all approved comments
// @route   GET /api/comments
// @access  Public
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find({ isApproved: true })
      .populate('user', 'name')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// @desc    Create new comment
// @route   POST /api/comments
// @access  Private
router.post('/', protect, [
  body('message').trim().isLength({ min: 1, max: 500 }).withMessage('Message must be between 1 and 500 characters'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, rating = 5 } = req.body;

    const comment = await Comment.create({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      message,
      rating
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name');

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error('Create comment error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// @desc    Get all comments (admin only)
// @route   GET /api/comments/all
// @access  Private/Admin
router.get('/all', protect, authorize('admin'), async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error('Get all comments error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// @desc    Approve/Reject comment
// @route   PUT /api/comments/:id/approve
// @access  Private/Admin
router.put('/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const { isApproved } = req.body;

    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isApproved },
      { new: true }
    ).populate('user', 'name email');

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    res.json(comment);
  } catch (error) {
    console.error('Approve comment error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    await comment.remove();

    res.json({
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
});

module.exports = router; 