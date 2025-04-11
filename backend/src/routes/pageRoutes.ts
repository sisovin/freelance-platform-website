const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');

// Create a new page
router.post('/', authMiddleware, roleMiddleware(['admin', 'editor']), pageController.createPage);

// Get all pages
router.get('/', pageController.getAllPages);

// Get a single page by ID
router.get('/:id', pageController.getPageById);

// Update a page by ID
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'editor']), pageController.updatePage);

// Delete a page by ID
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), pageController.deletePage);

module.exports = router;
