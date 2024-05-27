const app = require("./src/app");

const {
  app: { port },
} = require("./src/configs/config.mongodb");

// Khai báo port
// const PORT = process.env.PORT || 3055;

// Khởi động network NodeJS
const server = app.listen(port, () => {
  console.log(`Server eCommerce is running on port ${port}`);
});

// process.on("SIGINT", () => {
//   server.close(() => {
//     console.log("Exit Server Express");
//   });
// });
