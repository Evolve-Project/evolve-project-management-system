const express = require("express");
const { PORT, CLIENT } = require('./constants') 
const cookieParser = require('cookie-parser')
const cors = require('cors');


const app = express();
const passport = require('passport')

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT, credentials: true }))
app.use(passport.initialize())

//import routes
const authRoutes = require('./routes/auth');
const attendanceRoutes = require('./routes/attendance')
const milestoneRoutes = require('./routes/milestones_desc')
const getMilestonesName = require('./routes/milestones_desc')

//initialize routes
app.use('/api', authRoutes);
app.use('/api', attendanceRoutes);
app.use('/api',milestoneRoutes);
app.use('/api',getMilestonesName);



app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});


console.log("h12");