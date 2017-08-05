const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const Fic = db.define('fic', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    validate: {
      is: /[a-z\-_\(\)]+/i
    },
    allowNull: true,
  },
  writingStatus: {
    type: Sequelize.ENUM('complete', 'abandoned', 'in-progress', 'needs edits'),
    allowNull: false
  },
  posted: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    },
    allowNull: true
  }
});

const Entry = db.define('entry', {
  date: {
    type: Sequelize.DATEONLY,
  },
  wordCountDaily: {
    type: Sequelize.INTEGER
  },
  wordCountTotal: {
    type: Sequelize.INTEGER
  }
});

module.exports = {
  Fic,
  Entry
};
