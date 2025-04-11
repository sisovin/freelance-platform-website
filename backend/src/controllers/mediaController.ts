const Media = require('../../mongodb/schema').Media;

// Upload media file
exports.uploadMedia = async (req, res) => {
  try {
    const newMedia = new Media({
      name: req.file.filename,
      url: `/uploads/${req.file.filename}`,
      uploadedBy: req.user.id
    });
    await newMedia.save();
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading media file', error });
  }
};

// Update media file
exports.updateMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media file not found' });
    }
    media.name = req.body.name || media.name;
    await media.save();
    res.status(200).json(media);
  } catch (error) {
    res.status(500).json({ message: 'Error updating media file', error });
  }
};

// Delete media file
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media file not found' });
    }
    await media.remove();
    res.status(200).json({ message: 'Media file deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting media file', error });
  }
};
