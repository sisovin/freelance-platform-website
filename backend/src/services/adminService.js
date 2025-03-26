const User = require('../models/User');
const Job = require('../models/Job');
const Post = require('../models/Post');

const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

const deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
    return { message: 'User deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

const getAllJobs = async () => {
  try {
    const jobs = await Job.find();
    return jobs;
  } catch (error) {
    throw new Error('Error fetching jobs');
  }
};

const deleteJob = async (jobId) => {
  try {
    await Job.findByIdAndDelete(jobId);
    return { message: 'Job deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting job');
  }
};

const getAllPosts = async () => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    throw new Error('Error fetching posts');
  }
};

const deletePost = async (postId) => {
  try {
    await Post.findByIdAndDelete(postId);
    return { message: 'Post deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting post');
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAllJobs,
  deleteJob,
  getAllPosts,
  deletePost,
};
