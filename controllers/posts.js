const Posts = require('../models/posts.js');
const { successHandler, errorHandler } = require('../responses');
const postValidator = require('../validators/posts');

const posts = {
  async getPosts(req, res) {
    const getPosts = await Posts.find();
    successHandler(res, getPosts);
  },
  async createPost(req, res) {
    const result = postValidator(req.body);
    if (result?.errorMessage) {
      errorHandler(res, result.errorMessage);
    } else {
      try {
        const createPost = await Posts.create(result);
        successHandler(res, createPost);
      } catch (error) {
        errorHandler(res, error.message);
      }
    }
  },
  async deletePosts(req, res) {
    await Posts.deleteMany({});
    successHandler(res, []);
  },
  async deletePost(req, res) {
    try {
      const delPosts = await Posts.findByIdAndDelete(req.params.id);
      delPosts
        ? successHandler(res, '刪除成功')
        : errorHandler(res, '這筆資料已經刪除過了');
    } catch (error) {
      errorHandler(res, 'ID 有誤，無該筆資料');
    }
  },
  async updatePost(req, res) {
    const result = postValidator(req.body);
    if (result?.errorMessage) {
      errorHandler(res, result.errorMessage);
    } else {
      try {
        const updatePost = await Posts.findByIdAndUpdate(
          req.params.id,
          result,
          {
            new: true,
          }
        );
        updatePost
          ? successHandler(res, updatePost)
          : errorHandler(res, 'ID 有誤，無該筆資料');
      } catch (error) {
        errorHandler(res, '傳入資料有誤');
      }
    }
  },
};

module.exports = posts;
