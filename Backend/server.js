// All of the code to spin up the node.js server
// Import syntax to support node.js. Not the "import <insert> from <insert>" syntax we're used to
const express = require("express");

const cors = require("cors");
const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

const sslRedirect = require("heroku-ssl-redirect").default;

// Importing routes
const characterRoutes = require("./api/routes/characters/characters.js");
const attackRoutes = require("./api/routes/attacks/attacks.js");
const weaponRoutes = require("./api/routes/weapons/weapons.js");

// Importing our app file with the node js syntax
const app = express();
app.use(sslRedirect());

// Establishing a port for the API to run on a built in node enviorment port OR our hardcoded 3000 port
const port = process.env.PORT || 3000;

app.use(cors(corsConfig));

// Middlewear to parse response objects into JSON
app.use(express.json());

// Setting a default route with a request and response callback function
app.get("/", (req, res) => {
  res.send("connection successful. welcome to beta RPG API");
});

// Connection to our separate routes within the route folder
app.use("/api/v1/characters", characterRoutes);
app.use("/api/v1/attacks", attackRoutes);
app.use("/api/v1/weapons", weaponRoutes);

// using the listen method to start the server. Were passing the port as an argument. This is telling the server where to listen
if (require.main === module) {
  app.listen(port, () => {
    console.log(`success. App is now listening on ${port}`);
  });
}

module.exports = app;
