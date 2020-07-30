
const env = require('env-var').from({
  // Default values to use if not defined in the environment
  ADMIN_PASS: 'r3dh4t1!',
  MONGO_URL: 'mongodb://localhost:27017/qiot',
  DB_NAME: 'qiot',
  STATIONS_COL: 'measurementstation',
  POLLUTION_COL: 'pollution',

  // Include environment values. These will take precedence over
  // the defaults defined above if defined
  ...process.env
})

module.exports = {
  adminPassword: env.get('ADMIN_PASS').asString(),
  mongoURL: env.get('MONGO_URL').asString(),
  dbName: env.get('DB_NAME').asString(),
  stationsCollection: env.get('STATIONS_COL').asString(),
  pollutionCollection: env.get('POLLUTION_COL').asString()
}