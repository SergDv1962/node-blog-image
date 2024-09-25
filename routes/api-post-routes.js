const express = require("express");

const {
  getPost,
  // editPost,
  updatePost,
  deletePost,
  getPosts,
  // getFormNewPost,
  addNewPost,
} = require("../controllers/api-post-controllers");

const router = express.Router();

// get All Posts
router.get("/api/posts", getPosts);
// get One Post
router.get("/api/post/:id", getPost);
// add new POst
router.post("/api/post", addNewPost);
// delete Post
router.delete("/api/post/:id", deletePost);
// update Post
router.put("/api/post/:id", updatePost);

module.exports = router;
