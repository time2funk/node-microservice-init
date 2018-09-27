const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const reactViews = require('express-react-views');
const http = require('http');

const router = require('./router');

let app = null;

// Server class
//
module.exports = class {

    constructor (config) {
        // if (!com) throw new Error(`( Server ) no comunication socket specified`);

        app = express();
        
        app.set('port', config.port);
        app.set('views', `src/client/views`);
        app.set('view engine', 'jsx');
        app.engine('jsx', reactViews.createEngine());
        
        app.use(favicon(`src/client/public/favicon.ico`));
	    app.use(express.static(`src/client/public`));
        app.use(bodyParser.json({limit: '5mb'}));
        app.use(bodyParser.urlencoded({ 
            extended: false,
            limit: '5mb', 
            parameterLimit: 5000 
        }));

        // Express Router
        app.use('/', router);

        http.createServer(app).listen(app.get('port'), () => {
            console.log('( Server ) running on port', app.get('port'));
        });

        // this.on('msg', (msg) => {
        //     console.log('server: '+msg);
        // });
    }

    // close Server
    static close () {
        if (app) {
            app.close();
            app = null;
        }
        console.log(`( Server ) closed`);
    }
}