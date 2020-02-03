const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// const Com = require('../tools').Communication;

const config = require('../config');
const Server = require('../src').Server;
const Redis = require('../src').Redis;
const cleanup = require('../src').cleanup;

// Node Clustering
if (numCPUs < 2) throw new Error(' [ Master ] there are less then 2 cpu`s');
else if (cluster.isMaster) {
        console.log(`[ Master ] ${process.pid} is running`);
        // const com = new Com();

        cluster.fork({ROLE: "SERVER"});
        cluster.fork({ROLE: "REDIS"});

        cluster.on('exit', (worker, code, signal) => {
            const pid = worker.process.pid;
            console.log(`[ Worker ] [${pid}] died`);
        });

        process.on('SIGINT', function () {
            process.exit(2);
        });

        process.on('exit', function () {
            console.log(' exit event...');
            cleanup();
        });

    } else {
        console.log(`[ Worker:${process.env.ROLE} ] [${process.pid}] is running`);
        
        switch (process.env.ROLE) {
            case "SERVER":
                const server = new Server(config.server);
                break;
            case "REDIS":
                const redis = new Redis(config.redis);
                break;
            default:
                throw new Error(' [ Worker ] undefined worker role');
        }
    }
