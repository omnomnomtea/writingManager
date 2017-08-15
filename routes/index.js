const express = require('express');
const functionBank = require('../functionBank');
const models = require('../models');

module.exports = function (io) {
  const router = express.Router();

  router.get('/', function (request, response, next) {
    functionBank.getProjects()
      .then((projectList) => {

        let ficList = projectList.map((fic) => {
          let ficObj = {
            title: fic.title,
            id: fic.id,
            wordcount: fic.wordcount
          }
          return ficObj;
        });

        response.render('index', { fics: ficList });
      });
  });

  router.get('/fics/add', (request, response, next) => {
    response.render('addFicPage.html');
  });

  router.post('/fics/add', (request, response, next) => {
    functionBank.addNewProject(request.body.title, request.body.status, (request.body.posted === "yes"), request.body.fandom, Number(request.body.wordcount), request.body.summary)
      .then((project) => {
        response.render('index', { fics: [project] });
      })
      .catch(next)
  });

  router.get('/fics/:title', (request, response, next) => {
    functionBank.getProject(request.params.title)
      .then(function (fic) {
        response.render('index', { fics: [fic] })
      })
  });

  router.get('/entries/:title', (request, response, next) => {
    functionBank.getEntries(request.params.title)
      .then((entries) => {

        const entryList = entries.map(entry => {
          let entryItem = {
            id: entry.id,
            date: entry.date,
            wordcountToday: entry.wordcountDaily
          }
          return entryItem;
        });

        console.log(entryList);

        response.render('entriesPage', { fic: { title: request.params.title }, entries: entryList});
      })
      .catch(next);
  });

  router.get('/entries/:title/add', (request, response, next) => {
    functionBank.getProject(request.params.title)
      .then(function (fic) {
        response.render('addEntryPage', { fic })
      })
      .catch(next);

  });

  router.post('/entries/:title/add', (request, response, next) => {

    //console.log('\n\n', request.body, '\n\n')

    let wordcountToday, wordcountTotal;

    if (request.body.totalOrToday === 'today') wordcountToday = Number(request.body.wordcount);
    else if (request.body.totalOrToday === 'total') wordcountTotal = Number(request.body.wordcount);

    if (!wordcountTotal) wordcountTotal = null;
    if (!wordcountToday) wordcountToday = null;

    models.Fic.findOne({where: {title: request.params.title}})
      .then(function (fic) {
        return [functionBank.addEntry(fic, wordcountToday, wordcountTotal, new Date()), fic]
      })
      .then(([entry, fic]) => {
        response.redirect('/entries/' + fic.title);
      })
      .catch(next);

  });


  return router;
}
