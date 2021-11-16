var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test',(req,res) => {
  res.send("at test data route")
})
router.get('/testEdit',(req,res) => {
  res.send("at test data route")
})
router.get('/te',(req,res) => {
  res.send("at test data route at te")
})
router.get('/tes',(req,res) => {
  res.send("at test duasoiddata route at te")
})
module.exports = router;
