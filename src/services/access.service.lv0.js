"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
// const crypto = require("crypto");
const crypto = require("node:crypto"); // Sử dụng module sẵn của NODEJS v19
const KeyTokenService = require("./keyToken.service.lv0");
const { createTokenPair } = require("../auth/authUtils.lv0");
const { getInfoData } = require("../utils");

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step 1: check email exists??
      /**
       * lean: giảm tải size object javascript thuần túy
       */
      const holerShop = await shopModel.findOne({ email }).lean();
      if (holerShop) {
        return {
          code: "xxxx",
          message: "Shop already registered!",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        /**
         * create privateKey, publicKey
         * privateKey:
         * - lưu trữ ở client
         * - sign token
         * publicKey:
         * - lưu trữ ở server
         * - verify token
         * Giả sử hacker truy cập vào server lấy được publicKey, nhưng ko có privateKey. Xác suất hacker có được cả 2 key khá ít
         */
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });

        // Sử dụng thuật toán đơn giản hơn
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");

        console.log({ privateKey, publicKey }); // save collection key store

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          publicKey,
        });
        if (!keyStore) {
          return {
            code: "xxx",
            message: "keyStore error",
          };
        }

        // create token pair
        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email: email,
          },
          publicKey,
          privateKey
        );
        console.log(`Created Token Success::`, tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: error,
      };
    }
  };
}

module.exports = AccessService;
