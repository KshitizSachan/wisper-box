const express = require("express");
const cors = require("cors");
const Connection = require("./database/db");
const Routes = require('./routes/route.js');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());
Connection();

app.listen(5000, () => {
  console.log("Server up and running");
});

app.use('/',Routes);