const axios = require("axios");
const config = require("dotenv").config();

const LOCALHOST = process.env.LOCALHOST;

function registerPraise(user) {
  const url = LOCALHOST + "/api/praise";
  console.log(user.username + "#" + user.discriminator);
  return 200;
}

module.exports = { registerPraise };
