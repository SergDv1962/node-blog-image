const express = require("express");
const getController = require("../controllers/home-controllers.js");

const router = express.Router();

router.get("/", getController);

module.exports = router;