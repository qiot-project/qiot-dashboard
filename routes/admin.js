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

router.get('/lastDay/:stationId', function (req, res, next) {
  var id = req.params.stationId;


  data.getLastDay(id, function(err,data){
    if(err){
      return res.json(err);
    }
    res.json(data);
  })
});

router.get('/lastweek/:stationId', function(req, res){
  var id = req.params.stationId;

  if(isNaN(id)){
    return res.err("Please use a number for stationId");
  }

  id = parseInt(id);
  data.getLastWeek(id, function(err,data){
    if(err){
      return res.json(err);
    }
    res.json(data);
  })
})

router.get('/pm2_5/:stationId', function(req, res){
  var id = req.params.stationId;

  data.getPM2_5(id, function(err,data){
    if(err){
      return res.json(err);
    }
    res.json(data);
  })
})
router.get('/pm10/:stationId', function(req, res){
  var id = req.params.stationId;

  data.getPM2_5(id, function(err,data){
    if(err){
      return res.json(err);
    }
    res.json(data);
  })
})


router.get('/collections', function (req, res, next) {
  data.getCollections(function(err,collections){
    if(err){
      return res.json(err);
    }
    res.json(collections);
  })
});

module.exports = router;
