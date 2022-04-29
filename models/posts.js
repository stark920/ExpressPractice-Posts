const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    content: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    collection: 'posts',
  }
);

const Posts = mongoose.model('Posts', postSchema);

module.exports = Posts;
