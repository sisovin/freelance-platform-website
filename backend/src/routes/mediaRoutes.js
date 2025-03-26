const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const mediaController = require('../controllers/mediaController');

// Route for uploading media files
router.post('/upload', upload, mediaController.uploadMedia);

// Route for updating media files
router.put('/update/:id', mediaController.updateMedia);

// Route for deleting media files
router.delete('/delete/:id', mediaController.deleteMedia);

module.exports = router;
