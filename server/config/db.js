var dbName = 'fiiPractic';
var dbPort = '27017';
var dbHost = '192.168.159.201';
var connectionString = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;

module.exports = {
  url: connectionString
}
