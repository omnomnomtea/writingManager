const Sequelize = require('sequelize');
const models = require('./models');


//things we're not exporting because they shouldn't be directly used
const thingsNotToExport = {
  updateWordcount: function (projectName, newWordcount) {
    return models.Fic.update({wordcount: newWordcount}, {where: {title: projectName}})
  },

  urlify: function (projectName) {
    return projectName.replace(/[^a-z\-\_\(\)]+/gi, '');
  }
}

module.exports = {

  getProjects: function () {
    return models.Fic.findAll({ where: { status: ['in-progress', 'needs-edits'] } });
    //returns promise of list of projects
  },

  getProject: function (title) {
    return models.Fic.findOne({ where: { title: title } });
  },


  getEntries: function (title) {
    return module.exports.getProject(title)
      .then(function (fic) {
        return models.Entry.findAll({ where: { ficId: fic.id } })
      });

  },

  getWordcount: function (projectName) {
    return models.Fic.find({ where: { title: projectName } })
      .then(fic => {
        return fic.wordcount;
      }) //returns promise of wordcount
  },


  addNewProject: function (projectName, status, posted, fandom, wordcount, summary) {
    if (!status) status = 'in-progress';
    if (typeof posted === undefined) posted = false;
    if (!fandom) fandom = null;
    if (!wordcount) wordcount = null;
    if (!summary) summary = null;
    const newFic = models.Fic.create({
      title: projectName,
      urlTitle: thingsNotToExport.urlify(projectName),
      status: status,
      posted: posted,
      wordcount: wordcount,
      fandom: fandom,
      summary: summary
    });
    return newFic; //promise of a new fic instance
  },


  addEntry: function (fic, wordcountToday, wordcountTotal, date) {
    if (!date) date = new Date();

    return models.Entry.create({
      wordcountTotal: wordcountTotal,
      wordcountToday: wordcountToday,
      ficId: fic.id,
      date: date
    });


  },


};
