const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Post = require("../models/post.js");

const { pathFilesToUploads, pathFiles } = require("../helper/create-path.js");

const handlerError = (res, error) => {
  res.status(500).send(error.message);
};

const getPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((err) => handlerError(err, res));
};

const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, author, text } = req.body;
  let newFileName = "";
  let oldFileName = "";
  Post.findById(id).then((post) => {
    oldFileName = post.urlImage;
  });
  if (!req.files) {
    newFileName = oldFileName;
  } else {
    const file = req.files.image;
    newFileName = file ? uuidv4() + "-" + file.name : oldFileName;
    file.mv(pathFilesToUploads(newFileName));
  }
  Post.findByIdAndUpdate(
    id,
    {
      title,
      author,
      text,
      urlImage: newFileName,
    },
    { new: true }
  )
    .then((post) => {
      if (newFileName !== oldFileName && oldFileName) {
        fs.unlinkSync(pathFiles(oldFileName));
      }
      res.status(200).json(post)
    })
    .catch((err) => handlerError(err, res));
};

const deletePost = (req, res) => {
  let id = req.params.id;
  Post.findById(id)
    .then((post) => {
      fs.unlinkSync(pathFiles(post.urlImage));
    })
    .catch((err) => handlerError(err, res));
  Post.findByIdAndDelete(id)
    .then(() =>
      res.status(200).json({ message: `This post with ID: ${id} is deleted` })
    )
    .catch((err) => handlerError(err, res));
};

const getPosts = (req, res) => {
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => handlerError(err, res));
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
    .then((post) => res.status(200).json(post))
    .catch((err) => handlerError(res, err));
};

module.exports = {
  getPost,
  updatePost,
  deletePost,
  getPosts,
  addNewPost,
};
