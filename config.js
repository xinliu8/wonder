module.exports = {
	port: 8029,
	uri: 'http://localhost:8029', // Without trailing /
  solr: {
    server: 'localhost',
    port: 8983
  },
  mongodb: 'mongodb://localhost/wonder',
  environment: (process.env.NODE_ENV !== 'production') ? 'development' : 'production',
	selenium : {
		testtimeout : 60000
	}
};

if (module.exports.environment == 'production') {
  module.exports.port = process.env.PORT || 80; // Joyent SmartMachine uses process.env.PORT
  module.exports.uri = 'http://localhost:'+module.exports.port;
}
