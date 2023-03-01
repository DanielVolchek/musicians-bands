const { Sequelize, sequelize } = require("./db");

// TODO - define the Musician model
let Musician = Sequelize.define("musician", {
  name: Sequelize.STRING,
  instrument: Sequelize.STRING,
});

module.exports = {
  Musician,
};
