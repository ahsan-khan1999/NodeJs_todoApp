var express = require("express");
var router = express.Router();

/* GET Server Response. */
router.get("/", function (req, res, next) {
  res.send({response_message: "Server is Running. Yatta!"});
});

module.exports = router;
