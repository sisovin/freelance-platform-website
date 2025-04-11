const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get user profile
const getUserProfile = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    return user;
  } catch (err) {
    throw new Error('Server error');
  }
};

// Update user profile
const updateUserProfile = async (userId, profileData) => {
  const { username, email, bio, profilePicture } = profileData;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profilePicture = profilePicture || user.profilePicture;
    await user.save();
    return user;
  } catch (err) {
    throw new Error('Server error');
  }
};

// Change password
const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return { message: 'Password changed successfully' };
  } catch (err) {
    throw new Error('Server error');
  }
};

// Delete account
const deleteAccount = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
    return { message: 'Account deleted successfully' };
  } catch (err) {
    throw new Error('Server error');
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteAccount
};
