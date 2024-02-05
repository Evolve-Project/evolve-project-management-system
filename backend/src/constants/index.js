const {config} = require('dotenv');

config()

module.exports = {
    PORT: process.env.PORT,
    SERVER: process.env.SERVER_URL,
    CLIENT: process.env.CLIENT_URL,
    SECRET: process.env.SECRET,
}