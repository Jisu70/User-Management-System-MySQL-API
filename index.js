// Dependencies
const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const mainRoute = require("./routes/main");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));



const db = require('./models/user.model')


// // Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use(mainRoute);

// To define the model in dtabase
db.sequelize
  .sync()
  .then()
  .catch((err) => console.log(err));

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(" app listen on port 3000 ");
});

