//Require Modules
const express = require('express');
const volleyball = require('volleyball');
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
var models = require('./db/models');


//Configs
const app = express();
app.use(volleyball);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//start the server
models.db.sync({ force: true })
  .then(function () {
    //Server Listening
    const server = app.listen(3000);
    const io = socketio.listen(server);
    console.log('Server is listening on port 3000!');

    //route setup
    //io not nessesary- refactor to remove
    app.use('/api', routes(io));

    //HTML & CSS Files
    app.use('/', express.static('public'));
    app.use('/', express.static('node_modules/bootstrap/dist'));


  })
  .catch(function (err) {
    console.log('trouble connecting to server!');
    console.error(err);
  })

