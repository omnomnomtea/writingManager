const express = require('express');
const functionBank = require('../functionBank');



module.exports = function (io) {
  const router = express.Router();

  router.get('/', function (request, response, next) {
    functionBank.getProjects()
      .then((projectList) => {
        response.render('index', { fics: projectList });
      });
  });

  router.get('/fics/add', (request, response, next) => {
    response.render('addFicPage.html');
  });

  router.post('/fics/add', (request, response, next) => {

    functionBank.addNewProject(request.body.title, request.body.status, request.body.posted)
      .then((project) => {
        response.render('index', { fics: [project] });
      })
        .catch(next)
  })


  return router;
}
