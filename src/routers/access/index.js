"use strict";
const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandle } = require("../../auth/checkAuth");

const accessRouter = express.Router();

// sign-up
accessRouter.post("/shop/signup", asyncHandle(accessController.signUp));

module.exports = accessRouter;
