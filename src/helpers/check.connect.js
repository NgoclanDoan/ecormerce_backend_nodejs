"use strict";
const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const FIVE_SECONDS = 5000;

const countConnect = () => {
  const numberConnection = mongoose.connections.length;
  console.log(`Number of connections::${numberConnection}`);
  return numberConnection;
};

const checkOverload = () => {
  setInterval(() => {
    const numberConnection = countConnect();
    const numberCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    // Simulate maximum number of connection based on number osf cores
    const maxConnection = numberCores * 5;

    console.log(`Active connections::${numberConnection}`);
    console.log(`Memory usage::${memoryUsage / 1024 / 1024} MB`);

    if (numberConnection > maxConnection) {
      console.log("Connection overload detected!");
      // notify.send(...)
    }
  }, FIVE_SECONDS); // Monitor 5 seconds
};

module.exports = {
  countConnect,
  checkOverload,
};
