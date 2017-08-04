const express = require('express');



module.exports = function (io) {

  const router = express.Router();

  router.use('/', function (request, response, next) {
    response.send('Hi');
  });


  return router;
}
