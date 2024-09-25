const express = require("express");

const {
  getPost,
  editPost,
  updatePost,
  deletePost,
  getPosts,
  getFormNewPost,
  addNewPost,
} = require("../controllers/post-controllers.js");

const router = express.Router();

router.get("/posts/:id", getPost);
router.get("/edit/:id", editPost);
router.put("/edit/:id", updatePost);
router.delete("/posts/:id", deletePost);
router.get("/posts", getPosts);
router.get("/add-post", getFormNewPost);
router.post("/add-post", addNewPost);

module.exports = router;
