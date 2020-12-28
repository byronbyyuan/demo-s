const server = require('./server');
const configuration = require('./Configuration').getInstance();

const PORT = '8099' || configuration.getConfig('server.port');

server.start(PORT);
