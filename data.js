const mongojs = require('mongojs');
const fetch = require('node-fetch');
const config = require('./config.js');

var connString = config.mongoCredentials + '@' + config.mongoURL;
const db = mongojs(connString);

db.on('connect', function () {
  console.log('database connected:', connString);
})

db.on('error', function (err) {
  console.error('database error', err);
})

var dbService = config.dbService;

const stationsCollection = db.collection(config.stationsCollection);
const historicCollection = db.collection(config.historicCollection);
const monthlyCollection = db.collection(config.monthlyCollection);
const dailyCollection = db.collection(config.dailyCollection);
const hourlyCollection = db.collection(config.hourlyCollection);

_stations = [];

module.exports = {
  /*
   example
   [
    {
    "_id": 9,
    "active": true,
    "location": {
      "type": "Point",
      "coordinates": [
        16.0994679,
        38.6755858
      ]
    },
    "name": "Andrea",
    "serial": "100000007eb33b29"
    }]
  */
  getStations: function (cb) {
    // db[stationsCollection].find({active: true},function(err,data){
    db[stationsCollection].find(function(err,data){
      _stations = data; // set stations in memory
      cb(err,data);
    });
  },
  getCollections: function(cb){
    db.getCollectionNames(cb);
  },
  getPollution: function(cb){
    db[historicCollection].find({stationId:9}).limit(2,cb);
  },
  getLastWeek: function(stationId,cb){
    db[hourlyCollection].find({"_id.stationId":stationId},cb);
  },
  getLastDay: function(stationId,cb){
    var url = dbService+stationId;
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(json => cb(null,json));
  },
  getLastMonth: function(stationId,cb){
    // db[dailyCollection].find({"_id.stationId":stationId},cb);
    var url = dbService+stationId;
    fetch(url)
      .then(res => res.json())
      .then(json => cb(null,json));
  },
  getLastYear: function(stationId,cb){
    db[monthlyCollection].find({"_id.stationId":stationId},cb);
  }
}