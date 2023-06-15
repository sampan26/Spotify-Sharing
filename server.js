const express = require('express')
 morgan = require('morgan'),
 path = require('path'),
 http = require('http'),
 { Server } = require('socket.io')
 mongoose = require('mongoose');
 routes = require('./routes');

 
require('dotenv').config();

  const app = express();
  const port = process.env.PORT || 8888;
  const server = http.createServer(app);
 const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
 });

 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());
 app.use(morgan('tiny'));
 
 app.use(routes);

 mongoose
  .connect(process.env.MONGODB_ATLAS_URI || 'mongodb://localhost/playlistr', {
    useNewUrlParser: true, // Removes deprecation warning
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));


  io.on('connection', socket => {
    console.log('Client connected to server:', socket.id);
  });

  console.log(`Listening on port ${port}.`);

  server.listen(port);