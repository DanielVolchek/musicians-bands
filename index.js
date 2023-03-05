const { Band } = require("./Band");
const { Musician } = require("./Musician");
const { Song } = require("./Song");

// create associations
// one to many => Band has many Musicians
Musician.belongsTo(Band);
Band.hasMany(Musician);

// many to many => Band has many Songs
Band.belongsToMany(Song, { through: "band_song" });
Song.belongsToMany(Band, { through: "band_song" });

module.exports = {
  Band,
  Musician,
  Song,
};
