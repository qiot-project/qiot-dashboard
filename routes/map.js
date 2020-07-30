var express = require('express');
var router = express.Router();
var countries = require('country-list').getData();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('map', { title: 'Map', locations: countries});
});

router.get('/:location',function(req,res){
  var location = req.params.location;
  console.log('here..', location);
  fetchData(location,function(err,data){
    res.json(data)
    // res.render('map', {data:data});
  })
  
})

function fetchData(location,cb){
  var data = {
    hello: 'world ' + location
  };
  
  return cb(null,data);
}

module.exports = router;
