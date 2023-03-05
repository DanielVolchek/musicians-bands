const { Band } = require("./Band");
const { Musician } = require("./Musician");

// create associations
// one to many => Band has many Musicians
Musician.belongsTo(Band);
Band.hasMany(Musician);

module.exports = {
  Band,
  Musician,
};
