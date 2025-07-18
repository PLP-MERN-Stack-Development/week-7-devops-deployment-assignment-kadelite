const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// Contact form submission
router.post('/', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters long')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { name, email, message } = req.body;

    // Save to database
    const contact = new Contact({
      name,
      email,
      message,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Log the contact request
    console.log('New contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Add email notification system
    // TODO: Add admin notification

    res.status(200).json({ 
      message: 'Thank you for your message! I will get back to you soon.',
      success: true 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      message: 'Failed to send message. Please try again later.',
      success: false 
    });
  }
});

// Get all contact messages (admin only)
router.get('/all', async (req, res) => {
  try {
    // TODO: Add authentication middleware
    
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.status(200).json({ 
      message: 'Contact messages retrieved successfully',
      data: contacts
    });

  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ 
      message: 'Failed to fetch contact messages',
      success: false 
    });
  }
});

// Update contact message status (admin only)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // TODO: Add authentication middleware

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ 
        message: 'Contact message not found',
        success: false 
      });
    }

    res.status(200).json({ 
      message: 'Contact message status updated successfully',
      data: contact,
      success: true 
    });

  } catch (error) {
    console.error('Error updating contact message status:', error);
    res.status(500).json({ 
      message: 'Failed to update contact message status',
      success: false 
    });
  }
});

module.exports = router; 