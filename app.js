//Require Modules
const express = require('express');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
var models = require('./models');


//Configs and Template
const app = express();
app.use(volleyball);
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });


//body parser setup MUST GO BEFORE ROUTE SETUP
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

models.db.sync({ force: false })
  .then(function () {
    //Server Listening
    const server = app.listen(3000);
    const io = socketio.listen(server);
    console.log('Server is listening on port 3000!');

    //route setup
    app.use('/', routes(io));

    //HTML & CSS Files
    app.use(express.static('public'));
  })
  .catch(function (err) {
    console.log('trouble connecting to server!');
    console.error(err);
  })

