const axios = require('axios');
const config = require("dotenv").config()

const LOCALHOST = process.env.LOCALHOST

function registerPraise(user) {
    const url = LOCALHOST + '/api/praise'
    console.log(user)
    // axios.post(url, { user: user }).then(response => {
    //     console.log(response.data)
    // }).catch(error => {
    //     console.log(error)
    // })
    return 200;
}

module.exports = { registerPraise }