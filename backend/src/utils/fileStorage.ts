const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Save file to disk
const saveFile = (file, dirPath) => {
  createDirectory(dirPath);
  const filePath = path.join(dirPath, file.originalname);
  fs.writeFileSync(filePath, file.buffer);
  return filePath;
};

// Delete file from disk
const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Move file to a new directory
const moveFile = (oldPath, newPath) => {
  createDirectory(path.dirname(newPath));
  fs.renameSync(oldPath, newPath);
};

module.exports = {
  createDirectory,
  saveFile,
  deleteFile,
  moveFile
};
