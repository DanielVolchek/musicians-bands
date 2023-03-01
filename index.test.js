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
});
