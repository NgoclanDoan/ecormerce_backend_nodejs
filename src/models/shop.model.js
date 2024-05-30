"use script";

// !dmbg
const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";

// Declare the Schema of the Mongo model
var shopSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "INACTIVE",
    },
    /**
     * Xác minh shop đã đăng kí thành công chưa?
     */
    verify: {
      type: Schema.Types.Boolean,
      default: false,
    },
    /**
     * Quyền: đăng sản phẩm, bản sản phẩm, xóa sản phẩm, truy cập tài nguyên hệ thống nào
     */
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);
