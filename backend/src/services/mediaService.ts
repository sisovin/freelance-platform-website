const Media = require('../../mongodb/schema').Media;
const fs = require('fs');
const path = require('path');

// Upload media file
exports.uploadMedia = async (file, userId) => {
  try {
    const newMedia = new Media({
      name: file.filename,
      url: `/uploads/${file.filename}`,
      uploadedBy: userId
    });
    await newMedia.save();
    return newMedia;
  } catch (error) {
    throw new Error('Error uploading media file');
  }
};

// Update media file
exports.updateMedia = async (mediaId, newName) => {
  try {
    const media = await Media.findById(mediaId);
    if (!media) {
      throw new Error('Media file not found');
    }
    media.name = newName || media.name;
    await media.save();
    return media;
  } catch (error) {
    throw new Error('Error updating media file');
  }
};

// Delete media file
exports.deleteMedia = async (mediaId) => {
  try {
    const media = await Media.findById(mediaId);
    if (!media) {
      throw new Error('Media file not found');
    }
    const filePath = path.join(__dirname, '../../uploads', media.name);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await media.remove();
    return { message: 'Media file deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting media file');
  }
};
