const { Sequelize, sequelize } = require("./db");

// TODO - define the Band model
let Band = Sequelize.define("band", {
  name: Sequelize.STRING,
  genre: Sequelize.STRING,
});

module.exports = {
  Band,
};
