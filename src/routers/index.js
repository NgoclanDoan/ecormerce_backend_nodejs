"use strict";
// const express = require("express");
// const router = express.Router();

// router.use("/v1/api", require("./access"));

module.exports = (app) => {
  app.use("/v1/api", require("./access"));
};

// router.get("/v1/api", (req, res, next) => {
//   const strCompress = "Hello World";
//   return res.status(200).json({
//     message: "Hello World",
//     metadata: strCompress.repeat(1000000),
//   });
// });

// module.exports = router;
