const fetch = require('node-fetch');
const config = require('./config.js');
const {InfluxDB} = require('@influxdata/influxdb-client');
const db = config.influxDB;



// You can generate a Token from the "Tokens Tab" in the UI
const token = 'JCNTRpJj6AsvqiD7MnRWPZhIrXYpHwusT_Mwvc0I26E6lFJsXNzkaD2SbkIxeeH3TbiakNbbZGm_EKk8dlCCbQ=='
const org = 'qiot'
const bucket = 'covid19'
const client = new InfluxDB({url: db, token: token})

const queryApi = client.getQueryApi(org)

var dbService = config.dbService;

_stations = [];

module.exports = {
  /*
   old example
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


    new example
    result: '_result',
    table: 14,
    _start: '2021-04-01T13:03:06.679921969Z',
    _stop: '2021-04-01T14:03:06.679921969Z',
    _time: '2021-04-01T14:03:05.009846Z',
    _value: 43,
    _field: 'pm2_5_atm',
    _measurement: 'pollution',
    ccode: 'it',
    city: 'Vibo Valentia',
    country: 'Italy',
    latitude: '38.6766069',
    longitude: '16.0965282',
    name: 'battagliastation13',
    serial: '000000008b236afc',
    station_id: '2e4399ac-ad20-4d9c-9b9e-cdfa48d33e82'

  */
  getStations: function (cb) {
    
    // db[stationsCollection].find(function(err,data){
    //   _stations = data; // set stations in memory
    //   cb(err,data);
    // });
    resultData = [{
      result: '_result',
      table: 14,
      _start: '2021-04-01T13:03:06.679921969Z',
      _stop: '2021-04-01T14:03:06.679921969Z',
      _time: '2021-04-01T14:03:05.009846Z',
      _value: 43,
      _field: 'pm2_5_atm',
      _measurement: 'pollution',
      ccode: 'it',
      city: 'Vibo Valentia',
      country: 'Italy',
      latitude: 38.6766069,
      longitude: 16.0965282,
      name: 'battagliastation13',
      serial: '000000008b236afc',
      station_id: '2e4399ac-ad20-4d9c-9b9e-cdfa48d33e82',
      active: true
    }];
    cb(null,resultData);
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
    // var url = dbService+stationId;
    // console.log(url);
    // fetch(url)
    //   .then(res => res.json())
    //   .then(json => cb(null,json));
    resultData = [];
    const query = 'from(bucket: "'+bucket+'") |> range(start: 0) |> filter(fn: (r) => r.station_id == "'+stationId+'")'
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        resultData.push(o);
      },
      error(error) {
        console.error(error)
        cb(error);
      },
      complete() {
        cb(null,resultData);
      },
    })
  },
  getPM2_5: function(stationId,cb){
    // var url = dbService+stationId;
    // fetch(url)
    //   .then(res => res.json())
    //   .then(json => cb(null,json));
    resultData = [];
    const query = 
    ['from(bucket: "'+bucket+'")',
    '|> range(start: -7d)',
    '|> filter(fn: (r) => r.station_id == "'+stationId+'")',
    '|> filter(fn: (r) => r._field == "pm2_5_atm")'].join(' ');
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        resultData.push(o);
      },
      error(error) {
        console.error(error)
        cb(error);
      },
      complete() {
        console.log('Fetched pm2_5',resultData.length,"rows");
        cb(null,resultData);
      },
    })
  },
  getPM10: function(stationId,cb){
    // var url = dbService+stationId;
    // fetch(url)
    //   .then(res => res.json())
    //   .then(json => cb(null,json));
    resultData = [];
    const query = 
    ['from(bucket: "'+bucket+'")',
    '|> range(start: -7d)',
    '|> filter(fn: (r) => r.station_id == "'+stationId+'")',
    '|> filter(fn: (r) => r._field == "pm10_atm")'].join(' ');
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        resultData.push(o);
      },
      error(error) {
        console.error(error)
        cb(error);
      },
      complete() {
        console.log('Fetched pm10',resultData.length,"rows");
        cb(null,resultData);
      },
    })
  }
}