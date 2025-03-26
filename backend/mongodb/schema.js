const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  bio: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  media: [{ type: Schema.Types.ObjectId, ref: 'Media' }]
});

const jobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  deadline: { type: Date, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const postSchema = new Schema({
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const mediaSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const User = mongoose.model('User', userSchema);
const Job = mongoose.model('Job', jobSchema);
const Post = mongoose.model('Post', postSchema);
const Media = mongoose.model('Media', mediaSchema);

module.exports = {
  User,
  Job,
  Post,
  Media
};
