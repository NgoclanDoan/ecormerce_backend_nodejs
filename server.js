const app = require("./src/app");

// Khai báo port
const PORT = 3055;

// Khởi động network NodeJS
const server = app.listen(PORT, () => {
  console.log(`Server eCommerce is running on port ${PORT}`);
});

// process.on("SIGINT", () => {
//   server.close(() => {
//     console.log("Exit Server Express");
//   });
// });

