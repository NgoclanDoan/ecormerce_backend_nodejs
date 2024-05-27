"use strict";

// level 2
const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3000,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "shopDev",
  },
};

const production = {
  app: {
    port: process.env.PRODUCTION_APP_PORT || 3000,
  },
  db: {
    host: process.env.PRODUCTION_DB_HOST || "localhost",
    port: process.env.PRODUCTION_DB_PORT || 27017,
    name: process.env.PRODUCTION_DB_NAME || "shopPro",
  },
};

const config = { dev, production };

const env = process.env.NODE_ENV || "dev";
module.exports = config[env];

// level 1
// const dev = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     host: "localhost",
//     port: 27017,
//     name: "dbDev",
//   },
// };

// const production = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     host: "localhost",
//     port: 27017,
//     name: "dbProduction",
//   },
// };

// const config = { dev, production };

// const env = process.env.NODE_ENV || "dev";
// module.exports = config[env];

// level 0
// const config = {
//   app: {
//     port: 3000,
//   },
//   db: {
//     host: "localhost",
//     port: 27017,
//     name: "db",
//   },
// };
// module.exports = config;
