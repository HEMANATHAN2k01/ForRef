const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const cookie = require("cookie-parser");

const app = express();
const dbs = require("./config/dbs");
const router = require("./routers/router");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use(cookie());
app.use(router);
dbs;

app.listen(4000, () => {
  console.log("Port running on 4000");
});
