const express = require("express");                 // To configure and manage an HTTP server to access resources from the same domain
const cors = require("cors");                       // To bypass the Access-Control-Allow-Origin headers, which specify which origins can access the API

const app = express();

var corsOptions = {
  origin: "http://112.120.157.150:3000",
};

app.use(cors(corsOptions));                         // Give React (Localhost:3000) access to the server response

// parse requests of content-type - application/json
app.use(express.json());                            // Called as a middleware to recognize the incoming Request Object as JSON Object

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));    // Called as a middleware to recognize incoming Request Object as strings or arrays

// database
const db = require("./app/models");
// const Role = db.Role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to jacky application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/public.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }