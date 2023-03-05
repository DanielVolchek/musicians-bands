const { sequelize } = require("./db");
const { Band, Musician } = require("./index");

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
});
