var express = require('express');
var router = express.Router();
const Posts = require('../models/posts.js');
/* GET home page. */
router.get('/', async (req, res, next) => {
  const getPosts = await Posts.find();
  res.json({
    status: 'success',
    data: getPosts,
  });
});

router.post('/', async (req, res, next) => {
  try {
    const addPosts = await Posts.create(req.body);
    console.log(addPosts);
    res.json({
      status: 'success',
      data: addPosts,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
});

router.delete('/', async (req, res, next) => {
  const delAllPosts = await Posts.deleteMany({});
  res.json({
    status: 'success',
    data: delAllPosts,
  });
});

router.delete('/:id', async (req, res, next) => {
  try {
    const delPosts = await Posts.findByIdAndDelete(req.params.id);
    if (delPosts) {
      res.json({
        status: 'success',
        data: delPosts,
      });
    } else {
      res.json({
        status: 'success',
        data: '這筆資料已經刪除了',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'ID 有誤，無該筆資料',
    });
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const updatePosts = await Posts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      status: 'success',
      data: updatePosts,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: '傳入資料有誤',
    });
  }
});

module.exports = router;
