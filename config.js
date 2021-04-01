
const env = require('env-var').from({
  // Default values to use if not defined in the environment
  ADMIN_PASS: 'r3dh4t1!',
  MONGO_URL: 'localhost:27017/qiot',
  MONGO_CREDENTIALS: 'qiot:qiot', 
  DB_NAME: 'qiot',
  STATIONS_COL: 'measurementstation',
  HISTORIC_COL: 'measurementhistory',
  MONTH_COL: 'measurementbymonth',
  DAY_COL: 'measurementbyday',
  HOUR_COL: 'measurementbyhour',
  MINUTE_COL: 'measurementbyminute',
  DB_SERVICE: 'http://qiot-query-qiot.apps.cluster-emeaiot-d864.emeaiot-d864.example.opentlc.com/v1/snapshot/id/',
  INFLUX_URL: 'http://timeseries-service-influxdb2-qiotcovid19v2.apps.cluster-fcd8.fcd8.example.opentlc.com',

  // Include environment values. These will take precedence over
  // the defaults defined above if defined
  ...process.env
})

module.exports = {
  adminPassword: env.get('ADMIN_PASS').asString(),
  mongoURL: env.get('MONGO_URL').asString(),
  mongoCredentials: env.get('MONGO_CREDENTIALS').asString(),
  dbName: env.get('DB_NAME').asString(),
  stationsCollection: env.get('STATIONS_COL').asString(),
  historicCollection: env.get('HISTORIC_COL').asString(),
  monthlyCollection: env.get('MONTH_COL').asString(),
  dailyCollection: env.get('DAY_COL').asString(),
  hourlyCollection: env.get('HOUR_COL').asString(),
  dbService: env.get('DB_SERVICE').asString(),
  influxDB: env.get('INFLUX_URL').asString()
}