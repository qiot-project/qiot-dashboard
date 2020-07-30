var express = require('express');
var router = express.Router();
var basicAuth = require('express-basic-auth');
var data = require('../data.js');

/* GET home page. */

// router.use(basicAuth({
//   challenge: true,
//   users: { 'admin': 'r3dh4t1!' }
// }));


router.get('/stations', function (req, res, next) {
  data.getStations(function(err,stations){
    if(err){
      return res.json(err);
    }
    res.json(stations);
  })
});

router.get('/pollution', function (req, res, next) {
  data.getPollution(function(err,pollution){
    if(err){
      return res.json(err);
    }
    res.json(pollution);
  })
});

router.get('/collections', function (req, res, next) {
  data.getCollections(function(err,collections){
    if(err){
      return res.json(err);
    }
    res.json(collections);
  })
});

module.exports = router;
