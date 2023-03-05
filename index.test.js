const { sequelize } = require("./db");
const { Band, Musician, Song } = require("./index");

describe("Band and Musician Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    await sequelize.sync({ force: true });
  });

  describe("individual model tests", () => {
    test("can create a Band", async () => {
      // TODO - test creating a band
      const band = await Band.create({
        name: "The Beatles",
        genre: "Classic Rock",
      });
      expect(band.name).toBe("The Beatles");
      expect(band.genre).toBe("Classic Rock");
    });

    test("can create a Musician", async () => {
      // TODO - test creating a band
      const musician = await Musician.create({
        name: "John Lennon",
        instrument: "Guitar",
      });
      expect(musician.name).toBe("John Lennon");
      expect(musician.instrument).toBe("Guitar");
    });

    test("can create a Song", async () => {
      const song = await Song.create({
        title: "Hey Jude",
        year: 1968,
      });

      expect(song.title).toBe("Hey Jude");
      expect(song.year).toBe(1968);
    });
  });

  describe("association tests", () => {
    test("band can have multiple musicians", async () => {
      const musician1 = await Musician.create({
        name: "John Lennon",
        instrument: "Guitar",
      });
      const musician2 = await Musician.create({
        name: "Paul McCartney",
        instrument: "Bass",
      });
      const musician3 = await Musician.create({
        name: "George Harrison",
        instrument: "Guitar",
      });

      const band = await Band.create({
        name: "The Beatles",
        genre: "Classic Rock",
      });

      band.addMusician(musician1);
      band.addMusician(musician2);
      band.addMusician(musician3);

      const foundMusicians = await band.getMusicians();
      console.log(foundMusicians);

      expect(foundMusicians.length).toBe(3);
      expect(foundMusicians[0].name).toBe("John Lennon");
      expect(foundMusicians[1].name).toBe("Paul McCartney");
      expect(foundMusicians[2].name).toBe("George Harrison");

      expect(foundMusicians[0].instrument).toBe("Guitar");
      expect(foundMusicians[1].instrument).toBe("Bass");
      expect(foundMusicians[2].instrument).toBe("Guitar");
    });


    function bandsSongs = async () => {
      const band = await Band.create({
        name: "The Beatles",
        genre: "Classic Rock",
      });

      const song1 = await Song.create({
        title: "Hey Jude",
        year: 1968,
      });
      const song2 = await Song.create({
        title: "Here Comes The Sun",
        year: 1969,
      });

      await band.addSong(song1);
      await band.addSong(song2);

      const foundSongs = await band.getSongs();
      expect(foundSongs.length).toBe(2);
      expect(foundSongs[0].title).toBe("Hey Jude");
      expect(foundSongs[1].title).toBe("Here Comes The Sun");

      return band;
    }

    test("band can have multiple songs", bandsSongs);

    test("songs can have multiple bands", async () => {
      const band1 = await Band.create({
        name: "The Beatles",
        genre: "Classic Rock",
      });

      const band2 = await Band.create({
        name: "The Beatles 2",
        genre: "Classic Rock",
      });

      const song = await Song.create({
        title: "Hey Jude",
        year: 1968,
      });

      await song.addBand(band1);
      await song.addBand(band2);

      const foundBands = await song.getBands();
      expect(foundBands.length).toBe(2);
      expect(foundBands[0].name).toBe("The Beatles");
      expect(foundBands[1].name).toBe("The Beatles 2");
    });
  });

  describe("eager loading tests", () => {
    test("can eager load bands with musicians", async () => {
        
      const band = await bandsSongs();

      const bandsWithMusicians = band.findAll({include: Musician})
      expect(bandsWithMusicians.length).toBe(1);
    });
  });
});
