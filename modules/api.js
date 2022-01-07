const axios = require("axios");
const config = require("dotenv").config();

const LOCALHOST = process.env.LOCALHOST;

// TODO: Connect to the API
function registerPraise(users, reason) {
  const url = LOCALHOST + "/api/praise";
  for (const user of users) {
    console.log(user.user.username + "#" + user.user.discriminator);
  }
  return 200;
}

module.exports = { registerPraise };
