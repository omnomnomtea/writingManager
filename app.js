//Require Modules
const express = require('express');
const chalk = require('chalk');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

//Configs and Template
const app = express();
const log = console.log;
app.use(volleyball);
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

//Server Listening
const server = app.listen(3000);
const io = socketio.listen(server);

//body parser setup MUST GO BEFORE ROUTE SETUP
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//route setup
app.use('/', routes(io));

//HTML & CSS Files
app.use(express.static('public'));
