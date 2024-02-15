const src = require('./src');


// Rest of your server setup
const express = require('express');
const cors = require('cors');
const app = express();



const corsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: ['Content-Type', 'Authorization', 'http://localhost:3001'],
};

app.use(cors(corsOptions));

// Rest of your server setup



