"use strict";

const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service.lv0");

class AccessController {
  signUp = async (req, res, next) => {
    // try {
    //   console.log(`[P]::signUp`, req.body);
    //   /**
    //    * 200: OK
    //    * 201: Created
    //    */
    //   return res.status(201).json(await AccessService.signUp(req.body));
    // } catch (error) {
    //   next(error);
    // }

    // return res.status(201).json(await AccessService.signUp(req.body));
    return new CREATED({
      message: "Register OK!",
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}

module.exports = new AccessController();
