const express = require("express");
const {PORT, CLIENT_URL} = require('./constants')
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();
const passport = require('passport')

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: CLIENT_URL, credentials: true}))
app.use(passport.initialize())

//import routes
const authRoutes = require('./routes/auth');

//initialize routes
app.use('/api', authRoutes);


app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
});