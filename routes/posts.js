const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');

router.get('/', posts.getPosts);

router.post('/', posts.createPost);

router.delete('/', posts.deletePosts);

router.delete('/:id', posts.deletePost);

router.patch('/:id', posts.updatePost);

module.exports = router;
