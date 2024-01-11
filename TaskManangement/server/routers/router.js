// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/control");

// router.post("/register", controller.register);
// router.post("/login", controller.login);
// router.get("/getdata", controller.getdata);
// router.post("/createtask", controller.createtask);
// router.get("/datalist", controller.selectData);
// router.get("/userdata", controller.userdata);
// router.get("/usertasks", controller.userTasks);
// router.get("/", controller.mailToAdmin);
// router.get("/exportcsv", controller.createCSV);

// module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/control");
const vadilate = require('../Middleware/vadilate')
router
  .post("/register", controller.register)
  .post("/login", controller.login)
  .get("/getdata", controller.getdata)
  .post("/createtask", controller.createtask)
  .get("/datalist", controller.selectData)
  .get("/userdata", controller.userdata)
  .get("/usertasks",vadilate,controller.usertasks)
  .get("/", controller.mailToAdmin)
  .get("/exportcsv", controller.createCSV);

module.exports = router;
