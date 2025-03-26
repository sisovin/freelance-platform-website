const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (content, userId) => {
  const newPost = new Post({
    content,
    createdBy: userId
  });
  await newPost.save();
  return newPost;
};

const updatePost = async (postId, content, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  if (post.createdBy.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  post.content = content;
  await post.save();
  return post;
};

const deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  if (post.createdBy.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  await post.remove();
  return { message: 'Post deleted' };
};

const likePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  if (post.likes.includes(userId)) {
    throw new Error('Post already liked');
  }
  post.likes.push(userId);
  await post.save();
  return post;
};

const commentOnPost = async (postId, comment, userId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }
  post.comments.push({
    comment,
    createdBy: userId
  });
  await post.save();
  return post;
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentOnPost
};
