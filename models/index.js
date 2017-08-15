var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/writingThing', { logging: true });

const Fic = db.define('fic', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
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
    type: Sequelize.DATEONLY
    //    allowNull: false

  },
  wordcountDaily: {
    type: Sequelize.INTEGER,

  },
  wordcountTotal: {
    type: Sequelize.INTEGER,
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
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


Entry.hook('afterCreate', function (entry) {
  const ficPromise = Fic.findById(entry.ficId);
  if (entry.wordcountTotal) { //if we have only total wordcount...
    return ficPromise
      .then((fic) => {
        return entry.update({wordcountDaily: entry.wordcountTotal - fic.wordcount});
      })
  }
  else if (entry.wordcountDaily) { //if we have today's count but not the total...
    return ficPromise
      .then((fic) => {
        return entry.update({wordcountTotal: fic.wordcount + entry.wordcountDaily});
      })
  }
  else {
    console.error(new Error('need one type of wordcount or the other'))
    return null;
  }
});

module.exports = {
  db,
  Fic,
  Entry,
  Fandom
};
