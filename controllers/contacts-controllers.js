const Contact = require("../models/contact.js");
const { createPath } = require('../helper/create-path.js')

const getController = (req, res) => {
   const title = "Contacts";
   Contact.find()
     .then((contacts) => res.render(createPath("contacts"), { contacts, title }))
     .catch((err) => {
       console.log(err);
       res.render(createPath("error"), { title: "Error" });
     });
 }


 module.exports = getController;