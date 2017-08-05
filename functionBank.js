const db = require('./db/index.js')
const models = require('./models');

//things we're not exporting because they shouldn't be directly used
const thingsNotToExport = {
  updateWordcount: function (projectName) {
    //update the wordcount in the project name
  },

  urlify: function(projectName) {
    return projectName.replace(/[^a-z\-_\(\)]+/gi, '');
  }



}

module.exports = {


  getWordcount: function (projectName) {

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

  removeProject: function(projectName) {



  },

  addDayRecord: function (projectName, totalWords, date) {
    if (!date) date = new Date();

  },

  removeDayRecord: function(dayRecord) {

  }


};
