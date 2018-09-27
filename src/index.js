

// Server Cluster 
const _Server = require('./server');
exports.Server = _Server;


// Server Communication ( ZeroMQ ) 
const _Communication = require('./communication');
exports.Communication = _Communication; 


// Redis Communication Cluster
const _Redis = require('./db/redis');
exports.Redis = _Redis;


// Cleanup action just before node.js exits
const cleanup = function () {
    console.log(`( Tools ) cleaning`);
    _Server.close();
    _Redis.close();
    _Communication.close();
}
exports.cleanup = cleanup;











// exports.CassandraConnection = class {}
// exports.KafkaConnection = class {}

// const myTransform = new Transform({
//     readableObjectMode: true,
//     transform(row, encoding, callback) {
//         // Transform the row into something else
//         const item = new Buffer(row['vote'], 'base64');
//         callback(null, item);
//     }
// });

// client.stream(query, params, { prepare: true })
// .pipe(myTransform)
// .pipe(fileStream);