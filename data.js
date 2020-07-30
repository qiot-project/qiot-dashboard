const mongojs = require('mongojs')
const config = require('./config.js');
const db = mongojs(config.dbName);
db.on('connect', function () {
  console.log('database connected')
})

const stationsCollection = db.collection(config.stationsCollection);
const pollutionCollection = db.collection(config.pollutionCollection);

_stations = [];

// Get Stations
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
    db[stationsCollection].find(function(err,data){
      _stations = data; // set stations in memory
      cb(err,data);
    });
  },
  getCollections: function(cb){
    db.getCollectionNames(cb);
  },
  getPollution: function(cb){
    db[pollutionCollection].find({stationId:9}).limit(2,cb);
  }
}



// Get Pollution



// Get Gas