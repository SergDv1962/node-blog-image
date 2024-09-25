const express = require("express");
const getController = require("../controllers/contacts-controllers");

const router = express.Router();

router.get("/contacts", getController);

module.exports = router;