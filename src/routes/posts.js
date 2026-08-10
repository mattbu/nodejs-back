const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePosts,
  removePosts,
} = require("../controllers/postsController");
const { validateCreatePost, validateUpdatePost } = require('../middleware/postValidation')

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", validateCreatePost, createPost);
router.patch("/:id", validateUpdatePost, updatePosts);
router.delete("/:id", removePosts);

module.exports = router;
