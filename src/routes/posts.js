const express = require("express");

const {
  getPosts,
  getPost,
  createPost,
  updatePosts,
  removePosts,
} = require("../controllers/postsController");

const { validatePostId, validateCreatePost, validateUpdatePost } = require('../middleware/postValidation')

const validate = require('../middleware/validate')

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", validatePostId, validate, getPost);
router.post("/", validateCreatePost, validate, createPost);
router.patch("/:id", validatePostId, validateUpdatePost, validate, updatePosts);
router.delete("/:id", validatePostId, validate, removePosts);

module.exports = router;
