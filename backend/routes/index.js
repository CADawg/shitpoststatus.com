var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { videoId: null });
});

router.get('/watch', function(req, res, next) {
  res.render('index', { videoId: req.query.v });
});

module.exports = router;