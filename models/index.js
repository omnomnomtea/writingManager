var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/writingThing');

const Fic = db.define('fic', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  wordcount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  urlTitle: {
    type: Sequelize.STRING,
    validate: {
      is: /[a-z\-_\(\)]+/i
    },
    allowNull: true,
  },
  status: {
    type: Sequelize.ENUM('complete', 'abandoned', 'in-progress', 'needs-edits'),
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
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: true
  }
});

const Entry = db.define('entry', {
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false

  },
  wordCountDaily: {
    type: Sequelize.INTEGER,
    allowNull: false

  },
  wordCountTotal: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const Fandom = db.define('fandom', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Fic.belongsTo(Fandom);
Entry.belongsTo(Fic);


Entry.hook('afterCreate', function (entry, options) {
  const entryPromise = entry.getProject();
  if (entry.wordcountTotal) { //if we have only total wordcount...
    entryPromise
      .then((project) => {
        entry.wordCountDaily = entry.wordCountTotal - project.wordCountTotal
      })
      .catch(console.error.bind(console));
  }
  else if (entry.wordCountDaily) { //if we have today's count but not the total...
    entryPromise
      .then((project) => {
        entry.wordCountTotal = project.wordCountTotal + entry.wordCountDaily;
      })
      .catch(console.error.bind(console));
  }
});

module.exports = {
  db,
  Fic,
  Entry,
  Fandom
};
