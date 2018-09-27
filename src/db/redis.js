const redis = require('redis');

let client = null;

// Redis class
// 
module.exports = class {

    constructor (config) { 
        // if (!com) throw new Error(`( Redis ) no comunication socket specified`);
        createClient(config); 
    }

    getClient () { return client; }

    static close () {
        if (client) {
            client.end(true);
            client = null;
        }
        console.log(`( Redis ) closed`);
    }
}

const createClient = (config) => {
    if (client) return; // singleton

    client = redis.createClient(config.port, config.host, (er, res) => {
        console.log({er, res});
    });
    
    client.on('connect', function() {
        console.log(`( Redis ) client connected`);
    });
    
    client.on('error', function (err) {
        throw new Error('( Redis ) ' + err);
    }); 
}