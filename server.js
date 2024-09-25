const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()
const methodOverride = require('method-override')

const fileUpload = require("express-fileupload");

const homeRouter = require('./routes/home-routes.js')
const postRouter = require('./routes/post-routes.js')
const contactRouter = require('./routes/contact-routes.js')
const apiPostRouter = require('./routes/api-post-routes.js');
const { createPath } = require("./helper/create-path.js");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(fileUpload());
app.use(methodOverride('_method'))

mongoose
  .connect(process.env.MONGO_DB)
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`);
});

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use(homeRouter);
app.use(contactRouter);
app.use(apiPostRouter);
app.use(postRouter);

app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
