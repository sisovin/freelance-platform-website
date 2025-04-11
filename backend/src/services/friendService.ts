const User = require('../models/User');

// Function to send a friend request
const sendFriendRequest = async (userId, friendId) => {
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      throw new Error('Friend not found');
    }

    if (user.friends.includes(friendId)) {
      throw new Error('Already friends');
    }

    user.friends.push(friendId);
    await user.save();

    return { message: 'Friend request sent' };
  } catch (error) {
    throw new Error('Server error');
  }
};

// Function to accept a friend request
const acceptFriendRequest = async (userId, friendId) => {
  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) {
      throw new Error('Friend not found');
    }

    if (!user.friends.includes(friendId)) {
      throw new Error('Friend request not found');
    }

    user.friends.push(friendId);
    await user.save();

    return { message: 'Friend request accepted' };
  } catch (error) {
    throw new Error('Server error');
  }
};

// Function to delete a friend request
const deleteFriendRequest = async (userId, friendId) => {
  try {
    const user = await User.findById(userId);

    if (!user.friends.includes(friendId)) {
      throw new Error('Friend request not found');
    }

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    await user.save();

    return { message: 'Friend request deleted' };
  } catch (error) {
    throw new Error('Server error');
  }
};

// Function to get all friends
const getAllFriends = async (userId) => {
  try {
    const user = await User.findById(userId).populate('friends', 'username email profilePicture');
    return user.friends;
  } catch (error) {
    throw new Error('Server error');
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  getAllFriends
};
