const express = require('express');
const { Entry, Fic, Fandom } = require('../db/models');

module.exports = function (io) {

  const router = express.Router();

  router.get('/fics', function (request, response, next) {
    Fic.findAll()
      .then((fics) => {
        response.json(fics);
      })
      .catch(next)
  });

  router.post('/fics/add', (request, response, next) => {
    Fic.create(request.body)
      .then((fic) => {
        response.json(fic);
      })
      .catch(next)
  });

  router.get('/fics/:id', (request, response, next) => {
    Fic.findById(request.params.id)
      .then(function (fic) {
        response.json(fic)
      })
      .catch(next);
  });

  router.get('/entries/:ficId', (request, response, next) => {
    Entry.find({ where: { ficId: request.params.ficId } })
      .then((entries) => {
        response.json(entries)
      })
      .catch(next);
  });

  router.post('/entries/:ficId/add', (request, response, next) => {
    Entry.create(request.body)
      .catch(next);
  });


  router.get('/entries/id/:id', (request, response, next) => {
    Entry.findById(request.params.id)
      .then((entry) => {
        response.json(entry)
      })
      .catch(next);
  });


  return router;

}
