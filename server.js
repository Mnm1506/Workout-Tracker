const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

const db = "mongodb+srv://moussadb:Akbou2009@cluster0.vrfyl.mongodb.net/fitness_db?retryWrites=true&w=majority";
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/fitness_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then((result) => app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
})),

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(require("./routes/api-route"));
app.use(require("./routes/html-route"));


