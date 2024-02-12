const { config } = require('dotenv');

config()

module.exports = {
    PORT: process.env.PORT,
    SERVER: process.env.SERVER_URL,
    CLIENT: process.env.CLIENT_URL,
    SECRET: process.env.SECRET,
    EMAILUSER: process.env.EMAIL_USER,
    EMAILPASSWORD: process.env.EMAIL_PASSWORD,
}