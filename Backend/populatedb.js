// Get arguments passed on command line
const userArgs = process.argv.slice(2);
  
const Location = require("./models/locations");


const locations = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createLocations();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function locationCreate(index, level, waldo, wenda, wizard, odlaw) {
    const locationdetail = {
      level: level,
      waldo: waldo,
      wenda: wenda,
      wizard: wizard,
      odlaw: odlaw,
    };
  
    const location = new Location(locationdetail);
    await location.save();
    locations[index] = location;
    console.log(`Added location: ${level}`);
  }

  async function createLocations() {
    console.log("Adding locations");
    await Promise.all([
      locationCreate(0, "beach", "100 100", "100 100", "100 100", "100 100"),
    ]);
  }