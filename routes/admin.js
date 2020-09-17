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

  if(isNaN(id)){
    return res.err("Please use a number for stationId");
  }
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

router.get('/lastmonth/:stationId', function(req, res){
  var id = req.params.stationId;

  if(isNaN(id)){
    return res.err("Please use a number for stationId");
  }

  id = parseInt(id);
  data.getLastMonth(id, function(err,data){
    if(err){
      return res.json(err);
    }
    res.json(data);
  })
})

router.get('/lastyear/:stationId', function(req, res){
  var id = req.params.stationId;

  if(isNaN(id)){
    return res.err("Please use a number for stationId");
  }

  id = parseInt(id);
  data.getLastYear(id, function(err,data){
    if(err){
      return res.json(err);
    }
    res.json(data);
  })
})

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
