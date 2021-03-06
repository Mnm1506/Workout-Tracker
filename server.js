const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");



const PORT = process.env.PORT || 8000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/fitness_db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
).then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.use(require("./routes/api-route"));
app.use(require("./routes/html-route"));

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${PORT}!`)
});
