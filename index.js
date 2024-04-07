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

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});



const httpServer = createServer(app);

const corsOptions = {
  origin: '*', 
};

// Use CORS with the above options
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, './dist/index.html')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'./dist/index.html'));
});

app.use('/api/admin', adminRoutes);

const port = 3000;


httpServer.listen(port, () => {
    console.log(`Server Started at ${port}`)
})


module.exports.handler = serverless(app);
