"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const router = express.Router();

// sign-up
router.post("/shop/signup", accessController.signUp);

console.log("🚀 ~ router:", router);

module.exports = router;
