const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes/chore.js");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./models");



// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });



db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
  });
});
