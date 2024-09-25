const fs = require("fs");
const { createPath } = require('../helper/create-path.js');

const getController = (req, res) => {
  const title = "Home";
  const arrSize = 
    fs.readdirSync(__dirname + "/../public/uploads/")
      .map(file => fs.statSync(__dirname + `/../public/uploads/${file}`).size
  )
  let sumFileSize = 0;
  for(let i=0; i < arrSize.length; i++) {
    sumFileSize += arrSize[i];
  }
  res.render(createPath("index"), { title, sumFileSize });
}


 module.exports = getController;