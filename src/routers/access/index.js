"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const accessRouter = express.Router();

// sign-up
accessRouter.post("/shop/signup", accessController.signUp);

module.exports = accessRouter;
