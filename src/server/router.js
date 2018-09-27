const express = require('express');
const router = express.Router(); 

router.use(function (req, res, next) {
    console.log('Request Time:', Date.now());
    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    next();
});

router.get('/', function (req, res) {
    // res.send({status: 'ok', err: {}});
    res.render('index', { title: 'Sadness' });
});

// Server Router
module.exports = router;