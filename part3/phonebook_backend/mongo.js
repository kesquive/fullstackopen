const mongoose = require("mongoose");

if (process.argv.length < 4) {
  console.log("Credentials are incomplete");
  process.exit(1);
}

const user = process.argv[2];
const password = process.argv[3];
const databaseName = "phonebook";

const url = `mongodb+srv://${user}:${password}@cluster0.k3x0jqd.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv[4] && process.argv[5]) {
  const namePerson = process.argv[4];
  const numberPerson = process.argv[5];

  const person = new Person({
    name: namePerson,
    number: numberPerson,
  });

  person.save().then((result) => {
    console.log(`Added ${namePerson} number ${numberPerson} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
