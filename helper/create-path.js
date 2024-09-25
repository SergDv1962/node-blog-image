const path = require("path");

const createPath = (page) =>
  path.resolve(__dirname, "../views", `${page}.ejs`);
const pathFiles = (file) =>
  path.resolve(__dirname, "../public/uploads/", `${file}`);
const pathFilesToUploads = (file) => path.resolve("public/uploads/", `${file}`);

module.exports = {
   createPath, pathFiles, pathFilesToUploads
}