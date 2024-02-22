const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const ConnectToDb = require("./mongodb/mongo_connect");
//const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin');

const serverless = require("serverless-http");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

ConnectToDb();

const app = express();

// Add middleware to parse JSON requests
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



const httpServer = createServer(app);

const corsOptions = {
  origin: '*', // This should be the URL of your front-end app
  // ... any other options you need
};

// Use CORS with the above options
app.use(cors(corsOptions));
app.use('/api/admin', adminRoutes);

const port = 3000;


httpServer.listen(port, () => {
    console.log(`Server Started at ${port}`)
})


module.exports.handler = serverless(app);
