const User = require('../models/User');

// Function to send a friend request
const sendFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Already friends' });
    }

    user.friends.push(friendId);
    await user.save();

    res.status(200).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to accept a friend request
const acceptFriendRequest = async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.user.id);
    const friend = await User.findById(friendId);

    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }

    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: 'Friend request not found' });
    }

    user.friends.push(friendId);
    await user.save();

    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to delete a friend request
const deleteFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user.id);

    if (!user.friends.includes(id)) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    user.friends = user.friends.filter(friendId => friendId.toString() !== id);
    await user.save();

    res.status(200).json({ message: 'Friend request deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to get all friends
const getAllFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends', 'username email profilePicture');
    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  deleteFriendRequest,
  getAllFriends
};
