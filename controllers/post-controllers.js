const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Post = require("../models/post.js");
const {
  createPath,
  pathFilesToUploads,
  pathFiles,
} = require("../helper/create-path.js");

const handlerError = (err, res) => {
   console.log(err);
   res.render(createPath("error"), { title: "Error" });
 }

const getPost = (req, res) => {
  const title = "Post";
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("post"), { title, post }))
    .catch((err) => handlerError(err, res));
};

const editPost = (req, res) => {
  const title = "Edit Post";
  Post.findById(req.params.id)
    .then((post) => res.render(createPath("edit-post"), { title, post }))
    .catch((err) => handlerError(err, res));
};

const updatePost = (req, res) => {
  const { title, author, text, urlImage } = req.body;
  const { id } = req.params;
  const oldFileName = urlImage;
  let newFileName = "";
  if (!req.files) {
    newFileName = oldFileName;
  } else {
    const file = req.files.image;
    newFileName = file ? uuidv4() + "-" + file.name : oldFileName;
    file.mv(pathFilesToUploads(newFileName));
  }
  Post.findByIdAndUpdate(id, { title, author, text, urlImage: newFileName })
    .then(() => {
      if (newFileName !== oldFileName && oldFileName) {
        fs.unlinkSync(pathFiles(oldFileName));
      }
    })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((err) => handlerError(err, res));
};

const deletePost = (req, res) => {
  const title = "Post";
  Post.findById(req.params.id)
    .then((el) => {
      fs.unlinkSync(pathFiles(el.urlImage));
    })
    .catch((err) => {
      console.log(err);
      res.render(createPath("error"), { title: "Error" });
    });
  Post.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => handlerError(err, res));
};

const getPosts = (req, res) => {
  const title = "Posts";
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render(createPath("posts"), { title, posts }))
    .catch((err) => handlerError(err, res));
};

const getFormNewPost = (req, res) => {
   const title = "Add Post";
   res.render(createPath("add-post"), { title });
 };

 const addNewPost = (req, res) => {
   const { title, author, text } = req.body;
   let newFileName = "";
   if (req.files && title && author && text) {
     const file = req.files.image;
     newFileName = uuidv4() + "-" + file.name;
     file.mv(pathFilesToUploads(newFileName));
   }
   const post = new Post({
     title,
     author,
     text,
     urlImage: newFileName,
   });
   post
     .save()
     .then((result) => res.redirect("/posts"))
     .catch((err) => handlerError(err, res));
 };

module.exports = {
  getPost,
  editPost,
  updatePost,
  deletePost,
  getPosts,
  getFormNewPost,
  addNewPost
};
