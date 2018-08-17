var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator')

router.use(expressValidator())
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact/index');
});

module.exports = router;
