const express = require('express');
// const Sequelize = require('sequelize');
// var db = new Sequelize('postgres://localhost:5432/writingProject', {
//     logging: true
// });


module.exports = function (io) {

  const router = express.Router();

  router.get('/', function (request, response, next) {
    response.render('index');
  });

  return router;
}
