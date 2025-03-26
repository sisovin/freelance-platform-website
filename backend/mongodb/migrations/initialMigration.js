const mongoose = require('mongoose');
const { User, Job, Post, Media } = require('../schema');

const initialMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    await User.createCollection();
    await Job.createCollection();
    await Post.createCollection();
    await Media.createCollection();

    console.log('Collections created successfully');
  } catch (error) {
    console.error('Error during initial migration:', error);
  } finally {
    await mongoose.disconnect();
  }
};

initialMigration();
