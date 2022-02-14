const express = require('express');

const { publicPosts, privatePosts } = require('../db');
const checkAuthentication = require('../middleware/checkAuth')

const postRouter = express.Router();

postRouter.get('/public', (req, res) => {
  res.json(publicPosts);
});

postRouter.get('/private', checkAuthentication , (req, res) => {
  res.json(privatePosts);
});


module.exports = postRouter;