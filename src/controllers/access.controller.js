"use strict";

const AccessService = require("../services/access.service.lv0");

class AccessController {
  signUp = async (req, res, next) => {
    console.log("🚀 ~ AccessController ~ signUp= ~ req:", req);
    try {
      console.log(`[P]::signUp`, req.body);
      /**
       * 200: OK
       * 201: Created
       */
      return res.status(201).json(await AccessService.signUp(req.body));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
