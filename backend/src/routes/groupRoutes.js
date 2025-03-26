const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const groupController = require('../controllers/groupController');

// Create a new group
router.post('/', authMiddleware, groupController.createGroup);

// Get all groups
router.get('/', authMiddleware, groupController.getAllGroups);

// Get a single group by ID
router.get('/:id', authMiddleware, groupController.getGroupById);

// Update a group by ID
router.put('/:id', authMiddleware, groupController.updateGroup);

// Delete a group by ID
router.delete('/:id', authMiddleware, groupController.deleteGroup);

module.exports = router;
