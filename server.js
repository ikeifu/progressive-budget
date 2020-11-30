const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// Establish PORT Connection
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set static files to public folder
app.use(express.static("public"));

// Mongoose connect (workout database)
// https://mongoosejs.com/docs/deprecations.html
// process.env.MONGODB_URI || <- removed from mongoose.connect()
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mighty-ravine-88971",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

// Routes
app.use(require("./routes/api.js"));

// Initiate server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
