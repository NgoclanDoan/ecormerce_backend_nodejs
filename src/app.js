require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");

console.log(`Process::`, process.env);
// ========= init middleware =========

/**
 * morgan: format log các request
 */
app.use(morgan("dev")); // Sử dụng ở development
// app.use(morgan("combined")); // Theo tiêu chuẩn apache. Nên sử dụg ở production
// app.use(morgan("common"));
// app.use(morgan("short"));
// app.use(morgan("tiny"));

/**
 * helmet: bảo vệ thông tin riêng tư, chăn chặn trang thứ 3 truy cập vào đọc cookie
 */
app.use(helmet());

/**
 * compress: nén dữ liệu trước khi gửi đi, giúp giảm dung lượng dữ liệu
 */
app.use(compression());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ========= init db =========
require("./dbs/init.mongodb");

// const { checkOverload } = require("./helpers/check.connect");
// checkOverload();

// ========= init routers =========
// app.get("/", (req, res, next) => {
//   const strCompress = "Hello World";
//   return res.status(200).json({
//     message: "Hello World",
//     metadata: strCompress.repeat(1000000),
//   });
// });
// app.use("", require("./routers"));
app.use("/", require("./routers"));

// require("./routers")(app);
// app.use(require("./routers"));

// ========= handle errors =========
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status().json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
