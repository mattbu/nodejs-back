const express = require("express");
const {
  getPosts,
  getPost,
  createPost,
  updatePosts,
  removePosts,
} = require("../controllers/postsController");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", updatePosts);
router.delete("/:id", removePosts);

module.exports = router;
