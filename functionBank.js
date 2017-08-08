const Sequelize = require('sequelize');
const models = require('./models');

//things we're not exporting because they shouldn't be directly used
const thingsNotToExport = {
  updateWordcount: function (projectname) {
    //update the wordcount in the project 'projectname'
  },

  urlify: function (projectName) {
    return projectName.replace(/[^a-z\-_\(\)]+/gi, '');
  }
}

module.exports = {

  getProjects: function () {
    return models.Fic.findAll({ where: { writingStatus: ['in-progress', 'needs-edits'] } });
    //returns promise of list of projects
  },

  getWordcount: function (projectName) {
    return models.Fic.find({ where: { title: projectName } })
      .then(fic => {
        return fic.wordcount;
      }) //returns promise of wordcount
  },


  addNewProject: function (projectName, status, posted) {
    if (!status) status = 'in-progress';
    if (typeof posted === undefined) posted = false;
    const newFic = models.Fic.create({
      title: projectName,
      urlTitle: thingsNotToExport.urlify(projectName),
      status: status,
    });
    return newFic; //promise of a new fic instance
  },


  addDayRecord: function (projectName, totalWords, date) {
    if (!date) date = new Date();

    const project = models.fic.findOne({
      where: { title: projectName }
    })
      .then((project => {
        const newDayRecord = models.Entry.build({
          wordCountTotal: totalWords,
          date: date
        });
        newDayRecord.addFic()
      }))


  },



};
